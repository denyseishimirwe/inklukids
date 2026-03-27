const mongoose = require('mongoose');

const SupportRequestSchema = new mongoose.Schema({
  childUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  childName: { type: String, required: true, trim: true },
  category: { type: String, enum: ['learning', 'social', 'feelings', 'other'], default: 'other', index: true },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  status: { type: String, enum: ['new', 'seen'], default: 'new', index: true },
}, { timestamps: true });

SupportRequestSchema.index({ createdAt: -1, status: 1 });

module.exports = mongoose.model('SupportRequest', SupportRequestSchema);
