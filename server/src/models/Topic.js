import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: ['quant', 'logical', 'verbal'], required: true },
  subtopics: [{ type: String }]
});

export default mongoose.model('Topic', topicSchema);
