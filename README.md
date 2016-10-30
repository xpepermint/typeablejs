![Build Status](https://travis-ci.org/xpepermint/typeablejs.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/typeable.svg)](https://badge.fury.io/js/typeable)&nbsp;[![Dependency Status](https://gemnasium.com/xpepermint/typeablejs.svg)](https://gemnasium.com/xpepermint/typeablejs)

# typeable.js

> A library for checking and casting types.

## Related Projects

* [Validatable.js](https://github.com/xpepermint/validatablejs): A library for synchronous and asynchronous validation.
* [ObjectSchema.js](https://github.com/xpepermint/objectschemajs): Advanced schema enforced JavaScript objects.
* [Contextable.js](https://github.com/xpepermint/contextablejs): Simple, unopinionated and minimalist framework for creating context objects with support for unopinionated ORM, object schemas, type casting, validation and error handling and more.

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
cast('John', 'Array'); // => ['John']
cast('John', []); // => ['John']
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
| 'BSON.ObjectId' | A BSON object (used in MongoDB).
| ['BSON.ObjectId'] | An array of BSON objects (used in MongoDB).
| ['Date'] | An array of dates.
| 'Array' or [] | An array of values.

### Methods

**isUndefined(value)**
> Returns `true` if the `value` is undefined.

**isNull(value)**
> Returns `true` if the `value` is null.

**isNaN(value)**
> Returns `true` if the `value` is a NaN number.

**isFinite(value)**
> Returns `true` if the `value` is a finite number.

**isInfinite(value)**
> Returns `true` if the `value` is a infinite number.

**isValue(value)**
> Returns `true` if the `value` is some sort of value.

**isString(value)**
> Returns `true` if the `value` is a string value.

**isBoolean(value)**
> Returns `true` if the `value` is a boolean value.

**isNumber(value)**
> Returns `true` if the `value` is a number.

**isInteger(value)**
> Returns `true` if the `value` is an integer number.

**isFloat(value)**
> Returns `true` if the `value` is a float number.

**isDate(value)**
> Returns `true` if the `value` is a date object.

**isObject(value)**
> Returns `true` if the `value` is an object (an object with keys).

**isBSONObjectId(value)**
> Returns `true` if the `value` is a BSON ObjectId (used in MongoDB).

**isArray(value)**
> Returns `true` if the `value` is an array.

**isAbsent(value)**
> Returns `true` if the `value` represents an empty value.

**isPresent(value)**
> Returns `true` if the `value` represents a present value.

**toString(value)**
> Converts the `value` to string.

**toBoolean(value)**
> Converts the `value` to boolean.

**toInteger(value)**
> Converts the `value` to integer.

**toFloat(value)**
> Converts the `value` to float.

**toDate(value)**
> Converts the `value` to date.

**toBSONObjectId(value)**
> Converts the `value` to BSON ObjectId (used in MongoDB).

**toArray(value)**
> Converts the `value` to array.

**cast(value, type, {types})**
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
