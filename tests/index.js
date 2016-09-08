const test = require('ava');
const typeable = require('../src');

test('isUndefined', (t) => {
  t.is(typeable.isUndefined(), true);
  t.is(typeable.isUndefined(undefined), true);
  t.is(typeable.isUndefined(''), false);
});

test('isNull', (t) => {
  t.is(typeable.isNull(null), true);
  t.is(typeable.isNull(undefined), false);
  t.is(typeable.isNull(''), false);
});

test('isNaN', (t) => {
  t.is(typeable.isNaN(NaN), true);
  t.is(typeable.isNaN(undefined), false);
  t.is(typeable.isNaN(null), false);
  t.is(typeable.isNaN(0), false);
});

test('isFinite', (t) => {
  t.is(typeable.isFinite(0), true);
  t.is(typeable.isFinite(-100), true);
  t.is(typeable.isFinite(null), false);
  t.is(typeable.isFinite(''), false);
  t.is(typeable.isFinite([]), false);
  t.is(typeable.isFinite({}), false);
  t.is(typeable.isFinite(false), false);
  t.is(typeable.isFinite(undefined), false);
  t.is(typeable.isFinite(Infinity), false);
});

test('isInfinite', (t) => {
  t.is(typeable.isInfinite(Infinity), true);
  t.is(typeable.isInfinite(0), false);
  t.is(typeable.isInfinite(''), false);
});

test('isValue', (t) => {
  t.is(typeable.isValue(undefined), false);
  t.is(typeable.isValue(null), false);
  t.is(typeable.isValue(NaN), false);
  t.is(typeable.isValue(Infinity), false);
  t.is(typeable.isValue(0), true);
  t.is(typeable.isValue(''), true);
  t.is(typeable.isValue(new Date()), true);
  t.is(typeable.isValue([]), true);
  t.is(typeable.isValue({}), true);
});

test('isString', (t) => {
  t.is(typeable.isString(''), true);
  t.is(typeable.isString('foo'), true);
  t.is(typeable.isString(null), false);
});

test('isBoolean', (t) => {
  t.is(typeable.isBoolean(true), true);
  t.is(typeable.isBoolean(false), true);
  t.is(typeable.isBoolean('true'), false);
});

test('isNumber', (t) => {
  t.is(typeable.isNumber(0), true);
  t.is(typeable.isNumber(100.0), true);
  t.is(typeable.isNumber(-100.0), true);
  t.is(typeable.isNumber(NaN), true);
  t.is(typeable.isNumber(Infinity), true);
  t.is(typeable.isNumber(undefined), false);
  t.is(typeable.isNumber(null), false);
  t.is(typeable.isNumber(''), false);
  t.is(typeable.isNumber('100'), false);
});

test('isInteger', (t) => {
  t.is(typeable.isInteger(0), true);
  t.is(typeable.isInteger(10), true);
  t.is(typeable.isInteger(-10), true);
  t.is(typeable.isInteger(10.1), false);
  t.is(typeable.isInteger(Infinity), false);
  t.is(typeable.isInteger(NaN), false);
  t.is(typeable.isInteger(null), false);
  t.is(typeable.isInteger(undefined), false);
});

test('isFloat', (t) => {
  t.is(typeable.isFloat(0), true);
  t.is(typeable.isFloat(-100), true);
  t.is(typeable.isFloat(100), true);
  t.is(typeable.isFloat(0.1), true);
  t.is(typeable.isFloat(-0.1), true);
  t.is(typeable.isFloat(Infinity), false);
  t.is(typeable.isFloat(NaN), false);
  t.is(typeable.isFloat(null), false);
  t.is(typeable.isFloat(undefined), false);
});

test('isDate', (t) => {
  t.is(typeable.isDate(new Date()), true);
  t.is(typeable.isDate(new Date('ksjlfjsdfjsd')), false);
  t.is(typeable.isDate(null), false);
  t.is(typeable.isDate(undefined), false);
  t.is(typeable.isDate(NaN), false);
  t.is(typeable.isDate(Infinity), false);
  t.is(typeable.isDate(0), false);
  t.is(typeable.isDate(100), false);
  t.is(typeable.isDate(''), false);
});

test('isObject', (t) => {
  t.is(typeable.isObject({}), true);
  t.is(typeable.isObject(Infinity), false);
  t.is(typeable.isObject(NaN), false);
  t.is(typeable.isObject(null), false);
  t.is(typeable.isObject(undefined), false);
  t.is(typeable.isObject(0), false);
  t.is(typeable.isObject(''), false);
  t.is(typeable.isObject(new Date()), false);
});

