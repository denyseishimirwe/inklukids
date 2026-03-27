const mongoose = require('mongoose');

const TrainingAssignmentSchema = new mongoose.Schema({
  assigneeUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  assignedByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  assigneeRole: { type: String, enum: ['teacher', 'parent'], required: true, index: true },
  moduleTitle: { type: String, required: true, trim: true },
  moduleDescription: { type: String, default: '', trim: true },
  moduleLink: { type: String, default: '', trim: true },
  status: { type: String, enum: ['assigned', 'completed'], default: 'assigned', index: true },
  dueAt: { type: Date, default: null },
  completedAt: { type: Date, default: null },
}, { timestamps: true });

TrainingAssignmentSchema.index({ assigneeUserId: 1, moduleTitle: 1, status: 1 });

module.exports = mongoose.model('TrainingAssignment', TrainingAssignmentSchema);

