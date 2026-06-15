const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, minlength: 2 },
    username: { type: String, required: true, trim: true, minlength: 3, unique: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