test('isArray', (t) => {
  t.is(typeable.isArray([]), true);
  t.is(typeable.isArray([1]), true);
  t.is(typeable.isArray({}), false);
  t.is(typeable.isArray(Infinity), false);
  t.is(typeable.isArray(NaN), false);
  t.is(typeable.isArray(null), false);
  t.is(typeable.isArray(undefined), false);
  t.is(typeable.isArray(0), false);
  t.is(typeable.isArray(''), false);
});

test('isAbsent', (t) => {
  t.is(typeable.isAbsent(undefined), true);
  t.is(typeable.isAbsent(null), true);
  t.is(typeable.isAbsent(NaN), true);
  t.is(typeable.isAbsent([]), true);
  t.is(typeable.isAbsent({}), true);
  t.is(typeable.isAbsent(''), true);
  t.is(typeable.isAbsent(0), false);
  t.is(typeable.isAbsent(Infinity), false);
  t.is(typeable.isAbsent([1]), false);
});

test('isPresent', (t) => {
  t.is(typeable.isPresent(0), true);
  t.is(typeable.isPresent(Infinity), true);
  t.is(typeable.isPresent([1]), true);
  t.is(typeable.isPresent(undefined), false);
  t.is(typeable.isPresent(null), false);
  t.is(typeable.isPresent(NaN), false);
  t.is(typeable.isPresent([]), false);
  t.is(typeable.isPresent({}), false);
  t.is(typeable.isPresent(''), false);
});

test('isFunction', (t) => {
  t.is(typeable.isFunction(undefined), false);
  t.is(typeable.isFunction(null), false);
  t.is(typeable.isFunction(NaN), false);
  t.is(typeable.isFunction(() => {}), true);
  t.is(typeable.isFunction(function() {}), true);
  t.is(typeable.isPresent(class {}), true);
});

test('isClass', (t) => {
  t.is(typeable.isFunction(undefined), false);
  t.is(typeable.isFunction(null), false);
  t.is(typeable.isFunction(NaN), false);
  t.is(typeable.isFunction(() => {}), true);
  t.is(typeable.isFunction(function() {}), true);
  t.is(typeable.isPresent(class {}), true);
});

test('isPromise', (t) => {
  t.is(typeable.isPromise(undefined), false);
  t.is(typeable.isPromise(null), false);
  t.is(typeable.isPromise(NaN), false);
  t.is(typeable.isPromise(() => {}), false);
  t.is(typeable.isPromise(function() {}), false);
  t.is(typeable.isPromise(class {}), false);
  t.is(typeable.isPromise(Promise.resolve({})), true);
  t.is(typeable.isPromise(new Promise((a,b) => {})), true);
});

test('toString', (t) => {
  t.is(typeable.toString(), null);
  t.is(typeable.toString(undefined), null);
  t.is(typeable.toString(null), null);
  t.is(typeable.toString(''), '');
  t.is(typeable.toString(NaN), 'NaN');
  t.is(typeable.toString(Infinity), 'Infinity');
  t.is(typeable.toString(true), 'true');
  t.is(typeable.toString(100.1), '100.1');
  t.is(typeable.toString([1,2]), '1,2');
});

test('toBoolean', (t) => {
  t.is(typeable.toBoolean(), null);
  t.is(typeable.toBoolean(undefined), null);
  t.is(typeable.toBoolean(null), null);
  t.is(typeable.toBoolean(false), false);
  t.is(typeable.toBoolean(NaN), false);
  t.is(typeable.toBoolean(0), false);
  t.is(typeable.toBoolean(-100), false);
  t.is(typeable.toBoolean('-'), false);
  t.is(typeable.toBoolean('0'), false);
  t.is(typeable.toBoolean('-10'), false);
  t.is(typeable.toBoolean('false'), false);
  t.is(typeable.toBoolean(true), true);
  t.is(typeable.toBoolean(1), true);
  t.is(typeable.toBoolean(100), true);
  t.is(typeable.toBoolean(Infinity), true);
  t.is(typeable.toBoolean('+'), true);
  t.is(typeable.toBoolean('1'), true);
  t.is(typeable.toBoolean('100'), true);
  t.is(typeable.toBoolean('true'), true);
  t.is(typeable.toBoolean('yes'), true);
});

test('toInteger', (t) => {
  t.is(typeable.toInteger(), null);
  t.is(typeable.toInteger(undefined), null);
  t.is(typeable.toInteger(null), null);
  t.is(typeable.toInteger(false), 0);
  t.is(typeable.toInteger(NaN), 0);
  t.is(typeable.toInteger(0), 0);
  t.is(typeable.toInteger(-100), -100);
  t.is(typeable.toInteger('-100'), -100);
  t.is(typeable.toInteger('-100.0'), -100);
  t.is(typeable.toInteger('false'), 0);
  t.is(typeable.toInteger(Infinity), 1);
  t.is(typeable.toInteger('true'), 1);
  t.is(typeable.toInteger('yes'), 1);
});

