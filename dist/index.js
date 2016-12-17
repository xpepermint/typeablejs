"use strict";
var merge = require("lodash.merge");
/*
* Returns `true` if the provided value is of type `undefined`.
*/
function isUndefined(v) {
    return typeof v === 'undefined' || v === undefined;
}
exports.isUndefined = isUndefined;
/*
* Returns `true` if the provided value is `null`.
*/
function isNull(v) {
    return v === null;
}
exports.isNull = isNull;
/*
* Returns `true` if the provided value represents infinite number.
*/
function isInfinite(v) {
    return v === Infinity;
}
exports.isInfinite = isInfinite;
/*
* Returns `true` if the `value` is some sort of expected value.
*/
function isValue(v) {
    return (!isUndefined(v)
        && !isNull(v)
        && !(isNumber(v) && isNaN(v))
        && !isInfinite(v));
}
exports.isValue = isValue;
/*
* Returns `true` if the `value` is a string value.
*/
function isString(v) {
    return typeof v === 'string';
}
exports.isString = isString;
/*
* Returns `true` if the `value` is a boolean value.
*/
function isBoolean(v) {
    return typeof v === 'boolean';
}
exports.isBoolean = isBoolean;
/*
* Returns `true` if the `value` is a number.
*/
function isNumber(v) {
    return typeof v === 'number';
}
exports.isNumber = isNumber;
/*
* Returns `true` if the `value` is an integer number.
*/
function isInteger(v) {
    return isNumber(v) ? v % 1 === 0 : false;
}
exports.isInteger = isInteger;
/*
* Returns `true` if the `value` is a float number.
*/
function isFloat(v) {
    return (isNumber(v)
        && isFinite(v));
}
exports.isFloat = isFloat;
/*
* Returns `true` if the `value` is a date object.
*/
function isDate(v) {
    return (!isUndefined(v)
        && !isNull(v)
        && v.constructor === Date
        && isInteger(v.getTime()));
}
exports.isDate = isDate;
/*
* Returns `true` if the `value` is an object (an object with keys).
*/
function isObject(v) {
    return (!isUndefined(v)
        && !isNull(v)
        && v.constructor === Object);
}
exports.isObject = isObject;
/*
* Returns `true` if the `value` is an array.
*/
function isArray(v) {
    return Array.isArray(v);
}
exports.isArray = isArray;
/*
* Returns `true` if the `value` represents an empty value.
*/
function isAbsent(v) {
    return (isUndefined(v)
        || isNull(v)
        || (isNumber(v) && isNaN(v))
        || isString(v) && v === ''
        || isArray(v) && v.length === 0
        || isObject(v) && Object.keys(v).length === 0);
}
exports.isAbsent = isAbsent;
/*
* Returns `true` if the `value` represents a present value.
*/
function isPresent(v) {
    return !isAbsent(v);
}
exports.isPresent = isPresent;
/*
* Returns `true` if the `value` represents a function.
*/
function isFunction(v) {
    return typeof v === 'function';
}
exports.isFunction = isFunction;
/*
* Returns `true` if the `value` represents a class object.
*/
function isClass(v) {
    return isFunction(v);
}
exports.isClass = isClass;
/*
* Returns `true` if the `value` represents a promise object.
*/
function isPromise(v) {
    return (isPresent(v)
        && v.constructor
        && v.constructor.name === 'Promise');
}
exports.isPromise = isPromise;
/*
* Converts the `value` to a string value.
*/
function toString(v) {
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
exports.toString = toString;
/*
* Converts the `value` to a boolean value.
*/
function toBoolean(v) {
    if (isBoolean(v)) {
        return v;
    }
    else if (isUndefined(v) || isNull(v)) {
        return null;
    }
    else {
        return (parseFloat(v) > 0
            || isInfinite(v)
            || v === '1'
            || v === 'true'
            || v === 'yes'
            || v === '+');
    }
}
exports.toBoolean = toBoolean;
/*
* Converts the `value` to an integer value.
*/
function toInteger(v) {
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
exports.toInteger = toInteger;
/*
* Converts the `value` to a float value.
*/
function toFloat(v) {
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
exports.toFloat = toFloat;
/*
* Converts the `value` to a number value (alias of toFloat).
*/
function toNumber(v) {
    return toFloat(v);
}
exports.toNumber = toNumber;
/*
* Converts the `value` to a date object.
*/
function toDate(v) {
    var date = isDate(v) ? v : new Date(v);
    var time = date.getTime();
    var isValid = (isPresent(v)
        && isInteger(time));
    return isValid ? date : null;
}
exports.toDate = toDate;
/*
* Converts the `value` to an array object.
*/
function toArray(v) {
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
exports.toArray = toArray;
/*
* Converts the `value` to the specified `type`.
*/
function cast(value, type, types) {
    if (types === void 0) { types = []; }
    if (isUndefined(value) || isNull(value)) {
        return null;
    }
    if (isArray(type)) {
        return toArray(value).map(function (i) { return cast(i, type[0], types); });
    }
    else if (type) {
        var name_1 = isString(type) ? type : type.constructor.name;
        var converters = merge({
            'Any': function (v) { return value; },
            'String': toString,
            'Boolean': toBoolean,
            'Integer': toInteger,
            'Float': toFloat,
            'Number': toNumber,
            'Date': toDate
        }, types);
        var converter = converters[name_1];
        if (converter) {
            return converter(value);
        }
        else {
            throw new Error("Unknown type " + name_1);
        }
    }
    return value;
}
exports.cast = cast;
