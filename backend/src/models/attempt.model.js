const mongoose = require('mongoose');

const breakdownItemSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    chosen: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    correct: { type: Boolean, required: true },
  },
  { _id: false }
);

const attemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    assessment: { type: String, required: true, trim: true },
    score: { type: String, required: true },
    scorePct: { type: Number, required: true, min: 0, max: 100 },
    breakdown: { type: [breakdownItemSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attempt', attemptSchema);
