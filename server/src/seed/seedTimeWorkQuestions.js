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
    "subtopic": "Time and Work",
    "difficulty": "easy",
    "text": "A can complete a job in 10 days. What fraction of the job can A complete in one day?",
    "options": ["1/5", "1/10", "1/15", "1/20"],
    "correctIndex": 1,
    "explanation": "A's one-day work is 1/10 of the job because the entire job takes 10 days."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "easy",
    "text": "A can complete a job in 12 days. How many days will A take to complete half the job at the same rate?",
    "options": ["4 days", "5 days", "6 days", "8 days"],
    "correctIndex": 2,
    "explanation": "Half the job takes half of 12 days, which is 6 days."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "medium",
    "text": "A can complete a job in 12 days, and B can complete it in 6 days. How many days will they take to complete the job working together?",
    "options": ["3 days", "4 days", "5 days", "6 days"],
    "correctIndex": 1,
    "explanation": "A's daily work is 1/12 and B's is 1/6. Together they complete 1/12 + 1/6 = 1/4 of the job per day, so they need 4 days."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "medium",
    "text": "A can complete a job in 15 days, and B can complete it in 10 days. How long will they take working together?",
    "options": ["5 days", "6 days", "7 days", "8 days"],
    "correctIndex": 1,
    "explanation": "Their combined daily work is 1/15 + 1/10 = 1/6 of the job. Therefore, they need 6 days."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "medium",
    "text": "A and B together can complete a job in 8 days. A alone can complete it in 12 days. How many days would B alone take?",
    "options": ["18 days", "20 days", "24 days", "30 days"],
    "correctIndex": 2,
    "explanation": "B's daily work is 1/8 − 1/12 = 1/24. Therefore, B alone takes 24 days."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "easy",
    "text": "Six workers can complete a job in 10 days. How many days will 12 workers take to complete the same job if all workers work at the same rate?",
    "options": ["4 days", "5 days", "6 days", "8 days"],
    "correctIndex": 1,
    "explanation": "Total work is 6 × 10 = 60 worker-days. With 12 workers, the required time is 60/12 = 5 days."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "medium",
    "text": "Eight workers can complete a job in 15 days. How many workers are needed to complete the same job in 10 days if all workers work at the same rate?",
    "options": ["10", "12", "14", "16"],
    "correctIndex": 1,
    "explanation": "Total work is 8 × 15 = 120 worker-days. The number of workers required is 120/10 = 12."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "medium",
    "text": "A can complete a job in 20 days. B is twice as efficient as A. How many days will B take to complete the job alone?",
    "options": ["5 days", "10 days", "15 days", "40 days"],
    "correctIndex": 1,
    "explanation": "B works twice as fast as A, so B needs half the time: 20/2 = 10 days."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "medium",
    "text": "A can complete a job in 8 days, and B can complete it in 24 days. They work together for 3 days. What fraction of the job remains?",
    "options": ["1/8", "1/4", "1/2", "5/8"],
    "correctIndex": 2,
    "explanation": "Their combined daily work is 1/8 + 1/24 = 1/6. In 3 days, they complete 3 × 1/6 = 1/2 of the job. Therefore, 1/2 remains."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "hard",
    "text": "A and B together can complete a job in 6 days. A alone can complete it in 10 days. How many days will B alone take?",
    "options": ["12 days", "15 days", "18 days", "20 days"],
    "correctIndex": 1,
    "explanation": "B's daily work is 1/6 − 1/10 = 2/30 = 1/15. Therefore, B alone takes 15 days."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "hard",
    "text": "A can complete a job in 12 days, and B can complete it in 18 days. They work together for 4 days. What fraction of the job remains?",
    "options": ["1/9", "2/9", "4/9", "5/9"],
    "correctIndex": 2,
    "explanation": "Their combined daily work is 1/12 + 1/18 = 5/36. In 4 days, they complete 20/36 = 5/9 of the job. The remaining fraction is 1 − 5/9 = 4/9."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "medium",
    "text": "A can complete a job in 16 days, and B can complete it in 48 days. How long will they take working together?",
    "options": ["8 days", "10 days", "12 days", "14 days"],
    "correctIndex": 2,
    "explanation": "Their combined daily work is 1/16 + 1/48 = 4/48 = 1/12. Therefore, they need 12 days."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "hard",
    "text": "A and B together can complete a job in 8 days, while B and C together can complete it in 12 days. A, B, and C together can complete it in 6 days. How many days would A and C together take?",
    "options": ["6 days", "8 days", "9 days", "10 days"],
    "correctIndex": 1,
    "explanation": "A+B work at 1/8 per day, B+C at 1/12 per day, and A+B+C at 1/6 per day. Adding the first two rates gives A+2B+C = 5/24. Subtracting the combined rate 1/6 = 4/24 gives B's rate as 1/24. Thus A+C work at 1/6 − 1/24 = 1/8 per day, requiring 8 days."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "medium",
    "text": "Fifteen workers can complete a job in 24 days. After working for 8 days, how many additional workers are needed to finish the remaining work in the next 10 days?",
    "options": ["9", "12", "18", "21"],
    "correctIndex": 0,
    "explanation": "Total work is 15 × 24 = 360 worker-days. Work completed in 8 days is 15 × 8 = 120 worker-days, leaving 240. To finish in 10 days, 240/10 = 24 workers are needed. Since 15 workers are already available, 24 − 15 = 9 additional workers are required."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time and Work",
    "difficulty": "hard",
    "text": "A can complete a job in 10 days, and B can complete it in 15 days. They work together for 2 days, after which A leaves. How many additional days will B need to finish the remaining work?",
    "options": ["8 days", "9 days", "10 days", "11 days"],
    "correctIndex": 2,
    "explanation": "Their combined daily work is 1/10 + 1/15 = 1/6. In 2 days, they complete 1/3 of the job, leaving 2/3. B works at 1/15 per day, so B needs (2/3) ÷ (1/15) = 10 additional days."
  }
];

const seedTimeWorkQuestions = async () => {
  await connectDB();
  console.log('Seeding Time and Work questions...');

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

seedTimeWorkQuestions();
