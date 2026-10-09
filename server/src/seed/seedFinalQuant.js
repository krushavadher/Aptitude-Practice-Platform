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
    "subtopic": "Simple and Compound Interest",
    "difficulty": "easy",
    "text": "Find the simple interest on ₹5,000 at 8% per annum for 2 years.",
    "options": ["₹600", "₹700", "₹800", "₹900"],
    "correctIndex": 2,
    "explanation": "SI = (P × R × T) / 100 = (5000 × 8 × 2) / 100 = ₹800."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "easy",
    "text": "The simple interest on a sum at 10% per annum for 3 years is ₹1,200. Find the principal.",
    "options": ["₹3,000", "₹4,000", "₹5,000", "₹6,000"],
    "correctIndex": 1,
    "explanation": "P = (SI × 100) / (R × T) = (1200 × 100) / (10 × 3) = ₹4,000."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "easy",
    "text": "Find the total amount after 3 years if ₹8,000 is invested at 5% simple interest per annum.",
    "options": ["₹9,000", "₹9,100", "₹9,200", "₹9,500"],
    "correctIndex": 2,
    "explanation": "SI = (8000 × 5 × 3) / 100 = ₹1,200. Amount = ₹8,000 + ₹1,200 = ₹9,200."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "medium",
    "text": "The simple interest on ₹4,000 for 3 years is ₹600. Find the annual rate of interest.",
    "options": ["4%", "5%", "6%", "8%"],
    "correctIndex": 1,
    "explanation": "R = (SI × 100) / (P × T) = (600 × 100) / (4000 × 3) = 5% per annum."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "easy",
    "text": "Find the compound interest on ₹10,000 at 10% per annum for 2 years, compounded annually.",
    "options": ["₹2,000", "₹2,050", "₹2,100", "₹2,200"],
    "correctIndex": 2,
    "explanation": "Amount = 10000 × (1.10)^2 = ₹12,100. Compound interest = ₹12,100 − ₹10,000 = ₹2,100."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "medium",
    "text": "Find the compound interest on ₹5,000 at 10% per annum for 3 years, compounded annually.",
    "options": ["₹1,500", "₹1,550", "₹1,655", "₹1,750"],
    "correctIndex": 2,
    "explanation": "Amount = 5000 × (1.10)^3 = ₹6,655. Compound interest = ₹6,655 − ₹5,000 = ₹1,655."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "medium",
    "text": "What is the difference between compound interest and simple interest on ₹10,000 for 2 years at 10% per annum?",
    "options": ["₹50", "₹100", "₹150", "₹200"],
    "correctIndex": 1,
    "explanation": "SI = ₹2,000. CI = ₹2,100. Difference = ₹2,100 − ₹2,000 = ₹100."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "medium",
    "text": "Find the amount on ₹8,000 invested at 5% compound interest per annum for 2 years.",
    "options": ["₹8,400", "₹8,800", "₹8,820", "₹9,000"],
    "correctIndex": 2,
    "explanation": "Amount = 8000 × (1.05)^2 = ₹8,820."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "medium",
    "text": "A sum amounts to ₹12,100 after 2 years at 10% compound interest per annum. Find the principal.",
    "options": ["₹9,000", "₹10,000", "₹11,000", "₹12,000"],
    "correctIndex": 1,
    "explanation": "Principal = 12100 / (1.10)^2 = ₹10,000."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "medium",
    "text": "At what annual simple interest rate will a sum double in 8 years?",
    "options": ["10%", "12.5%", "15%", "16%"],
    "correctIndex": 1,
    "explanation": "For the sum to double, simple interest must equal the principal. P × R × 8 / 100 = P, so R = 100 / 8 = 12.5%."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "medium",
    "text": "Find the compound interest on ₹20,000 at 5% per annum for 2 years, compounded annually.",
    "options": ["₹2,000", "₹2,050", "₹2,100", "₹2,150"],
    "correctIndex": 1,
    "explanation": "Amount = 20000 × (1.05)^2 = ₹22,050. Compound interest = ₹22,050 − ₹20,000 = ₹2,050."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "easy",
    "text": "Find the simple interest on ₹7,500 at 4% per annum for 5 years.",
    "options": ["₹1,200", "₹1,400", "₹1,500", "₹1,600"],
    "correctIndex": 2,
    "explanation": "SI = (7500 × 4 × 5) / 100 = ₹1,500."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "medium",
    "text": "Find the compound interest on ₹10,000 at 20% per annum for 2 years, compounded annually.",
    "options": ["₹4,000", "₹4,200", "₹4,400", "₹4,800"],
    "correctIndex": 2,
    "explanation": "Amount = 10000 × (1.20)^2 = ₹14,400. Compound interest = ₹14,400 − ₹10,000 = ₹4,400."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "medium",
    "text": "A sum of ₹4,000 grows to ₹4,840 in 2 years at compound interest compounded annually. Find the annual interest rate.",
    "options": ["8%", "10%", "12%", "15%"],
    "correctIndex": 1,
    "explanation": "4840 / 4000 = 1.21 = (1 + R/100)^2. Taking the square root gives 1.1, so R = 10%."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Simple and Compound Interest",
    "difficulty": "easy",
    "text": "Find the simple interest on ₹5,000 at 9% per annum for 3 years.",
    "options": ["₹1,250", "₹1,350", "₹1,450", "₹1,500"],
    "correctIndex": 1,
    "explanation": "SI = (5000 × 9 × 3) / 100 = ₹1,350."
  },

  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "easy",
    "text": "A 20-litre mixture contains milk and water in the ratio 3:1. How much milk does it contain?",
    "options": ["5 litres", "10 litres", "15 litres", "16 litres"],
    "correctIndex": 2,
    "explanation": "Total ratio parts = 3 + 1 = 4. Milk = 20 × 3/4 = 15 litres."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "easy",
    "text": "A 40-litre mixture contains milk and water in the ratio 7:3. How much water does it contain?",
    "options": ["10 litres", "12 litres", "16 litres", "28 litres"],
    "correctIndex": 1,
    "explanation": "Total ratio parts = 7 + 3 = 10. Water = 40 × 3/10 = 12 litres."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "medium",
    "text": "Ten litres of a 20% acid solution are mixed with 20 litres of a 40% acid solution. What is the acid concentration of the resulting mixture?",
    "options": ["30%", "33.33%", "35%", "40%"],
    "correctIndex": 1,
    "explanation": "Acid = 10 × 0.20 + 20 × 0.40 = 10 litres. Total solution = 30 litres. Concentration = 10/30 × 100 ≈ 33.33%."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "medium",
    "text": "A 30-litre mixture contains milk and water in the ratio 4:1. How much water must be added to make the ratio 2:1?",
    "options": ["3 litres", "6 litres", "9 litres", "12 litres"],
    "correctIndex": 1,
    "explanation": "Milk = 24 litres and water = 6 litres. To make the ratio 2:1, water must be 12 litres. Add 12 − 6 = 6 litres."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "medium",
    "text": "A 25-litre solution contains 60% acid. How much water must be added to reduce the acid concentration to 50%?",
    "options": ["3 litres", "5 litres", "6 litres", "10 litres"],
    "correctIndex": 1,
    "explanation": "Acid quantity = 25 × 0.60 = 15 litres. For a 50% solution, total volume must be 15/0.50 = 30 litres. Water to add = 30 − 25 = 5 litres."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "hard",
    "text": "A 40-litre solution contains 25% salt. How much pure salt must be added to make the solution 40% salt?",
    "options": ["8 litres", "10 litres", "12 litres", "15 litres"],
    "correctIndex": 1,
    "explanation": "Initially, salt = 40 × 0.25 = 10 units. Let x be the pure salt added. (10 + x)/(40 + x) = 0.40, so 10 + x = 16 + 0.4x, giving x = 10."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "medium",
    "text": "Ten litres of a 30% alcohol solution are mixed with 20 litres of a 45% alcohol solution. What is the alcohol concentration of the mixture?",
    "options": ["35%", "38%", "40%", "42%"],
    "correctIndex": 2,
    "explanation": "Alcohol = 10 × 0.30 + 20 × 0.45 = 12 litres. Total solution = 30 litres. Concentration = 12/30 × 100 = 40%."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "medium",
    "text": "Twenty kilograms of rice costing ₹40 per kg are mixed with 30 kilograms costing ₹60 per kg. What is the average cost per kilogram?",
    "options": ["₹48", "₹50", "₹52", "₹55"],
    "correctIndex": 2,
    "explanation": "Total cost = 20 × 40 + 30 × 60 = ₹2,600. Total weight = 50 kg. Average cost = 2600/50 = ₹52 per kg."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "easy",
    "text": "A 35-litre mixture contains milk and water in the ratio 5:2. How much milk is present?",
    "options": ["20 litres", "25 litres", "28 litres", "30 litres"],
    "correctIndex": 1,
    "explanation": "Total ratio parts = 7. Milk = 35 × 5/7 = 25 litres."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "medium",
    "text": "Ten litres of a 50% acid solution are available. Two litres of the solution are removed and replaced with 2 litres of pure water. What is the new acid concentration?",
    "options": ["35%", "40%", "45%", "50%"],
    "correctIndex": 1,
    "explanation": "Initially, acid = 5 litres. Removing 2 litres of solution removes 1 litre of acid, leaving 4 litres. The final volume is 10 litres, so the concentration is 4/10 × 100 = 40%."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "easy",
    "text": "Equal quantities of two solutions containing 20% and 50% acid are mixed. What is the acid concentration of the resulting mixture?",
    "options": ["30%", "35%", "40%", "45%"],
    "correctIndex": 1,
    "explanation": "For equal quantities, the resulting concentration is (20 + 50)/2 = 35%."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "hard",
    "text": "A 40-litre mixture contains milk and water in the ratio 3:2. Ten litres of the mixture are removed and replaced with pure water. What percentage of the final mixture is milk?",
    "options": ["40%", "45%", "50%", "55%"],
    "correctIndex": 1,
    "explanation": "Initially, milk = 40 × 3/5 = 24 litres. Removing 10 litres removes 6 litres of milk, leaving 18 litres. Adding water leaves the milk quantity unchanged. Milk percentage = 18/40 × 100 = 45%."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "medium",
    "text": "Fifteen litres of a 40% acid solution are diluted with pure water until the concentration becomes 30%. How much water is added?",
    "options": ["3 litres", "5 litres", "7 litres", "10 litres"],
    "correctIndex": 1,
    "explanation": "Acid quantity = 15 × 0.40 = 6 litres. Total volume for a 30% solution = 6/0.30 = 20 litres. Water added = 20 − 15 = 5 litres."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "hard",
    "text": "A 50-litre mixture contains milk and water in the ratio 4:1. How much pure milk must be added to make the ratio 9:1?",
    "options": ["25 litres", "40 litres", "50 litres", "60 litres"],
    "correctIndex": 2,
    "explanation": "Initially, milk = 40 litres and water = 10 litres. Let x litres of milk be added. (40 + x)/10 = 9, so x = 50 litres."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Mixtures and Alligation",
    "difficulty": "hard",
    "text": "A 60-litre mixture contains milk and water in the ratio 2:1. How many litres of the mixture must be removed and replaced with the same amount of water so that milk and water are present in equal quantities?",
    "options": ["10 litres", "12 litres", "15 litres", "18 litres"],
    "correctIndex": 2,
    "explanation": "Initially, milk = 40 litres and water = 20 litres. Removing x litres removes 2x/3 litres of milk and x/3 litres of water. After adding x litres of water, the quantities are 40 − 2x/3 and 20 + 2x/3. Equating them gives x = 15 litres."
  },

  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "easy",
    "text": "A car travels at 60 km/h for 2.5 hours. How far does it travel?",
    "options": ["120 km", "135 km", "150 km", "180 km"],
    "correctIndex": 2,
    "explanation": "Distance = Speed × Time = 60 × 2.5 = 150 km."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "easy",
    "text": "Convert 72 km/h into metres per second.",
    "options": ["18 m/s", "20 m/s", "22 m/s", "25 m/s"],
    "correctIndex": 1,
    "explanation": "Multiply by 5/18: 72 × 5/18 = 20 m/s."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "medium",
    "text": "A train 120 metres long crosses a pole in 6 seconds. What is its speed?",
    "options": ["60 km/h", "66 km/h", "72 km/h", "80 km/h"],
    "correctIndex": 2,
    "explanation": "Speed = 120/6 = 20 m/s. In km/h, this is 20 × 18/5 = 72 km/h."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "medium",
    "text": "A train 150 metres long crosses a 250-metre platform in 20 seconds. What is the train's speed?",
    "options": ["54 km/h", "60 km/h", "72 km/h", "80 km/h"],
    "correctIndex": 2,
    "explanation": "Total distance = 150 + 250 = 400 metres. Speed = 400/20 = 20 m/s = 72 km/h."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "hard",
    "text": "Two trains of lengths 100 metres and 150 metres travel in opposite directions at 45 km/h and 63 km/h. How long do they take to cross each other?",
    "options": ["7 seconds", "8 seconds", "25/3 seconds", "10 seconds"],
    "correctIndex": 2,
    "explanation": "Combined speed = 45 + 63 = 108 km/h = 30 m/s. Combined length = 250 metres. Time = 250/30 = 25/3 seconds."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "medium",
    "text": "A 120-metre train travels at 54 km/h and crosses a person walking in the same direction at 6 km/h. How long does it take to cross the person?",
    "options": ["8 seconds", "9 seconds", "10 seconds", "12 seconds"],
    "correctIndex": 1,
    "explanation": "Relative speed = 54 − 6 = 48 km/h = 40/3 m/s. Time = 120 ÷ (40/3) = 9 seconds."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "medium",
    "text": "A train 180 metres long travelling at 54 km/h crosses a 120-metre train travelling in the opposite direction at 36 km/h. How long do they take to cross each other?",
    "options": ["10 seconds", "12 seconds", "14 seconds", "15 seconds"],
    "correctIndex": 1,
    "explanation": "Combined length = 180 + 120 = 300 metres. Combined speed = 54 + 36 = 90 km/h = 25 m/s. Time = 300/25 = 12 seconds."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "medium",
    "text": "A boat travels downstream at 18 km/h and upstream at 10 km/h. What is its speed in still water?",
    "options": ["12 km/h", "13 km/h", "14 km/h", "16 km/h"],
    "correctIndex": 2,
    "explanation": "Speed in still water = (18 + 10)/2 = 14 km/h."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "easy",
    "text": "A boat's speed in still water is 12 km/h, and the stream flows at 3 km/h. What is its downstream speed?",
    "options": ["9 km/h", "12 km/h", "15 km/h", "18 km/h"],
    "correctIndex": 2,
    "explanation": "Downstream speed = Speed in still water + Stream speed = 12 + 3 = 15 km/h."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "medium",
    "text": "A boat travels downstream at 24 km/h and upstream at 16 km/h. Find its speed in still water and the stream speed, respectively.",
    "options": ["18 km/h and 6 km/h", "20 km/h and 4 km/h", "22 km/h and 2 km/h", "16 km/h and 8 km/h"],
    "correctIndex": 1,
    "explanation": "Still-water speed = (24 + 16)/2 = 20 km/h. Stream speed = (24 − 16)/2 = 4 km/h."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "medium",
    "text": "A boat travels 30 km downstream at 15 km/h and returns upstream at 10 km/h. What is the total travel time?",
    "options": ["4 hours", "5 hours", "6 hours", "7 hours"],
    "correctIndex": 1,
    "explanation": "Downstream time = 30/15 = 2 hours. Upstream time = 30/10 = 3 hours. Total time = 5 hours."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "hard",
    "text": "A train 200 metres long travels at 72 km/h and crosses a bridge in 25 seconds. What is the length of the bridge?",
    "options": ["250 m", "300 m", "350 m", "400 m"],
    "correctIndex": 1,
    "explanation": "Speed = 72 × 5/18 = 20 m/s. Total distance in 25 seconds = 20 × 25 = 500 metres. Bridge length = 500 − 200 = 300 metres."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "medium",
    "text": "A train 150 metres long travels at 54 km/h and crosses a platform in 18 seconds. What is the platform's length?",
    "options": ["100 m", "120 m", "135 m", "150 m"],
    "correctIndex": 1,
    "explanation": "Speed = 54 × 5/18 = 15 m/s. Total distance = 15 × 18 = 270 metres. Platform length = 270 − 150 = 120 metres."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "medium",
    "text": "A boat travels 36 km downstream in 3 hours and the same distance upstream in 4.5 hours. What is its speed in still water?",
    "options": ["8 km/h", "9 km/h", "10 km/h", "12 km/h"],
    "correctIndex": 2,
    "explanation": "Downstream speed = 36/3 = 12 km/h. Upstream speed = 36/4.5 = 8 km/h. Still-water speed = (12 + 8)/2 = 10 km/h."
  },
  {
    "topicSlug": "quantitative",
    "subtopic": "Trains, Boats and Streams",
    "difficulty": "hard",
    "text": "A train 240 metres long crosses a pole in 12 seconds. How long is a platform that the same train crosses in 30 seconds at the same speed?",
    "options": ["300 m", "320 m", "360 m", "400 m"],
    "correctIndex": 2,
    "explanation": "Train speed = 240/12 = 20 m/s. Distance covered in 30 seconds = 20 × 30 = 600 metres. Platform length = 600 − 240 = 360 metres."
  }
];

const seedFinalQuant = async () => {
  await connectDB();
  console.log('Seeding remaining Quantitative questions...');

  let addedSubtopics = new Set();
  let questionsInserted = 0;
  let questionsSkipped = 0;

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
      addedSubtopics.add(qData.subtopic);
    } else {
      if (!topic.subtopics.includes(qData.subtopic)) {
        topic.subtopics.push(qData.subtopic);
        await topic.save();
        addedSubtopics.add(qData.subtopic);
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
      questionsSkipped++;
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
    questionsInserted++;
  }

  console.log(`Seeding complete! Inserted ${questionsInserted} questions, skipped ${questionsSkipped} duplicates.`);
  if (addedSubtopics.size > 0) {
    console.log(`Added subtopics: ${Array.from(addedSubtopics).join(', ')}`);
  }
  process.exit();
};

seedFinalQuant();
