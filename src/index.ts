/*
* Returns `true` if the provided value is of type `undefined`.
*/

export function isUndefined (v) {
  return typeof v === 'undefined' || v === undefined;
}

/*
* Returns `true` if the provided value is `null`.
*/

export function isNull (v) {
  return v === null;
}

/*
* Returns `true` if the provided value represents infinite number.
*/

export function isInfinite (v) {
  return v === Infinity;
}

/*
* Returns `true` if the `value` is some sort of expected value.
*/

export function isValue (v) {
  return (
    !isUndefined(v)
    && !isNull(v)
    && !(isNumber(v) && isNaN(v))
    && !isInfinite(v)
  );
}

/*
* Returns `true` if the `value` is a string value.
*/

export function isString (v) {
  return typeof v === 'string';
}

/*
* Returns `true` if the `value` is a boolean value.
*/

export function isBoolean (v) {
  return typeof v === 'boolean';
}

/*
* Returns `true` if the `value` is a number.
*/

export function isNumber (v) {
  return typeof v === 'number';
}

/*
* Returns `true` if the `value` is an integer number.
*/

export function isInteger (v) {
  return isNumber(v) ? v % 1 === 0 : false;
}

/*
* Returns `true` if the `value` is a float number.
*/

export function isFloat (v) {
  return (
    isNumber(v)
    && isFinite(v)
  );
}

/*
* Returns `true` if the `value` is a date object.
*/

export function isDate (v) {
  return (
    !isUndefined(v)
    && !isNull(v)
    && v.constructor === Date
    && isInteger(v.getTime())
  );
}

/*
* Returns `true` if the `value` is an object (an object with keys).
*/

export function isObject (v) {
  return (
    !isUndefined(v)
    && !isNull(v)
    && v.constructor === Object
  );
}

/*
* Returns `true` if the `value` is an array.
*/

export function isArray (v) {
  return Array.isArray(v);
}

/*
* Returns `true` if the `value` represents an empty value.
*/

export function isAbsent (v) {
  return (
    isUndefined(v)
    || isNull(v)
    || (isNumber(v) && isNaN(v))
    || isString(v) && v === ''
    || isArray(v) && v.length === 0
    || isObject(v) && Object.keys(v).length === 0
  );
}

/*
* Returns `true` if the `value` represents a present value.
*/

export function isPresent (v) {
  return !isAbsent(v);
}

/*
* Returns `true` if the `value` represents a function.
*/

export function isFunction (v) {
  return typeof v === 'function';
}

/*
* Returns `true` if the `value` represents a class object.
*/

export function isClass (v) {
  return isFunction(v);
}

/*
* Returns `true` if the `value` represents a promise object.
*/

export function isPromise (v) {
  return (
    isPresent(v)
    && v.constructor
    && v.constructor.name === 'Promise'
  );
}

/*
* Converts the `value` to a string value.
*/

export function toString (v) {
  if (isString(v)) {
    return v;
  }
  else if (isUndefined(v) || isNull(v)) {
    return null;
  }
  else {
    return toString(v.toString());
  }
}

/*
* Converts the `value` to a boolean value.
*/

export function toBoolean (v) {
  if (isBoolean(v)) {
    return v;
  }
  else if (isUndefined(v) || isNull(v)) {
    return null;
  }
  else {
    return (
      parseFloat(v) > 0
      || isInfinite(v)
      || v === '1'
      || v === 'true'
      || v === 'yes'
      || v === '+'
    );
  }
}

/*
* Converts the `value` to an integer value.
*/

export function toInteger (v) {
  if (isInteger(v)) {
    return v;
  }
  else if (isUndefined(v) || isNull(v)) {
    return null;
  }
  else if (isFloat(v)) {
    return parseInt(v);
  }
  else {
    var pv = parseInt(v);
    if (isInteger(pv)) {
      return pv;
    }
    else if (toBoolean(v)) {
      return 1;
    }
    else {
      return 0;
    }
  }
}

/*
* Converts the `value` to a float value.
*/

export function toFloat (v) {
  if (isFloat(v)) {
    return v;
  }
  else if (isUndefined(v) || isNull(v)) {
    return null;
  }
  else {
    var pv = parseFloat(v);
    if (isFloat(pv)) {
      return pv;
    }
    else if (toBoolean(v)) {
      return 1;
    }
    else {
      return 0;
    }
  }
}

/*
* Converts the `value` to a number value (alias of toFloat).
*/

export function toNumber (v) {
  return toFloat(v);
}

/*
* Converts the `value` to a date object.
*/

export function toDate (v): Date {
  var date = isDate(v) ? v : new Date(v);
  var time = date.getTime();
  var isValid = (
    isPresent(v)
    && isInteger(time)
  );

  return isValid ? date : null;
}

/*
* Converts the `value` to an array object.
*/

export function toArray (v): Array<any> {
  if (isArray(v)) {
    return v;
  }
  else if (isUndefined(v) || isNull(v)) {
    return null;
  }
  else if (!isValue(v)) {
    return [];
  }
  else {
    return [v];
  }
}

/*
* Converts the `value` to the specified `type`.
*/

export function cast (value, type) {
  if (isUndefined(value) || isNull(value)) { // nullify
    return null;
  }

  if (isArray(type)) {
    return toArray(value).map(i => cast(i, type[0]));
  }
  else if (isFunction(type)) {
    return type(value);
  }
  else if (isString(type)) {
    let converter = {
      'Any': (v) => value,
      'String': toString,
      'Boolean': toBoolean,
      'Integer': toInteger,
      'Float': toFloat,
      'Number': toNumber,
      'Date': toDate
    }[type];
    if (converter) {
      return converter(value);
    }
    else {
      throw new Error(`Unknown type ${type}`);
    }
  }
  else {
    return value;
  }
}
