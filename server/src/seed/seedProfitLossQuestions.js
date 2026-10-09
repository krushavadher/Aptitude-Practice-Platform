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
"subtopic": "Profit, Loss and Discount",
"difficulty": "easy",
"text": "An article is purchased for ₹500 and sold for ₹600. What is the profit percentage?",
"options": ["10%", "15%", "20%", "25%"],
"correctIndex": 2,
"explanation": "Profit = 600 - 500 = ₹100. Profit percentage = (100/500) × 100 = 20%."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "easy",
"text": "An item is bought for ₹800 and sold for ₹680. Find the loss percentage.",
"options": ["10%", "12%", "15%", "20%"],
"correctIndex": 2,
"explanation": "Loss = 800 - 680 = ₹120. Loss percentage = (120/800) × 100 = 15%."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "easy",
"text": "The marked price of a shirt is ₹1,000. If a discount of 20% is offered, what is its selling price?",
"options": ["₹700", "₹750", "₹800", "₹850"],
"correctIndex": 2,
"explanation": "Discount = 20% of 1,000 = ₹200. Selling price = 1,000 - 200 = ₹800."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "easy",
"text": "A shopkeeper buys a book for ₹240 and sells it at a profit of 25%. Find the selling price.",
"options": ["₹280", "₹290", "₹300", "₹320"],
"correctIndex": 2,
"explanation": "Profit = 25% of 240 = ₹60. Selling price = 240 + 60 = ₹300."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "easy",
"text": "An item is sold for ₹450 at a loss of 10%. What was its cost price?",
"options": ["₹480", "₹490", "₹500", "₹550"],
"correctIndex": 2,
"explanation": "A 10% loss means the selling price is 90% of the cost price. Cost price = 450/0.9 = ₹500."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "medium",
"text": "A shopkeeper marks an item 40% above its cost price and offers a 10% discount on the marked price. What is the profit percentage?",
"options": ["20%", "24%", "26%", "30%"],
"correctIndex": 2,
"explanation": "Assume cost price = ₹100. Marked price = ₹140. Selling price after a 10% discount = 140 × 0.9 = ₹126. Profit = 26%."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "medium",
"text": "An article is sold for ₹960 at a profit of 20%. Find its cost price.",
"options": ["₹760", "₹800", "₹820", "₹840"],
"correctIndex": 1,
"explanation": "Selling price = 120% of cost price. Cost price = 960/1.2 = ₹800."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "medium",
"text": "A product marked at ₹2,000 is sold after successive discounts of 10% and 20%. What is the final selling price?",
"options": ["₹1,400", "₹1,440", "₹1,500", "₹1,600"],
"correctIndex": 1,
"explanation": "After the first discount: 2,000 × 0.9 = ₹1,800. After the second discount: 1,800 × 0.8 = ₹1,440."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "medium",
"text": "A trader sells an item for ₹720 and makes a profit of 20%. If the cost price increases by 25% but the selling price remains the same, what is the new result?",
"options": ["10% profit", "10% loss", "4% loss", "No profit, no loss"],
"correctIndex": 2,
"explanation": "Original cost price = 720/1.2 = ₹600. New cost price = 600 × 1.25 = ₹750. Loss = 750 - 720 = ₹30. Loss percentage = (30/750) × 100 = 4%."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "medium",
"text": "A shopkeeper sells two items for ₹1,200 each. On one he gains 20%, and on the other he loses 20%. What is the overall result?",
"options": ["No profit, no loss", "4% profit", "4% loss", "2% loss"],
"correctIndex": 2,
"explanation": "First cost price = 1,200/1.2 = ₹1,000. Second cost price = 1,200/0.8 = ₹1,500. Total cost = ₹2,500 and total selling price = ₹2,400. Loss = ₹100, or 4%."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "hard",
"text": "A dishonest shopkeeper uses a 900 g weight instead of 1 kg but charges the price of 1 kg. What is his gain percentage, assuming the goods are sold at cost price per kilogram?",
"options": ["10%", "11.11%", "12.5%", "9%"],
"correctIndex": 1,
"explanation": "Assume 1 kg costs ₹100. The shopkeeper charges ₹100 for 900 g, which costs him ₹90. Gain = ₹10. Gain percentage = (10/90) × 100 = 11.11% approximately."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "hard",
"text": "An item is sold at a 15% loss. If it had been sold for ₹120 more, there would have been a 5% profit. Find the cost price.",
"options": ["₹500", "₹550", "₹600", "₹650"],
"correctIndex": 2,
"explanation": "The change from a 15% loss to a 5% profit is 20% of the cost price. Therefore, 20% of cost price = ₹120, so cost price = 120/0.2 = ₹600."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "hard",
"text": "A shopkeeper offers a 20% discount on the marked price and still earns a 25% profit. If the cost price is ₹800, find the marked price.",
"options": ["₹1,000", "₹1,100", "₹1,200", "₹1,250"],
"correctIndex": 3,
"explanation": "Selling price = 800 × 1.25 = ₹1,000. This is 80% of the marked price. Marked price = 1,000/0.8 = ₹1,250."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "hard",
"text": "A trader buys 100 identical items for ₹8,000. He sells 60 items at a 25% profit and the remaining 40 items at a 10% loss. What is his overall profit percentage?",
"options": ["9%", "10%", "11%", "12%"],
"correctIndex": 2,
"explanation": "Cost per item = ₹80. Selling price of 60 items = 60 × 80 × 1.25 = ₹6,000. Selling price of 40 items = 40 × 80 × 0.9 = ₹2,880. Total selling price = ₹8,880. Profit = ₹880, so profit percentage = (880/8,000) × 100 = 11%."
},
{
"topicSlug": "quantitative",
"subtopic": "Profit, Loss and Discount",
"difficulty": "hard",
"text": "A seller marks an article 50% above cost price and gives two successive discounts of 10% and 10%. What is his profit percentage?",
"options": ["20%", "21.5%", "22%", "25%"],
"correctIndex": 1,
"explanation": "Assume cost price = ₹100. Marked price = ₹150. After two successive 10% discounts, selling price = 150 × 0.9 × 0.9 = ₹121.50. Profit = 21.5%."
}
];

const seedProfitLossQuestions = async () => {
  await connectDB();
  console.log('Seeding Profit, Loss and Discount questions...');

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

seedProfitLossQuestions();
