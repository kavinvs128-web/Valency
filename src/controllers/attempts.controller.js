const Attempt = require('../models/attempt.model');

function isValidBreakdown(breakdown) {
  if (!Array.isArray(breakdown)) return false;

  return breakdown.every(
    (item) =>
      item &&
      typeof item === 'object' &&
      typeof item.question === 'string' &&
      typeof item.chosen === 'string' &&
      typeof item.correctAnswer === 'string' &&
      typeof item.correct === 'boolean'
  );
}

async function createAttempt(req, res, next) {
  try {
    const { assessment, score, scorePct, breakdown } = req.body || {};

    if (
      typeof assessment !== 'string' ||
      typeof score !== 'string' ||
      typeof scorePct !== 'number' ||
      !isValidBreakdown(breakdown)
    ) {
      return res.status(400).json({ message: 'Invalid attempt payload.' });
    }

    const attempt = await Attempt.create({
      user: req.user._id,
      assessment,
      score,
      scorePct,
      breakdown,
    });

    return res.status(201).json({ attempt });
  } catch (err) {
    return next(err);
  }
}

async function listAttempts(req, res, next) {
  try {
    const attempts = await Attempt.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.json({ attempts });
  } catch (err) {
    return next(err);
  }
}

async function updateAttempt(req, res, next) {
  try {
    const { id } = req.params;
    const { assessment, score, scorePct, breakdown } = req.body || {};

    if (
      typeof assessment !== 'string' ||
      typeof score !== 'string' ||
      typeof scorePct !== 'number' ||
      !isValidBreakdown(breakdown)
    ) {
      return res.status(400).json({ message: 'Invalid attempt payload.' });
    }

    const attempt = await Attempt.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { assessment, score, scorePct, breakdown },
      { new: true, runValidators: true }
    );

    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found.' });
    }

    return res.json({ attempt });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid attempt id.' });
    }
    return next(err);
  }
}

async function deleteAttempt(req, res, next) {
  try {
    const { id } = req.params;

    const attempt = await Attempt.findOneAndDelete({ _id: id, user: req.user._id });

    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found.' });
    }

    return res.json({ message: 'Attempt deleted.' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid attempt id.' });
    }
    return next(err);
  }
}

module.exports = {
  createAttempt,
  listAttempts,
  updateAttempt,
  deleteAttempt,
};
