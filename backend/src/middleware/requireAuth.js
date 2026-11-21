const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

// PROMISES vs CALLBACKS
// jsonwebtoken's verify has a callback form: jwt.verify(token, secret, (err, decoded) => { ... }).
// promisify() wraps that callback API in a Promise, so it can be used with await like the
// user lookup below. With callbacks, the lookup would have to be nested inside the verify
// callback and errors handled in two places (err in the callback, plus try/catch). With
// promises both steps read top to bottom and one try/catch handles every failure.
const verifyToken = promisify(jwt.verify);

module.exports = async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Step 1: verify the token. A bad or expired token makes the promise reject -> catch -> 401.
    const decoded = await verifyToken(token, process.env.JWT_SECRET);

    // Step 2: look up the user. This returns a promise too; `await` pauses only this request
    // (the event loop keeps serving other requests while MongoDB answers).
    const user = await User.findById(decoded.sub);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
