const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  teacherUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  childUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true, index: true },
  status: { type: String, enum: ['assigned', 'completed'], default: 'assigned', index: true },
  assignedAt: { type: Date, default: () => new Date(), index: true },
  dueAt: { type: Date, default: null },
  completedAt: { type: Date, default: null },
}, { timestamps: true });

AssignmentSchema.index({ childUserId: 1, activityId: 1, status: 1 });

module.exports = mongoose.model('Assignment', AssignmentSchema);

