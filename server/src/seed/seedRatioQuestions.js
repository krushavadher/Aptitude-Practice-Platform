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
"subtopic": "Ratio and Proportion",
"difficulty": "easy",
"text": "Simplify the ratio 24:36.",
"options": ["2:3", "3:2", "4:5", "3:4"],
"correctIndex": 0,
"explanation": "Divide both terms by their HCF, 12. Therefore, 24:36 = 2:3."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "easy",
"text": "Divide ₹600 in the ratio 2:3.",
"options": ["₹200 and ₹400", "₹240 and ₹360", "₹250 and ₹350", "₹300 and ₹300"],
"correctIndex": 1,
"explanation": "Total parts = 2 + 3 = 5. One part = 600/5 = ₹120. The shares are 2 × 120 = ₹240 and 3 × 120 = ₹360."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "easy",
"text": "If a:b = 3:5 and a = 21, find b.",
"options": ["25", "30", "35", "40"],
"correctIndex": 2,
"explanation": "a/b = 3/5. Since 3 parts = 21, one part = 7. Therefore, b = 5 × 7 = 35."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "easy",
"text": "Find the fourth proportional to 4, 6, and 8.",
"options": ["10", "12", "14", "16"],
"correctIndex": 1,
"explanation": "Let the fourth proportional be x. Then 4:6 = 8:x. Thus, 4x = 48 and x = 12."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "easy",
"text": "Two numbers are in the ratio 4:7. If their sum is 55, find the smaller number.",
"options": ["15", "20", "25", "35"],
"correctIndex": 1,
"explanation": "Total parts = 4 + 7 = 11. One part = 55/11 = 5. The smaller number is 4 × 5 = 20."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "medium",
"text": "The ratio of boys to girls in a class is 5:4. If there are 45 students, how many are girls?",
"options": ["15", "20", "25", "30"],
"correctIndex": 1,
"explanation": "Total parts = 5 + 4 = 9. One part = 45/9 = 5. Number of girls = 4 × 5 = 20."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "medium",
"text": "If A:B = 2:3 and B:C = 4:5, find A:B:C.",
"options": ["2:3:5", "8:12:15", "8:6:15", "4:6:5"],
"correctIndex": 1,
"explanation": "Make the value of B equal in both ratios. Multiply 2:3 by 4 to get 8:12, and multiply 4:5 by 3 to get 12:15. Therefore, A:B:C = 8:12:15."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "medium",
"text": "The incomes of A and B are in the ratio 7:5. If A earns ₹8,000 more than B, find B's income.",
"options": ["₹16,000", "₹20,000", "₹24,000", "₹28,000"],
"correctIndex": 1,
"explanation": "The difference is 7 − 5 = 2 parts, equal to ₹8,000. One part = ₹4,000. B's income = 5 × ₹4,000 = ₹20,000."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "medium",
"text": "If 12 workers complete a job in 15 days, how many days will 20 workers take at the same rate?",
"options": ["6 days", "8 days", "9 days", "10 days"],
"correctIndex": 2,
"explanation": "Workers and days are inversely proportional. Total work = 12 × 15 = 180 worker-days. Required days = 180/20 = 9."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "medium",
"text": "The ratio of milk to water in a mixture is 5:2. If the mixture contains 35 litres, how much water is present?",
"options": ["5 litres", "10 litres", "15 litres", "25 litres"],
"correctIndex": 1,
"explanation": "Total parts = 5 + 2 = 7. One part = 35/7 = 5 litres. Water = 2 × 5 = 10 litres."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "medium",
"text": "If x:y = 4:7 and y:z = 14:9, find x:z.",
"options": ["4:9", "8:9", "8:7", "2:9"],
"correctIndex": 1,
"explanation": "Since y is 7 parts in the first ratio and 14 parts in the second, multiply 4:7 by 2 to get 8:14. Thus x:y:z = 8:14:9, so x:z = 8:9."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "hard",
"text": "The ratio of the ages of A and B is 4:5. After 6 years, their ages will be in the ratio 5:6. What is A's present age?",
"options": ["18 years", "20 years", "24 years", "30 years"],
"correctIndex": 2,
"explanation": "Let their present ages be 4x and 5x. Then (4x + 6)/(5x + 6) = 5/6. Cross-multiplying gives 24x + 36 = 25x + 30, so x = 6. A's present age = 4 × 6 = 24 years."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "hard",
"text": "Two numbers are in the ratio 3:4. If 8 is added to each number, the ratio becomes 5:6. Find the smaller original number.",
"options": ["9", "12", "15", "18"],
"correctIndex": 2,
"explanation": "Let the numbers be 3x and 4x. Then (3x + 8)/(4x + 8) = 5/6. Thus, 18x + 48 = 20x + 40, giving x = 4. The smaller number is 3 × 4 = 12."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "hard",
"text": "A sum of ₹1,260 is divided among A, B, and C in the ratio 2:3:4. If B gives ₹60 to A, what is the new ratio of their amounts?",
"options": ["17:18:28", "3:4:8", "5:4:8", "4:6:7"],
"correctIndex": 0,
"explanation": "Total parts = 9, so one part = ₹1,260/9 = ₹140. Initial amounts are A = ₹280, B = ₹420, C = ₹560. After the transfer, A = ₹340 and B = ₹360. The new ratio is 340:360:560 = 17:18:28."
},
{
"topicSlug": "quantitative",
"subtopic": "Ratio and Proportion",
"difficulty": "hard",
"text": "If a:b = 3:4 and b:c = 8:9, and a + b + c = 115, find c.",
"options": ["36", "40", "45", "50"],
"correctIndex": 2,
"explanation": "Make b equal: a:b = 6:8 and b:c = 8:9. Thus a:b:c = 6:8:9. Total parts = 23, so one part = 115/23 = 5. Therefore c = 9 × 5 = 45."
}
];

const seedRatioQuestions = async () => {
  await connectDB();
  console.log('Seeding Ratio & Proportion questions...');

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

seedRatioQuestions();
