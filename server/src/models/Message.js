const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  recipientUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  text: { type: String, required: true, trim: true, maxlength: 2000 },
  readAt: { type: Date, default: null },
}, { timestamps: true });

MessageSchema.index({ senderUserId: 1, recipientUserId: 1, createdAt: -1 });
MessageSchema.index({ recipientUserId: 1, readAt: 1, createdAt: -1 });

module.exports = mongoose.model('Message', MessageSchema);

