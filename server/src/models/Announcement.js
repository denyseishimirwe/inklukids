const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  createdByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  createdByRole: { type: String, enum: ['admin', 'teacher'], required: true },
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true, trim: true, maxlength: 3000 },
  audience: { type: String, enum: ['all', 'teachers', 'parents'], default: 'all', index: true },
}, { timestamps: true });

AnnouncementSchema.index({ createdAt: -1, audience: 1 });

module.exports = mongoose.model('Announcement', AnnouncementSchema);

