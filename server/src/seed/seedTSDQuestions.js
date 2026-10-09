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
    "subtopic": "Time, Speed and Distance",
    "difficulty": "easy",
    "text": "A car travels 150 km in 3 hours. What is its average speed?",
    "options": ["40 km/h", "45 km/h", "50 km/h", "60 km/h"],
    "correctIndex": 2,
    "explanation": "Speed = Distance / Time = 150 / 3 = 50 km/h."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "easy",
    "text": "A train travels at 60 km/h for 4 hours. How far does it travel?",
    "options": ["180 km", "200 km", "240 km", "260 km"],
    "correctIndex": 2,
    "explanation": "Distance = Speed × Time = 60 × 4 = 240 km."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "easy",
    "text": "How long will a car take to travel 180 km at a constant speed of 45 km/h?",
    "options": ["3 hours", "4 hours", "5 hours", "6 hours"],
    "correctIndex": 1,
    "explanation": "Time = Distance / Speed = 180 / 45 = 4 hours."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "medium",
    "text": "Convert 72 km/h into metres per second.",
    "options": ["18 m/s", "20 m/s", "22 m/s", "25 m/s"],
    "correctIndex": 1,
    "explanation": "To convert km/h to m/s, multiply by 5/18. Therefore, 72 × 5/18 = 20 m/s."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "medium",
    "text": "A person travels at 5 m/s. How far will the person travel in 4 minutes?",
    "options": ["600 m", "900 m", "1200 m", "1500 m"],
    "correctIndex": 2,
    "explanation": "Four minutes = 240 seconds. Distance = 5 × 240 = 1200 metres."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "medium",
    "text": "A car covers the first 120 km at 40 km/h and the next 120 km at 60 km/h. What is its average speed for the entire journey?",
    "options": ["45 km/h", "48 km/h", "50 km/h", "52 km/h"],
    "correctIndex": 1,
    "explanation": "Total distance = 240 km. Total time = 120/40 + 120/60 = 3 + 2 = 5 hours. Average speed = 240/5 = 48 km/h."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "medium",
    "text": "A train 150 metres long crosses a pole in 10 seconds. What is its speed in km/h?",
    "options": ["45 km/h", "50 km/h", "54 km/h", "60 km/h"],
    "correctIndex": 2,
    "explanation": "Speed = 150/10 = 15 m/s. Converting to km/h gives 15 × 18/5 = 54 km/h."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "medium",
    "text": "A train 120 metres long crosses a 180-metre platform in 15 seconds. What is its speed?",
    "options": ["60 km/h", "66 km/h", "72 km/h", "80 km/h"],
    "correctIndex": 2,
    "explanation": "Total distance = 120 + 180 = 300 metres. Speed = 300/15 = 20 m/s = 72 km/h."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "medium",
    "text": "Two people start from the same point and travel in opposite directions at 40 km/h and 50 km/h. How far apart will they be after 3 hours?",
    "options": ["240 km", "260 km", "270 km", "300 km"],
    "correctIndex": 2,
    "explanation": "Relative speed = 40 + 50 = 90 km/h. Separation after 3 hours = 90 × 3 = 270 km."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "medium",
    "text": "Two cyclists travel in the same direction at 25 km/h and 15 km/h. They start 30 km apart, with the faster cyclist behind the slower cyclist. How long will the faster cyclist take to catch up?",
    "options": ["2 hours", "2.5 hours", "3 hours", "3.5 hours"],
    "correctIndex": 2,
    "explanation": "Relative speed = 25 − 15 = 10 km/h. Time = 30/10 = 3 hours."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "hard",
    "text": "A person travels from a city to a town at 40 km/h and returns along the same route at 60 km/h. What is the average speed for the round trip?",
    "options": ["45 km/h", "48 km/h", "50 km/h", "52 km/h"],
    "correctIndex": 1,
    "explanation": "For equal distances, average speed = 2ab/(a+b) = (2 × 40 × 60)/(40 + 60) = 48 km/h."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "hard",
    "text": "A train travelling at 54 km/h crosses a man walking in the same direction at 6 km/h in 12 seconds. What is the length of the train?",
    "options": ["120 m", "150 m", "160 m", "180 m"],
    "correctIndex": 2,
    "explanation": "Relative speed = 54 − 6 = 48 km/h = 48 × 5/18 = 40/3 m/s. Train length = (40/3) × 12 = 160 metres."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "hard",
    "text": "A car covers a journey in 6 hours at 50 km/h. How fast must it travel to cover the same distance in 5 hours?",
    "options": ["55 km/h", "60 km/h", "65 km/h", "70 km/h"],
    "correctIndex": 1,
    "explanation": "Distance = 50 × 6 = 300 km. Required speed = 300/5 = 60 km/h."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "medium",
    "text": "A person walks at 4 km/h and reaches a destination 15 minutes late. If the person walks at 5 km/h, they arrive 15 minutes early. What is the distance to the destination?",
    "options": ["8 km", "10 km", "12 km", "15 km"],
    "correctIndex": 1,
    "explanation": "The difference between the travel times is 30 minutes = 0.5 hours. Let the distance be d. Then d/4 − d/5 = 0.5, so d/20 = 0.5 and d = 10 km."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Time, Speed and Distance",
    "difficulty": "hard",
    "text": "Two trains of equal length travel in opposite directions at 72 km/h and 54 km/h. They cross each other in 8 seconds. What is the length of each train?",
    "options": ["120 m", "140 m", "160 m", "180 m"],
    "correctIndex": 1,
    "explanation": "Combined speed = 72 + 54 = 126 km/h = 35 m/s. In 8 seconds, the combined length is 35 × 8 = 280 metres. Each train is 280/2 = 140 metres long."
  }
];

const seedTSDQuestions = async () => {
  await connectDB();
  console.log('Seeding Time, Speed and Distance questions...');

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

seedTSDQuestions();
