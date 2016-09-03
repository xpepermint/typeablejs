exports.isUndefined = function(v) {
  return typeof v === 'undefined' || v === undefined;
}

exports.isNull = function(v) {
  return v === null;
}

exports.isNaN = function(v) {
  return Number.isNaN(v);
}

exports.isFinite = function(v) {
  return Number.isFinite(v);
}

exports.isInfinite = function(v) {
  return v === Infinity;
}

exports.isValue = function(v) {
  return (
    !exports.isUndefined(v)
    && !exports.isNull(v)
    && !exports.isNaN(v)
    && !exports.isInfinite(v)
  );
}

exports.isString = function(v) {
  return typeof v === 'string';
}

exports.isBoolean = function(v) {
  return typeof v === 'boolean';
}

exports.isNumber = function(v) {
  return typeof v === 'number';
}

exports.isInteger = function(v) {
  return Number.isInteger(v);
}

exports.isFloat = function(v) {
  return (
    exports.isNumber(v)
    && exports.isFinite(v)
  );
}

exports.isDate = function(v) {
  return (
    !exports.isUndefined(v)
    && !exports.isNull(v)
    && v.constructor === Date
    && exports.isInteger(v.getTime())
  );
}

exports.isObject = function(v) {
  return (
    !exports.isUndefined(v)
    && !exports.isNull(v)
    && v.constructor === Object
  );
}

exports.isArray = function(v) {
  return Array.isArray(v);
}

exports.isAbsent = function(v) {
  return (
    exports.isUndefined(v)
    || exports.isNull(v)
    || exports.isNaN(v)
    || exports.isString(v) && v === ''
    || exports.isArray(v) && v.length === 0
    || exports.isObject(v) && Object.keys(v).length === 0
  );
}

exports.isPresent = function(v) {
  return !exports.isAbsent(v);
}

exports.toString = function(v) {
  if (exports.isString(v)) {
    return v;
  } else if (exports.isUndefined(v) || exports.isNull(v)) {
    return null;
  } else {
    return exports.toString(v.toString());
  }
}

exports.toBoolean = function(v) {
  if (exports.isBoolean(v)) {
    return v;
  } else if (exports.isUndefined(v) || exports.isNull(v)) {
    return null;
  } else {
    return (
      parseFloat(v) > 0
      || exports.isInfinite(v)
      || v === '1'
      || v === 'true'
      || v === 'yes'
      || v === '+'
    );
  }
}

exports.toInteger = function(v) {
  if (exports.isInteger(v)) {
    return v;
  } else if (exports.isUndefined(v) || exports.isNull(v)) {
    return null;
  } else if (exports.isFloat(v)) {
    return parseInt(v);
  } else {
    var pv = parseInt(v);
    if (exports.isInteger(pv)) {
      return pv;
    } else if (exports.toBoolean(v)) {
      return 1;
    } else {
      return 0;
    }
  }
}

exports.toFloat = function(v) {
  if (exports.isFloat(v)) {
    return v;
  } else if (exports.isUndefined(v) || exports.isNull(v)) {
    return null;
  } else {
    var pv = parseFloat(v);
    if (exports.isFloat(pv)) {
      return pv;
    } else if (exports.toBoolean(v)) {
      return 1;
    } else {
      return 0;
    }
  }
}

exports.toDate = function(v) {
  var date = exports.isDate(v) ? v : new Date(v);
  var time = date.getTime();
  var isValid = (
    exports.isPresent(v)
    && exports.isInteger(time)
  );

  return isValid ? date : null;
}

exports.toArray = function(v) {
  if (exports.isArray(v)) {
    return v;
  } else if (exports.isUndefined(v) || exports.isNull(v)) {
    return null;
  } else if (!exports.isValue(v)) {
    return [];
  } else {
    return [v];
  }
}

exports.cast = function(v, options, types) {
  if (!options) options = {};
  if (!types) types = {};

  // handling null values
  if (exports.isUndefined(v) || exports.isNull(v)) {
    return null;
  }

  // retriving type name
  var name = null;
  if (exports.isArray(options)) {
    name = options;
  } else if (exports.isString(options)) {
    name = options;
  } else if (!exports.isUndefined(options.type)) {
    name = options.type;
  } else if (!exports.isUndefined(options.constructor)) {
    name = options.constructor.name
  }
  if (exports.isString(name)) {
    name = name.toLowerCase();
  }

  // handling arrays
  if (exports.isArray(name) && exports.isPresent(name)) {
    var arr = exports.toArray(v);
    if (exports.isPresent(arr)) {
      return arr.map(i => exports.cast(i, name[0], types));
    } else {
      return arr;
    }
  } else if (exports.isArray(name) || name === 'array') {
    return exports.toArray(v);
  }

  // handling general types
  switch(name) {
    case 'string':
      return exports.toString(v);
    case 'boolean':
      return exports.toBoolean(v);
    case 'integer':
      return exports.toInteger(v);
    case 'float':
      return exports.toFloat(v);
    case 'date':
      return exports.toDate(v);
  }

  // handling custom type
  var converter = types[name];
  if (converter) {
    return converter(v, options);
  }

  // handling unknown types
  throw new Error(`Unknown type ${name}`);
}
