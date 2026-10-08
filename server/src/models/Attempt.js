import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedIndex: { type: Number },
  isCorrect: { type: Boolean },
  timeSpentSec: { type: Number }
}, { _id: false });

const attemptSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  answers: [answerSchema],
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  accuracy: { type: Number },
  timeTakenSec: { type: Number, required: true },
  submittedAt: { type: Date, required: true, default: Date.now }
});

export default mongoose.model('Attempt', attemptSchema);
