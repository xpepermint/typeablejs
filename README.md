![Build Status](https://travis-ci.org/xpepermint/typeablejs.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/typeable.svg)](https://badge.fury.io/js/typeable)&nbsp;[![Dependency Status](https://gemnasium.com/xpepermint/typeablejs.svg)](https://gemnasium.com/xpepermint/typeablejs)

# typeable.js

> A library for checking and casting types.

This is a light weight open source package, written with [TypeScript](https://www.typescriptlang.org), for use on **server or in browser**. The source code is available on [GitHub](https://github.com/xpepermint/typeablejs) where you can also find our [issue tracker](https://github.com/xpepermint/typeablejs/issues).

## Related Projects

* [Contextable.js](https://github.com/xpepermint/contextablejs): Simple, unopinionated and minimalist framework for creating context objects with support for unopinionated ORM, object schemas, type casting, validation and error handling and more.
* [ObjectSchema.js](https://github.com/xpepermint/objectschemajs): Advanced schema enforced JavaScript objects.
* [Validatable.js](https://github.com/xpepermint/validatablejs): A library for synchronous and asynchronous validation.
* [Handleable.js](https://github.com/xpepermint/handleablejs): A library for synchronous and asynchronous error handling.

## Install

Run the command below to install the package.
```
$ npm install --save typeable
```

## Example

```js
import {cast} from 'typeable';

// general use
cast(100, 'String'); // => '100'
cast('true', 'Boolean'); // => true
cast('10.13', 'Integer'); // => 10
cast('10.13', 'Float'); // => 10.13
cast(1229380112300, 'Date'); // => Date(2008-12-15T22:28:32.300Z)
cast('John', ['Any']); // => ['John']
cast(100, ['String']); // => ['100']
cast([100], ['String']); // => ['100']
cast('true', ['Boolean']); // => [true]
cast(['true'], ['Boolean']); // => [true]
cast('10.13', ['Integer']); // => [10]
cast(['10.13'], ['Integer']); // => [10]
cast('10.13', ['Float']); // => [10.13]
cast(['10.13'], ['Float']); // => [10.13]
cast(1229380112300, ['Date']); // => [Date(2008-12-15T22:28:32.300Z)]
cast([1229380112300], ['Date']); // => [Date(2008-12-15T22:28:32.300Z)]

// short syntax
cast('10.13', 'Integer'); // => 10

// custom types
cast('value', 'Custom', {
  types: {
    Custom: (value, {type}) => `${type} ${value}`
  }
}); // => 'custom value'

// check tests for more ...
```

## API

### Data Types

| Type | Description
|------|------------
| 'Any' | A value of different types (excluding arrays).
| ['Any'] | An array with values of different types.
| 'String' | A string value.
| ['String'] | An array of string values.
| 'Boolean' | A boolean value.
| ['Boolean'] | An array of boolean values.
| 'Integer' | An integer number.
| ['Integer'] | An array of integer numbers.
| 'Float' | A float number.
| ['Float'] | An array of float numbers.
| 'Date' | A date.
| ['Date'] | An array of dates.

### Methods

**isUndefined(value)**:Boolean
> Returns `true` if the provided `value` is of type `undefined`.

**isNull(value)**:Boolean
> Returns `true` if the provided `value` is `null`.

**isNaN(value)**:Boolean
> Returns `true` if the provided `value` is `NaN` number.

**isFinite(value)**:Boolean
> Returns `true` if the provided `value` is a legal finite number.

**isInfinite(value)**:Boolean
> Returns `true` if the provided `value` represents infinite number.

**isValue(value)**:Boolean
> Returns `true` if the `value` is some sort of expected value.

**isString(value)**:Boolean
> Returns `true` if the `value` is a string value.

**isBoolean(value)**:Boolean
> Returns `true` if the `value` is a boolean value.

**isNumber(value)**:Boolean
> Returns `true` if the `value` is a number.

**isInteger(value)**:Boolean
> Returns `true` if the `value` is an integer number.

**isFloat(value)**:Boolean
> Returns `true` if the `value` is a float number.

**isDate(value)**:Boolean
> Returns `true` if the `value` is a date object.

**isObject(value)**:Boolean
> Returns `true` if the `value` is an object (an object with keys).

**isArray(value)**:Boolean
> Returns `true` if the `value` is an array.

**isAbsent(value)**:Boolean
> Returns `true` if the `value` represents an empty value.

**isPresent(value)**:Boolean
> Returns `true` if the `value` represents a present value.

**isFunction(value)**:Boolean
> Returns `true` if the `value` represents a function.

**isClass(value)**:Boolean
> Returns `true` if the `value` represents a class object.

**isPromise(value)**:Boolean
> Returns `true` if the `value` represents a promise object.

**toString(value)**:String
> Converts the `value` to a string value.

**toBoolean(value)**:Boolean
> Converts the `value` to a boolean value.

**toInteger(value)**:Number
> Converts the `value` to an integer value.

**toFloat(value)**:Number
> Converts the `value` to a float value.

**toDate(value)**:Date
> Converts the `value` to a date object.

**toArray(value)**:Array
> Converts the `value` to an array object.

**cast(value, type, {types})**:Any
> Converts the `value` to the specified `type`.

| Name | Type | Required | Default | Description
|------|------|----------|---------|------------
| value | Any | Yes | - | A value to be casted.
| type | String | Yes | - | Data type name.
| types | Object | No | An object of built-in types. | An object for adding new data type and overriding existing ones.

## License (MIT)

```
Copyright (c) 2016 Kristijan Sedlak <xpepermint@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
