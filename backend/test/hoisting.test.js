// Runnable examples of JavaScript hoisting. Run with: npm test
// Hoisting: declarations are registered when the scope is created, before any code in it runs.
// What differs is how each kind of declaration is initialised.

const test = require('node:test');
const assert = require('node:assert/strict');

test('function declaration: hoisted completely, so it can be called before it is written', () => {
  function demo() {
    return add(2, 3); // call comes first ...
    function add(a, b) { return a + b; } // ... definition comes later
  }
  assert.equal(demo(), 5);
});

test('var: the name is hoisted and starts as undefined', () => {
  function demo() {
    const before = typeof city; // no error: the variable exists but is undefined
    var city = 'Chennai';
    return [before, city];
  }
  assert.deepEqual(demo(), ['undefined', 'Chennai']);
});

test('let and const: hoisted, but in the temporal dead zone until their line runs', () => {
  assert.throws(() => { typeof score; let score = 1; return score; }, ReferenceError);
  assert.throws(() => { typeof LIMIT; const LIMIT = 10; return LIMIT; }, ReferenceError);
});

test('var function expression: only the name is hoisted, not the function', () => {
  assert.throws(() => { subtract(5, 2); var subtract = (a, b) => a - b; }, TypeError);
});

test('real project code: prompt.js calls buildUserMessage before it is defined', () => {
  // prompt.js line "const EXAMPLE_REQUEST = buildUserMessage(...)" runs while the module loads,
  // above the function's definition. If the function were not hoisted, this require would throw.
  const { buildContents, EXAMPLE_RESPONSE } = require('../src/ai/prompt');
  const contents = buildContents({ title: 'Test lesson', context: 'Some notes.' }, 'a focus');
  assert.equal(contents.length, 3);
  assert.match(contents[0].parts[0].text, /^LESSON: Atomic Number/);
  assert.equal(typeof EXAMPLE_RESPONSE.title, 'string');
});
