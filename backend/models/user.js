const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['teacher', 'parent', 'child', 'admin'],
    required: true
  },
  status: {
    type: String,
    default: 'Active'
  },
  // Only for parents — stores their children's info
  children: [
    {
      name: String,
      age: Number,
      school: String,
      diagnosis: String,
      notes: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);