const express = require('express');
const rateLimit = require('express-rate-limit');

const { explainLesson } = require('../controllers/ai.controller');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Each call costs money and takes seconds, so this route has its own, much stricter limit than the
// global one in app.js: 10 requests per 15 minutes per signed-in user.
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => String(req.user._id),
  message: { message: 'Too many AI requests. Please try again in a few minutes.' },
});

router.post('/explain', requireAuth, aiLimiter, explainLesson);

module.exports = router;
