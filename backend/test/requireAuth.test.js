// Unit tests for the requireAuth middleware. Run with: npm test
// The User model is replaced by a small fake, so no database is needed.

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = 'test-secret';

// Replace the User model with a fake before requireAuth loads it.
const userModelPath = require.resolve(path.join(__dirname, '../src/models/user.model.js'));
const lookups = [];
let userInDb = { _id: 'user-1', email: 'student@example.com' };
require.cache[userModelPath] = {
  id: userModelPath,
  filename: userModelPath,
  loaded: true,
  exports: {
    findById: async (id) => {
      lookups.push(id);
      return userInDb;
    },
  },
};

const requireAuth = require('../src/middleware/requireAuth');

// Runs the middleware with a fake request and collects what it did.
async function run(authHeader) {
  const req = { headers: authHeader === undefined ? {} : { authorization: authHeader } };
  const out = { status: null, body: null, nextCalls: 0, req };
  const res = {
    status(code) { out.status = code; return res; },
    json(body) { out.body = body; return res; },
  };
  await requireAuth(req, res, () => { out.nextCalls += 1; });
  return out;
}

const sign = (payload, options, secret = 'test-secret') => jwt.sign(payload, secret, options);

test.beforeEach(() => {
  lookups.length = 0;
  userInDb = { _id: 'user-1', email: 'student@example.com' };
});

test('no Authorization header -> 401 and next is not called', async () => {
  const out = await run(undefined);
  assert.equal(out.status, 401);
  assert.deepEqual(out.body, { message: 'Unauthorized' });
  assert.equal(out.nextCalls, 0);
});

test('wrong scheme (Basic) -> 401', async () => {
  const out = await run('Basic abc123');
  assert.equal(out.status, 401);
  assert.equal(out.nextCalls, 0);
});

test('Bearer with no token -> 401', async () => {
  const out = await run('Bearer');
  assert.equal(out.status, 401);
});

test('malformed token -> 401 (verify promise rejects)', async () => {
  const out = await run('Bearer not-a-real-token');
  assert.equal(out.status, 401);
  assert.equal(out.nextCalls, 0);
  assert.equal(lookups.length, 0, 'user lookup must not run for a bad token');
});

test('token signed with the wrong secret -> 401', async () => {
  const out = await run('Bearer ' + sign({ sub: 'user-1' }, {}, 'some-other-secret'));
  assert.equal(out.status, 401);
  assert.equal(lookups.length, 0);
});

test('expired token -> 401', async () => {
  const out = await run('Bearer ' + sign({ sub: 'user-1' }, { expiresIn: -10 }));
  assert.equal(out.status, 401);
  assert.equal(lookups.length, 0);
});

test('valid token but user no longer exists -> 401', async () => {
  userInDb = null;
  const out = await run('Bearer ' + sign({ sub: 'deleted-user' }));
  assert.equal(out.status, 401);
  assert.deepEqual(lookups, ['deleted-user']);
  assert.equal(out.nextCalls, 0);
});

test('valid token and existing user -> next() called once and req.user is set', async () => {
  const out = await run('Bearer ' + sign({ sub: 'user-1' }, { expiresIn: '1h' }));
  assert.equal(out.status, null, 'no error response');
  assert.equal(out.nextCalls, 1);
  assert.deepEqual(out.req.user, { _id: 'user-1', email: 'student@example.com' });
  assert.deepEqual(lookups, ['user-1'], 'user is looked up by the token sub claim');
});