test('toFloat', (t) => {
  t.is(typeable.toFloat(), null);
  t.is(typeable.toFloat(undefined), null);
  t.is(typeable.toFloat(null), null);
  t.is(typeable.toFloat(false), 0);
  t.is(typeable.toFloat(NaN), 0);
  t.is(typeable.toFloat(0), 0);
  t.is(typeable.toFloat(-100), -100);
  t.is(typeable.toFloat('-100'), -100);
  t.is(typeable.toFloat('-100.0'), -100);
  t.is(typeable.toFloat('-100.99'), -100.99);
  t.is(typeable.toFloat('false'), 0);
  t.is(typeable.toFloat(Infinity), 1);
  t.is(typeable.toFloat('true'), 1);
  t.is(typeable.toFloat('yes'), 1);
});

test('toDate', (t) => {
  let d = new Date();
  t.is(typeable.toDate(d), d);
  t.deepEqual(typeable.toDate(100000), new Date(100000));
  t.deepEqual(typeable.toDate('2016-01-02'), new Date('2016-01-02'));
  t.is(typeable.toDate(), null);
  t.is(typeable.toDate(undefined), null);
  t.is(typeable.toDate(null), null);
  t.is(typeable.toDate('8sadufsdjfk1231'), null);
});

test('toArray', (t) => {
  t.deepEqual(typeable.toArray(), null);
  t.deepEqual(typeable.toArray(undefined), null);
  t.deepEqual(typeable.toArray(null), null);
  t.deepEqual(typeable.toArray(NaN), []);
  t.deepEqual(typeable.toArray(Infinity), []);
  t.deepEqual(typeable.toArray([]), []);
  t.deepEqual(typeable.toArray({}), [{}]);
  t.deepEqual(typeable.toArray(''), ['']);
  t.deepEqual(typeable.toArray(0), [0]);
  t.deepEqual(typeable.toArray('john'), ['john']);
});

test('cast (Any type)', (t) => {
  t.is(typeable.cast(100, 'Any'), 100);
  t.is(typeable.cast('100', 'Any'), '100');
  t.deepEqual(typeable.cast(100, ['Any']), [100]);
  t.deepEqual(typeable.cast('100', ['Any']), ['100']);
  t.deepEqual(typeable.cast(['100', 200], ['Any']), ['100', 200]);
});

test('cast (general type)', (t) => {
  t.is(typeable.cast(100, 'String'), '100');
  t.is(typeable.cast('true', 'Boolean'), true);
  t.is(typeable.cast('10.13', 'Integer'), 10);
  t.is(typeable.cast('10.13', 'Float'), 10.13);
  t.deepEqual(typeable.cast(100000, 'Date'), new Date(100000));
  t.deepEqual(typeable.cast('john', 'Array'), ['john']);
  t.deepEqual(typeable.cast('john', []), ['john']);
  t.deepEqual(typeable.cast(100, ['String']), ['100']);
  t.deepEqual(typeable.cast([100], ['String']), ['100']);
  t.deepEqual(typeable.cast('true', ['Boolean']), [true]);
  t.deepEqual(typeable.cast(['true'], ['Boolean']), [true]);
  t.deepEqual(typeable.cast('10.13', ['Integer']), [10]);
  t.deepEqual(typeable.cast(['10.13'], ['Integer']), [10]);
  t.deepEqual(typeable.cast('10.13', ['Float']), [10.13]);
  t.deepEqual(typeable.cast(['10.13'], ['Float']), [10.13]);
  t.deepEqual(typeable.cast(100000, ['Date']), [new Date(100000)]);
  t.deepEqual(typeable.cast([100000], ['Date']), [new Date(100000)]);
});

test('cast (custom type)', (t) => {
  let type = null;
  let types = null;

  // short format

  type = 'Schema';
  types = {Schema: (value) => `${value} as Schema`};
  t.deepEqual(typeable.cast(100, type, {types}), '100 as Schema');
  t.deepEqual(typeable.cast(undefined, type, {types}), null);
  t.deepEqual(typeable.cast(null, type, {types}), null);
  t.deepEqual(typeable.cast(NaN, type, {types}), 'NaN as Schema');

  type = new class Schema {};
  types = {Schema: (value) => `${value} as Schema`};
  t.deepEqual(typeable.cast(100, type, {types}), '100 as Schema');

  type = [new class Schema {}];
  types = {Schema: (value) => `${value} as Schema`};
  t.deepEqual(typeable.cast(100, type, {types}), ['100 as Schema']);
  t.deepEqual(typeable.cast(undefined, type, {types}), null);
  t.deepEqual(typeable.cast(null, type, {types}), null);
  t.deepEqual(typeable.cast(NaN, type, {types}), []);
  t.deepEqual(typeable.cast(Infinity, type, {types}), []);
});
