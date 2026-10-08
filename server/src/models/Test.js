import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  questionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  durationSec: { type: Number, required: true },
  startedAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true },
  status: { type: String, enum: ['in_progress', 'submitted', 'expired'], default: 'in_progress' }
});

export default mongoose.model('Test', testSchema);
