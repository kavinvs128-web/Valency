const express = require('express');

const { createAttempt, listAttempts, updateAttempt, deleteAttempt } = require('../controllers/attempts.controller');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/', requireAuth, createAttempt);
router.get('/', requireAuth, listAttempts);
router.put('/:id', requireAuth, updateAttempt);
router.delete('/:id', requireAuth, deleteAttempt);

module.exports = router;
