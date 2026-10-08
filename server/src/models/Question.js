import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  subtopic: { type: String },
  text: { type: String, required: true },
  options: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 4'],
    required: true
  },
  correctIndex: { type: Number, required: true, min: 0, max: 3 },
  explanation: { type: String },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  source: { type: String, enum: ['manual', 'ai'], required: true },
  status: { type: String, enum: ['draft', 'approved', 'rejected'], default: 'draft' },
  flagged: { type: Boolean, default: false },
  aiVerified: { type: Boolean, default: false },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: { type: Date }
}, { timestamps: { createdAt: 'createdAt', updatedAt: false } });

function arrayLimit(val) {
  return val.length === 4;
}

export default mongoose.model('Question', questionSchema);
