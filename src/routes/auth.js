const express = require('express');
const passport = require('passport');
const { buildToken, sanitizeUser } = require('../controllers/auth.controller');
const router = express.Router();

// Step 1: Redirect user to Google
router.get(
  '/oauth/google',
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] })
);

// Step 2: Google redirects here after login
router.get(
  '/oauth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:5173/signin' }),
  (req, res) => {
    const user = req.user;
    const token = buildToken(user);
    const sanitized = sanitizeUser(user);

    const params = new URLSearchParams({
      token,
      name: sanitized.fullName,
      email: sanitized.email,
    });

    // Redirect back to frontend with token
    res.redirect(`http://localhost:5173/oauth-success?${params.toString()}`);
  }
);

module.exports = router;
