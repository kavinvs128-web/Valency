// Runnable examples of the JavaScript event loop. Run with: npm test
//
// Order of work: 1) the call stack runs synchronous code to the end,
//                2) then the microtask queue (promise callbacks, `await`),
//                3) then one task from the task queue (setTimeout, I/O callbacks), and repeat.

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = 'test-secret';

test('order: synchronous code, then microtasks (promises), then timers (task queue)', async () => {
  const order = [];

  setTimeout(() => order.push('timer (task queue)'), 0);
  Promise.resolve().then(() => order.push('promise (microtask queue)'));
  order.push('synchronous (call stack)');

  await new Promise((resolve) => setTimeout(resolve, 20)); // let everything finish
  assert.deepEqual(order, ['synchronous (call stack)', 'promise (microtask queue)', 'timer (task queue)']);
});

test('a waiting await does not block the thread: two slow requireAuth calls overlap', async () => {
  // Fake User model whose lookup takes 150 ms, like a database round trip.
  const userModelPath = require.resolve(path.join(__dirname, '../src/models/user.model.js'));
  require.cache[userModelPath] = {
    id: userModelPath, filename: userModelPath, loaded: true,
    exports: { findById: (id) => new Promise((resolve) => setTimeout(() => resolve({ _id: id }), 150)) },
  };
  const requireAuth = require('../src/middleware/requireAuth');

  const call = async (sub) => {
    const req = { headers: { authorization: 'Bearer ' + jwt.sign({ sub }, 'test-secret') } };
    let nextCalled = false;
    await requireAuth(req, { status: () => ({ json: () => {} }) }, () => { nextCalled = true; });
    return nextCalled;
  };

  const started = Date.now();
  const results = await Promise.all([call('a'), call('b'), call('c')]);
  const elapsed = Date.now() - started;

  assert.deepEqual(results, [true, true, true]);
  // One at a time would take about 450 ms. While one request awaits the database, the event loop
  // serves the others, so all three finish in about the time of one.
  assert.ok(elapsed < 350, `expected overlapping work, but it took ${elapsed} ms`);
});
