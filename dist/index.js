'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isInfinite = isInfinite;
exports.isValue = isValue;
exports.isString = isString;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isInteger = isInteger;
exports.isFloat = isFloat;
exports.isDate = isDate;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isAbsent = isAbsent;
exports.isPresent = isPresent;
exports.isFunction = isFunction;
exports.isClass = isClass;
exports.isPromise = isPromise;
exports.toString = toString;
exports.toBoolean = toBoolean;
exports.toInteger = toInteger;
exports.toFloat = toFloat;
exports.toNumber = toNumber;
exports.toDate = toDate;
exports.toArray = toArray;
exports.cast = cast;
/*
* Returns `true` if the provided value is of type `undefined`.
*/

function isUndefined(v) {
  return typeof v === 'undefined' || v === undefined;
}

/*
* Returns `true` if the provided value is `null`.
*/

function isNull(v) {
  return v === null;
}

/*
* Returns `true` if the provided value represents infinite number.
*/

function isInfinite(v) {
  return v === Infinity;
}

/*
* Returns `true` if the `value` is some sort of expected value.
*/

function isValue(v) {
  return !isUndefined(v) && !isNull(v) && !(isNumber(v) && isNaN(v)) && !isInfinite(v);
}

/*
* Returns `true` if the `value` is a string value.
*/

function isString(v) {
  return typeof v === 'string';
}

/*
* Returns `true` if the `value` is a boolean value.
*/

function isBoolean(v) {
  return typeof v === 'boolean';
}

/*
* Returns `true` if the `value` is a number.
*/

function isNumber(v) {
  return typeof v === 'number';
}

/*
* Returns `true` if the `value` is an integer number.
*/

function isInteger(v) {
  return isNumber(v) ? v % 1 === 0 : false;
}

/*
* Returns `true` if the `value` is a float number.
*/

function isFloat(v) {
  return isNumber(v) && isFinite(v);
}

/*
* Returns `true` if the `value` is a date object.
*/

function isDate(v) {
  return !isUndefined(v) && !isNull(v) && v.constructor === Date && isInteger(v.getTime());
}

/*
* Returns `true` if the `value` is an object (an object with keys).
*/

function isObject(v) {
  return !isUndefined(v) && !isNull(v) && v.constructor === Object;
}

/*
* Returns `true` if the `value` is an array.
*/

function isArray(v) {
  return Array.isArray(v);
}

/*
* Returns `true` if the `value` represents an empty value.
*/

function isAbsent(v) {
  return isUndefined(v) || isNull(v) || isNumber(v) && isNaN(v) || isString(v) && v === '' || isArray(v) && v.length === 0 || isObject(v) && Object.keys(v).length === 0;
}

/*
* Returns `true` if the `value` represents a present value.
*/

function isPresent(v) {
  return !isAbsent(v);
}

/*
* Returns `true` if the `value` represents a function.
*/

function isFunction(v) {
  return typeof v === 'function';
}

/*
* Returns `true` if the `value` represents a class object.
*/

function isClass(v) {
  return isFunction(v);
}

/*
* Returns `true` if the `value` represents a promise object.
*/

function isPromise(v) {
  return isPresent(v) && v.constructor && v.constructor.name === 'Promise';
}

/*
* Converts the `value` to a string value.
*/

function toString(v) {
  if (isString(v)) {
    return v;
  } else if (isUndefined(v) || isNull(v)) {
    return null;
  } else {
    return toString(v.toString());
  }
}

/*
* Converts the `value` to a boolean value.
*/

function toBoolean(v) {
  if (isBoolean(v)) {
    return v;
  } else if (isUndefined(v) || isNull(v)) {
    return null;
  } else {
    return parseFloat(v) > 0 || isInfinite(v) || v === '1' || v === 'true' || v === 'yes' || v === '+';
  }
}

/*
* Converts the `value` to an integer value.
*/

function toInteger(v) {
  if (isInteger(v)) {
    return v;
  } else if (isUndefined(v) || isNull(v)) {
    return null;
  } else if (isFloat(v)) {
    return parseInt(v);
  } else {
    var pv = parseInt(v);
    if (isInteger(pv)) {
      return pv;
    } else if (toBoolean(v)) {
      return 1;
    } else {
      return 0;
    }
  }
}

/*
* Converts the `value` to a float value.
*/

function toFloat(v) {
  if (isFloat(v)) {
    return v;
  } else if (isUndefined(v) || isNull(v)) {
    return null;
  } else {
    var pv = parseFloat(v);
    if (isFloat(pv)) {
      return pv;
    } else if (toBoolean(v)) {
      return 1;
    } else {
      return 0;
    }
  }
}

/*
* Converts the `value` to a number value (alias of toFloat).
*/

function toNumber(v) {
  return toFloat(v);
}

/*
* Converts the `value` to a date object.
*/

function toDate(v) {
  var date = isDate(v) ? v : new Date(v);
  var time = date.getTime();
  var isValid = isPresent(v) && isInteger(time);

  return isValid ? date : null;
}

/*
* Converts the `value` to an array object.
*/

function toArray(v) {
  if (isArray(v)) {
    return v;
  } else if (isUndefined(v) || isNull(v)) {
    return null;
  } else if (!isValue(v)) {
    return [];
  } else {
    return [v];
  }
}

/*
* Converts the `value` to the specified `type`.
*/

function cast(value, type) {
  var types = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (isUndefined(value) || isNull(value)) {
    return null;
  }

  if (isArray(type)) {
    return toArray(value).map(function (i) {
      return cast(i, type[0], types);
    });
  } else if (type) {
    var name = isString(type) ? type : type.constructor.name;
    var converters = _extends({
      'Any': function Any(v) {
        return value;
      },
      'String': toString,
      'Boolean': toBoolean,
      'Integer': toInteger,
      'Float': toFloat,
      'Number': toNumber,
      'Date': toDate
    }, types);

    var converter = converters[name];
    if (converter) {
      return converter(value);
    } else {
      throw new Error('Unknown type ' + name);
    }
  }
  return value;
}