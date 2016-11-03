/*
* Returns `true` if the provided value is of type `undefined`.
*/

export function isUndefined (v:any):boolean {
  return typeof v === 'undefined' || v === undefined;
}

/*
* Returns `true` if the provided value is `null`.
*/

export function isNull (v:any):boolean {
  return v === null;
}

/*
* Returns `true` if the provided value is `NaN` number.
*/

export function isNaN (v:any):boolean {
  return Number.isNaN(v);
}

/*
* Returns `true` if the provided value is a legal finite number.
*/

export function isFinite (v:any):boolean {
  return Number.isFinite(v);
}

/*
* Returns `true` if the provided value represents infinite number.
*/

export function isInfinite (v:any):boolean {
  return v === Infinity;
}

/*
* Returns `true` if the `value` is some sort of expected value.
*/

export function isValue (v:any):boolean {
  return (
    !isUndefined(v)
    && !isNull(v)
    && !isNaN(v)
    && !isInfinite(v)
  );
}

/*
* Returns `true` if the `value` is a string value.
*/

export function isString (v:any):boolean {
  return typeof v === 'string';
}

/*
* Returns `true` if the `value` is a boolean value.
*/

export function isBoolean (v:any):boolean {
  return typeof v === 'boolean';
}

/*
* Returns `true` if the `value` is a number.
*/

export function isNumber (v:any):boolean {
  return typeof v === 'number';
}

/*
* Returns `true` if the `value` is an integer number.
*/

export function isInteger (v:any):boolean {
  return Number.isInteger(v);
}

/*
* Returns `true` if the `value` is a float number.
*/

export function isFloat (v:any):boolean {
  return (
    isNumber(v)
    && isFinite(v)
  );
}

/*
* Returns `true` if the `value` is a date object.
*/

export function isDate (v:any):boolean {
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

export function isObject (v:any):boolean {
  return (
    !isUndefined(v)
    && !isNull(v)
    && v.constructor === Object
  );
}

/*
* Returns `true` if the `value` is an array.
*/

export function isArray (v:any):boolean {
  return Array.isArray(v);
}

/*
* Returns `true` if the `value` represents an empty value.
*/

export function isAbsent (v:any):boolean {
  return (
    isUndefined(v)
    || isNull(v)
    || isNaN(v)
    || isString(v) && v === ''
    || isArray(v) && v.length === 0
    || isObject(v) && Object.keys(v).length === 0
  );
}

/*
* Returns `true` if the `value` represents a present value.
*/

export function isPresent (v:any):boolean {
  return !isAbsent(v);
}

/*
* Returns `true` if the `value` represents a function.
*/

export function isFunction (v:any):boolean {
  return typeof v === 'function';
}

/*
* Returns `true` if the `value` represents a class object.
*/

export function isClass (v:any):boolean {
  return isFunction(v);
}

/*
* Returns `true` if the `value` represents a promise object.
*/

export function isPromise (v:any):boolean {
  return (
    isPresent(v)
    && v.constructor
    && v.constructor.name === 'Promise'
  );
}

/*
* Converts the `value` to a string value.
*/

export function toString (v:any):string {
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

export function toBoolean (v:any):boolean {
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

export function toInteger (v:any):number {
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

export function toFloat (v:any):number {
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
* Converts the `value` to a date object.
*/

export function toDate (v:any):Date {
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

export function toArray (v:any):Array<any> {
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
* An interface defining an object of custom types.
*/

export interface CastTypes {
  [s: string]: any;
}

/*
* An interface defining an object of options for the `cast` method.
*/

export interface CastOptions {
  types?: CastTypes;
}

/*
* Converts the `value` to the specified `type`.
*/

export function cast (v:any, type:any, options:CastOptions={}):any {
  if (isUndefined(v) || isNull(v)) {
    return null;
  }

  if (isArray(type)) {
    return toArray(v).map(i => cast(i, type[0], options));
  }
  else {
    let name:string = isString(type) ? type : type.constructor.name;
    let converters = Object.assign({
      'Any': (v) => v,
      'String': toString,
      'Boolean': toBoolean,
      'Integer': toInteger,
      'Float': toFloat,
      'Date': toDate
    }, options.types);

    let converter = converters[name];
    if (converter) {
      return converter(v);
    }
    else {
      throw new Error(`Unknown type ${name}`);
    }
  }
}
