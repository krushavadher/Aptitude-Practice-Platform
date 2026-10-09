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
    "subtopic": "Average",
    "difficulty": "easy",
    "text": "Find the average of 10, 20, 30, 40, and 50.",
    "options": ["25", "30", "35", "40"],
    "correctIndex": 1,
    "explanation": "Average = Sum of values / Number of values = (10 + 20 + 30 + 40 + 50) / 5 = 150 / 5 = 30."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "easy",
    "text": "The average of 8 numbers is 15. What is their total sum?",
    "options": ["100", "110", "120", "130"],
    "correctIndex": 2,
    "explanation": "Sum = Average × Number of values = 15 × 8 = 120."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "medium",
    "text": "The average age of 4 students is 18 years. If a fifth student joins, the average becomes 20 years. What is the age of the fifth student?",
    "options": ["24 years", "26 years", "28 years", "30 years"],
    "correctIndex": 2,
    "explanation": "The original total age is 4 × 18 = 72 years. The new total is 5 × 20 = 100 years. The fifth student's age is 100 − 72 = 28 years."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "medium",
    "text": "The average of 6 numbers is 12. If one number, 17, is removed, what is the average of the remaining 5 numbers?",
    "options": ["10", "11", "12", "13"],
    "correctIndex": 1,
    "explanation": "The original sum is 6 × 12 = 72. After removing 17, the sum is 72 − 17 = 55. The new average is 55 / 5 = 11."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "medium",
    "text": "A student scores 70, 80, and 90 in three tests. What score must the student get in a fourth test to achieve an average of 85?",
    "options": ["90", "95", "100", "105"],
    "correctIndex": 2,
    "explanation": "The required total is 4 × 85 = 340. The current total is 70 + 80 + 90 = 240. The required fourth score is 340 − 240 = 100."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "easy",
    "text": "The average of 10 numbers is 24. If each number increases by 5, what is the new average?",
    "options": ["24", "27", "29", "30"],
    "correctIndex": 2,
    "explanation": "When the same amount is added to every number, the average increases by that amount. The new average is 24 + 5 = 29."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "medium",
    "text": "The average weight of 20 students is 50 kg. A teacher weighing 70 kg joins them. What is the new average weight, rounded to two decimal places?",
    "options": ["50.25 kg", "50.50 kg", "50.95 kg", "51.50 kg"],
    "correctIndex": 2,
    "explanation": "The students' total weight is 20 × 50 = 1000 kg. Including the teacher, the total is 1070 kg for 21 people. The new average is 1070 / 21 ≈ 50.95 kg."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "easy",
    "text": "The average of 5 consecutive integers is 24. What is the largest integer?",
    "options": ["24", "25", "26", "27"],
    "correctIndex": 2,
    "explanation": "For five consecutive integers, the middle integer equals the average. The numbers are 22, 23, 24, 25, and 26. The largest is 26."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "hard",
    "text": "The average of 7 numbers is 18. The average of the first 3 numbers is 14, and the average of the last 3 numbers is 20. What is the fourth number?",
    "options": ["18", "20", "22", "24"],
    "correctIndex": 3,
    "explanation": "The sum of all 7 numbers is 7 × 18 = 126. The first 3 sum to 3 × 14 = 42, and the last 3 sum to 3 × 20 = 60. The fourth number is 126 − 42 − 60 = 24."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "medium",
    "text": "The average of 9 numbers is 40. One number is replaced by 58, and the average becomes 42. What was the original number?",
    "options": ["38", "40", "42", "44"],
    "correctIndex": 1,
    "explanation": "The original sum is 9 × 40 = 360. The new sum is 9 × 42 = 378. The increase is 378 − 360 = 18. Therefore, the original number was 58 − 18 = 40."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "hard",
    "text": "The average of 11 numbers is 50. The average of the first 6 numbers is 49, and the average of the last 6 numbers is 52. What is the sixth number?",
    "options": ["50", "52", "54", "56"],
    "correctIndex": 3,
    "explanation": "The sum of all 11 numbers is 11 × 50 = 550. The first 6 sum to 6 × 49 = 294, and the last 6 sum to 6 × 52 = 312. The sixth number is counted in both groups, so it equals 294 + 312 − 550 = 56."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "hard",
    "text": "The average of 15 numbers is 32. The average of the first 8 numbers is 30, and the average of the last 8 numbers is 35. What is the eighth number?",
    "options": ["32", "36", "40", "44"],
    "correctIndex": 2,
    "explanation": "The total sum is 15 × 32 = 480. The first 8 numbers sum to 8 × 30 = 240, and the last 8 sum to 8 × 35 = 280. The eighth number is counted twice, so it equals 240 + 280 − 480 = 40."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "medium",
    "text": "The average monthly salary of 12 employees is ₹30,000. When their manager is included, the average salary of all 13 people becomes ₹32,000. What is the manager's monthly salary?",
    "options": ["₹48,000", "₹52,000", "₹56,000", "₹60,000"],
    "correctIndex": 2,
    "explanation": "The employees' total salary is 12 × ₹30,000 = ₹3,60,000. The total for all 13 people is 13 × ₹32,000 = ₹4,16,000. The manager's salary is ₹4,16,000 − ₹3,60,000 = ₹56,000."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "medium",
    "text": "The average of 20 observations was calculated as 35. Later, it was discovered that 48 had been recorded as 84. What is the correct average?",
    "options": ["32.8", "33.2", "33.5", "34.2"],
    "correctIndex": 1,
    "explanation": "The incorrect total is 20 × 35 = 700. Correcting the recording reduces the total by 84 − 48 = 36, giving 664. The correct average is 664 / 20 = 33.2."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Average",
    "difficulty": "hard",
    "text": "The average of 25 numbers is 48. The average of the first 13 numbers is 46, and the average of the last 13 numbers is 50. What is the thirteenth number?",
    "options": ["44", "48", "50", "52"],
    "correctIndex": 1,
    "explanation": "The total sum is 25 × 48 = 1200. The first 13 numbers sum to 13 × 46 = 598, and the last 13 sum to 13 × 50 = 650. The thirteenth number is counted twice, so it equals 598 + 650 − 1200 = 48."
  }
];

const seedAverageQuestions = async () => {
  await connectDB();
  console.log('Seeding Average questions...');

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
        console.log(`Added subtopic: ${qData.subtopic}`);
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

    // 4. Create new question
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

  console.log('Seeding complete!');
  process.exit();
};

seedAverageQuestions();
