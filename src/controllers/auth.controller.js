const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

function buildToken(user) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign(
    { sub: user._id.toString(), username: user.username },
    secret,
    { expiresIn }
  );
}

function sanitizeUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    username: user.username,
    phone: user.phone,
    email: user.email,
  };
}

async function createAccount(req, res, next) {
  try {
    const { fullName, username, password, confirmPassword, phone, email } = req.body || {};

    if (!fullName || !username || !password || !confirmPassword || !phone || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const emailLower = String(email).toLowerCase();

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    const existingEmail = await User.findOne({ email: emailLower });
    if (existingEmail) {
      return res.status(409).json({ message: 'E-mail already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      username,
      passwordHash,
      phone,
      email: emailLower,
    });

    const token = buildToken(user);

    return res.status(201).json({
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    return next(err);
  }
}

async function signIn(req, res, next) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const emailLower = String(email).toLowerCase();

    const user = await User.findOne({ email: emailLower });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = buildToken(user);
    return res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    return next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = req.user;
    return res.json({ user: sanitizeUser(user) });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createAccount,
  signIn,
  me,
};

