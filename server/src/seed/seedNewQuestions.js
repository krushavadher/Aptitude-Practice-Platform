import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';
import Topic from '../models/Topic.js';
import connectDB from '../config/db.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const newQuestions = [
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "easy",
"text": "What is 25% of 240?",
"options": ["40", "50", "60", "80"],
"correctIndex": 2,
"explanation": "25% of 240 = (25/100) × 240 = 60."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "easy",
"text": "Convert 3/5 into a percentage.",
"options": ["30%", "40%", "50%", "60%"],
"correctIndex": 3,
"explanation": "(3/5) × 100 = 60%."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "easy",
"text": "A student scores 72 marks out of 90. What is the percentage?",
"options": ["70%", "75%", "80%", "85%"],
"correctIndex": 2,
"explanation": "Percentage = (72/90) × 100 = 80%."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "easy",
"text": "A number increases from 200 to 250. What is the percentage increase?",
"options": ["20%", "25%", "30%", "50%"],
"correctIndex": 1,
"explanation": "Increase = 250 − 200 = 50. Percentage increase = (50/200) × 100 = 25%."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "easy",
"text": "A shirt costs ₹800 and is discounted by 10%. What is its selling price?",
"options": ["₹700", "₹720", "₹740", "₹780"],
"correctIndex": 1,
"explanation": "Discount = 10% of 800 = ₹80. Selling price = 800 − 80 = ₹720."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "medium",
"text": "A population of 20,000 increases by 10% every year. What will it be after 2 years?",
"options": ["24,000", "24,200", "24,400", "22,000"],
"correctIndex": 1,
"explanation": "Population = 20,000 × 1.1 × 1.1 = 20,000 × 1.21 = 24,200."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "medium",
"text": "The price of an item decreases by 20% and then increases by 20%. What is the net change?",
"options": ["No change", "4% increase", "4% decrease", "2% decrease"],
"correctIndex": 2,
"explanation": "Assume the original price is 100. After a 20% decrease it becomes 80. Increasing 80 by 20% gives 96. The net change is a 4% decrease."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "medium",
"text": "A number is increased by 30% and becomes 390. What was the original number?",
"options": ["270", "300", "320", "330"],
"correctIndex": 1,
"explanation": "Let the original number be x. Then 1.3x = 390, so x = 390/1.3 = 300."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "medium",
"text": "In an examination, 35% of 800 candidates failed. How many candidates passed?",
"options": ["280", "480", "520", "560"],
"correctIndex": 2,
"explanation": "Passed percentage = 100% − 35% = 65%. Number passed = 65% of 800 = 520."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "medium",
"text": "A person's salary increases from ₹30,000 to ₹36,000. What is the percentage increase?",
"options": ["15%", "18%", "20%", "25%"],
"correctIndex": 2,
"explanation": "Increase = ₹6,000. Percentage increase = (6,000/30,000) × 100 = 20%."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "medium",
"text": "If 40% of a number is 120, what is 75% of that number?",
"options": ["180", "200", "225", "250"],
"correctIndex": 2,
"explanation": "Let the number be x. Then 0.4x = 120, so x = 300. Therefore, 75% of 300 = 225."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "hard",
"text": "A number is first increased by 25% and then decreased by 20%. What is the net percentage change?",
"options": ["5% increase", "5% decrease", "No change", "10% increase"],
"correctIndex": 2,
"explanation": "Assume the original number is 100. After a 25% increase it becomes 125. Decreasing 125 by 20% gives 100. Hence, there is no net change."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "hard",
"text": "A candidate needs 40% marks to pass. They score 220 marks and fail by 20 marks. What are the maximum marks?",
"options": ["500", "550", "600", "650"],
"correctIndex": 2,
"explanation": "Passing marks = 220 + 20 = 240. If 40% of the maximum marks is 240, maximum marks = 240/0.4 = 600."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "hard",
"text": "A town's population decreases by 10% in the first year and by 10% in the second year. What is the total percentage decrease?",
"options": ["19%", "20%", "21%", "18%"],
"correctIndex": 0,
"explanation": "Assume the population is 100. After the first year it is 90, and after the second year it is 90 × 0.9 = 81. The total decrease is 19%."
},
{
"topicSlug": "quantitative",
"subtopic": "Percentages",
"difficulty": "hard",
"text": "A's income is 25% more than B's income. By what percentage is B's income less than A's income?",
"options": ["20%", "25%", "16.67%", "33.33%"],
"correctIndex": 0,
"explanation": "Assume B's income is 100. A's income is 125. The difference is 25. Relative to A, the difference is (25/125) × 100 = 20%."
}
];

const seedNewQuestions = async () => {
  await connectDB();
  console.log('Seeding new questions...');

  for (const qData of newQuestions) {
    // 1. Find Topic
    let topic = await Topic.findOne({ slug: qData.topicSlug });
    if (!topic) {
      console.log(`Topic not found for slug: ${qData.topicSlug}, creating...`);
      topic = new Topic({
        name: qData.topicSlug.charAt(0).toUpperCase() + qData.topicSlug.slice(1),
        slug: qData.topicSlug,
        category: 'quant',
        subtopics: [qData.subtopic]
      });
      await topic.save();
    } else {
      if (!topic.subtopics.includes(qData.subtopic)) {
        topic.subtopics.push(qData.subtopic);
        await topic.save();
      }
    }

    // 2. Validate
    if (qData.options.length !== 4 || 
        qData.correctIndex < 0 || qData.correctIndex > 3 ||
        !qData.explanation || 
        !['easy', 'medium', 'hard'].includes(qData.difficulty)) {
      console.error(`Validation failed for: ${qData.text}`);
      continue;
    }

    // 3. Prevent duplicate
    const existingQ = await Question.findOne({ text: qData.text });
    if (existingQ) {
      console.log(`Question already exists, skipping: ${qData.text}`);
      continue;
    }

    // 4. Replace dummy question if possible
    const dummyQ = await Question.findOne({ text: /^Sample question/ });
    if (dummyQ) {
      dummyQ.topicId = topic._id;
      dummyQ.subtopic = qData.subtopic;
      dummyQ.text = qData.text;
      dummyQ.options = qData.options;
      dummyQ.correctIndex = qData.correctIndex;
      dummyQ.explanation = qData.explanation;
      dummyQ.difficulty = qData.difficulty;
      dummyQ.source = 'manual';
      dummyQ.status = 'approved';
      await dummyQ.save();
      console.log(`Replaced dummy question with: ${qData.text}`);
    } else {
      // Create new
      const newQ = new Question({
        topicId: topic._id,
        subtopic: qData.subtopic,
        text: qData.text,
        options: qData.options,
        correctIndex: qData.correctIndex,
        explanation: qData.explanation,
        difficulty: qData.difficulty,
        source: 'manual',
        status: 'approved'
      });
      await newQ.save();
      console.log(`Inserted new question: ${qData.text}`);
    }
  }

  console.log('Seeding complete!');
  process.exit();
};

seedNewQuestions();
