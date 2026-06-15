const express = require('express');

const { createAccount, signIn, me } = require('../controllers/auth.controller');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/create', createAccount);
router.post('/signin', signIn);
router.get('/me', requireAuth, me);

module.exports = router;

