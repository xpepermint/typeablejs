![Build Status](https://travis-ci.org/xpepermint/typeablejs.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/typeable.svg)](https://badge.fury.io/js/typeable)&nbsp;[![Dependency Status](https://gemnasium.com/xpepermint/typeablejs.svg)](https://gemnasium.com/xpepermint/typeablejs)

# typeable.js

> A library for checking and casting types.

This is a light weight open source package for use on **server** or in **browser** (using module bundler). The source code is available on [GitHub](https://github.com/xpepermint/typeablejs) where you can also find our [issue tracker](https://github.com/xpepermint/typeablejs/issues).

## Related Projects

* [RawModel.js](https://github.com/xpepermint/rawmodeljs): Strongly-typed JavaScript object with support for validation and error handling.
* [Validatable.js](https://github.com/xpepermint/validatablejs): A library for synchronous and asynchronous validation.
* [Handleable.js](https://github.com/xpepermint/handleablejs): A library for synchronous and asynchronous error handling.

## Install

Run the command below to install the package.

```
$ npm install --save typeable
```

## Examples

```js
import {cast} from 'typeable';

// general use
cast(100, 'String'); // => '100'
cast('true', 'Boolean'); // => true
cast('10.13', 'Integer'); // => 10
cast('10.13', 'Float'); // => 10.13
cast('10.13', 'Number'); // => 10.13
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
cast('10.13', ['Number']); // => [10.13]
cast(['10.13'], ['Number']); // => [10.13]
cast(1229380112300, ['Date']); // => [Date(2008-12-15T22:28:32.300Z)]
cast([1229380112300], ['Date']); // => [Date(2008-12-15T22:28:32.300Z)]

// short syntax
cast('10.13', 'Integer'); // => 10

// custom types
cast('value', (value) => `custom ${value}`); // => 'custom value'
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
| 'Number' | An integer or a float number.
| ['Number'] | An array of integer or float numbers.
| 'Integer' | An integer number.
| ['Integer'] | An array of integer numbers.
| 'Float' | A float number.
| ['Float'] | An array of float numbers.
| 'Date' | A date.
| ['Date'] | An array of dates.
| Function | Custom type.
| [Function] | Custom type.

### Methods

**cast(value, type)**:Any
> Converts the `value` to the specified `type`.

| Name | Type | Required | Default | Description
|------|------|----------|---------|------------
| value | Any | Yes | - | A value to be casted.
| type | String | Yes | - | Data type name.

**isAbsent(value)**:Boolean
> Returns `true` if the `value` represents an empty value.

**isArray(value)**:Boolean
> Returns `true` if the `value` is an array.

**isBoolean(value)**:Boolean
> Returns `true` if the `value` is a boolean value.

**isClass(value)**:Boolean
> Returns `true` if the `value` represents a class object.

**isDate(value)**:Boolean
> Returns `true` if the `value` is a date object.

**isFloat(value)**:Boolean
> Returns `true` if the `value` is a float number.

**isFunction(value)**:Boolean
> Returns `true` if the `value` represents a function.

**isInfinite(value)**:Boolean
> Returns `true` if the provided `value` represents infinite number.

**isInteger(value)**:Boolean
> Returns `true` if the `value` is an integer number.

**isNull(value)**:Boolean
> Returns `true` if the provided `value` is `null`.

**isNumber(value)**:Boolean
> Returns `true` if the `value` is a number.

**isObject(value)**:Boolean
> Returns `true` if the `value` is an object (an object with keys).

**isPresent(value)**:Boolean
> Returns `true` if the `value` represents a present value.

**isPromise(value)**:Boolean
> Returns `true` if the `value` represents a promise object.

**isString(value)**:Boolean
> Returns `true` if the `value` is a string value.

**isUndefined(value)**:Boolean
> Returns `true` if the provided `value` is of type `undefined`.

**isValue(value)**:Boolean
> Returns `true` if the `value` is some sort of expected value.

**toArray(value)**:Array
> Converts the `value` to an array object.

**toBoolean(value)**:Boolean
> Converts the `value` to a boolean value.

**toDate(value)**:Date
> Converts the `value` to a date object.

**toFloat(value)**:Number
> Converts the `value` to a float value.

**toInteger(value)**:Number
> Converts the `value` to an integer value.

**toNumber(value)**:Number
> Converts the `value` to a number value.

**toString(value)**:String
> Converts the `value` to a string value.

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
