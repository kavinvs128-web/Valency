const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, minlength: 2 },
    username: { type: String, trim: true, minlength: 3, unique: true, sparse: true },
    passwordHash: { type: String },
    phone: { type: String },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    googleId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

