![Build Status](https://travis-ci.org/xpepermint/typeablejs.svg?branch=master)&nbsp;[![NPM Version](https://badge.fury.io/js/typeable.svg)](https://badge.fury.io/js/typeable)&nbsp;[![Dependency Status](https://gemnasium.com/xpepermint/typeablejs.svg)](https://gemnasium.com/xpepermint/typeablejs)

# typeable.js

> A library for checking and casting types.

## Install

```
$ npm install --save typeable
```

## Example

```js
import {cast} from 'typeable';

// general use
cast(100, {type: 'string'}); // => '100'
cast('true', {type: 'boolean'}); // => true
cast('10.13', {type: 'integer'}); // => 10
cast('10.13', {type: 'float'}); // => 10.13
cast(1229380112300, {type: 'date'}); // => Date(2008-12-15T22:28:32.300Z)
cast('John', {type: 'array'}); // => ['John']
cast('John', {type: []}); // => ['John']
cast(100, {type: ['string']}); // => ['100']
cast([100], {type: ['string']}); // => ['100']
cast('true', {type: ['boolean']}); // => [true]
cast(['true'], {type: ['boolean']}); // => [true]
cast('10.13', {type: ['integer']}); // => [10]
cast(['10.13'], {type: ['integer']}); // => [10]
cast('10.13', {type: ['float']}); // => [10.13]
cast(['10.13'], {type: ['float']}); // => [10.13]
cast(1229380112300, {type: ['date']}); // => [Date(2008-12-15T22:28:32.300Z)]
cast([1229380112300], {type: ['date']}); // => [Date(2008-12-15T22:28:32.300Z)]

// short syntax
cast('10.13', 'integer'); // => 10

// custom types
cast('value', {type: 'custom'}, {
  custom: (value, {type}) => `${type} ${value}`
}); // => 'custom value'

// check tests for more ...
```

## API

### Data Types

| Type | Description
|------|------------
| 'string' | A string value.
| ['string'] | An array of string values.
| 'boolean' | A boolean value.
| ['boolean'] | An array of boolean values.
| 'integer' | An integer number.
| ['integer'] | An array of integer numbers.
| 'float' | A float number.
| ['float'] | An array of float numbers.
| 'date' | A date.
| ['date'] | An array of dates.
| 'array' or [] | An array of values.

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

**toArray(value)**
> Converts the `value` to array.

**cast(value, {type}, types)**
> Converts the `value` to the specified `type`.

| Name | Type | Required | Default | Description
|------|------|----------|---------|------------
| value | Any | Yes | - | A value to be casted.
| type | String/Object | Yes | - | Data type.
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
