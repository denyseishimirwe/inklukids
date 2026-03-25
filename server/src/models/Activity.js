const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  icon: { type: String, required: true, trim: true },
  color: { type: String, required: true, trim: true },
  steps: { type: [String], default: [] },
  active: { type: Boolean, default: true },
  createdByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);

