import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';
import Topic from '../models/Topic.js';
import connectDB from '../config/db.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const newQuestions = [
  {
    "id": "prob-001",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "easy",
    "text": "A fair coin is tossed once. What is the probability of getting heads?",
    "options": ["1/4", "1/2", "1/3", "1"],
    "correctIndex": 1,
    "explanation": "There are 2 equally likely outcomes, and 1 is heads. Probability = 1/2."
  },
  {
    "id": "prob-002",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "easy",
    "text": "A fair six-sided die is rolled. What is the probability of getting an even number?",
    "options": ["1/3", "1/2", "2/3", "1/6"],
    "correctIndex": 1,
    "explanation": "The even outcomes are 2, 4, and 6. Probability = 3/6 = 1/2."
  },
  {
    "id": "prob-003",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "easy",
    "text": "Two fair coins are tossed. What is the probability of getting exactly one head?",
    "options": ["1/4", "3/4", "1/2", "1"],
    "correctIndex": 2,
    "explanation": "The outcomes are HH, HT, TH, and TT. HT and TH have exactly one head, so the probability is 2/4 = 1/2."
  },
  {
    "id": "prob-004",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "easy",
    "text": "A bag contains 3 red balls and 2 blue balls. One ball is selected randomly. What is the probability of selecting a blue ball?",
    "options": ["2/5", "3/5", "1/2", "1/5"],
    "correctIndex": 0,
    "explanation": "There are 2 blue balls out of 5 total balls. Probability = 2/5."
  },
  {
    "id": "prob-005",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "easy",
    "text": "One card is drawn from a standard 52-card deck. What is the probability of drawing an ace?",
    "options": ["1/4", "1/26", "1/13", "4/13"],
    "correctIndex": 2,
    "explanation": "A standard deck has 4 aces among 52 cards. Probability = 4/52 = 1/13."
  },
  {
    "id": "prob-006",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "medium",
    "text": "A fair six-sided die is rolled once. What is the probability of getting a number greater than 4?",
    "options": ["1/2", "1/6", "2/3", "1/3"],
    "correctIndex": 3,
    "explanation": "The favorable outcomes are 5 and 6. Probability = 2/6 = 1/3."
  },
  {
    "id": "prob-007",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "medium",
    "text": "Two fair six-sided dice are rolled. What is the probability that their sum is 7?",
    "options": ["1/12", "1/6", "1/9", "1/3"],
    "correctIndex": 1,
    "explanation": "There are 36 equally likely ordered outcomes. Six give a sum of 7, so the probability is 6/36 = 1/6."
  },
  {
    "id": "prob-008",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "medium",
    "text": "Two fair coins are tossed. What is the probability of getting at least one head?",
    "options": ["1/4", "1/2", "3/4", "1"],
    "correctIndex": 2,
    "explanation": "The outcomes are HH, HT, TH, and TT. Three contain at least one head, so the probability is 3/4."
  },
  {
    "id": "prob-009",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "medium",
    "text": "An integer is selected uniformly at random from 1 to 20 inclusive. What is the probability that it is divisible by 3?",
    "options": ["1/5", "3/10", "2/5", "1/4"],
    "correctIndex": 1,
    "explanation": "The multiples of 3 are 3, 6, 9, 12, 15, and 18. Probability = 6/20 = 3/10."
  },
  {
    "id": "prob-010",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "medium",
    "text": "One card is drawn from a standard 52-card deck. What is the probability of drawing a face card (Jack, Queen, or King)?",
    "options": ["1/13", "1/4", "4/13", "3/13"],
    "correctIndex": 3,
    "explanation": "There are 12 face cards: 3 ranks in each of 4 suits. Probability = 12/52 = 3/13."
  },
  {
    "id": "prob-011",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "hard",
    "text": "Two fair six-sided dice are rolled. What is the probability that their sum is at least 10?",
    "options": ["1/6", "1/4", "1/3", "5/18"],
    "correctIndex": 0,
    "explanation": "Sums of 10, 11, and 12 have 3, 2, and 1 outcomes respectively. Probability = 6/36 = 1/6."
  },
  {
    "id": "prob-012",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "hard",
    "text": "Three fair coins are tossed. What is the probability of getting exactly two heads?",
    "options": ["1/8", "1/2", "3/8", "5/8"],
    "correctIndex": 2,
    "explanation": "There are 8 equally likely outcomes and 3 with exactly two heads: HHT, HTH, and THH. Probability = 3/8."
  },
  {
    "id": "prob-013",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "hard",
    "text": "A bag contains 4 red balls and 3 blue balls. Two balls are drawn without replacement. What is the probability that both are red?",
    "options": ["2/7", "3/7", "4/7", "1/3"],
    "correctIndex": 0,
    "explanation": "Probability = (4/7) × (3/6) = 12/42 = 2/7."
  },
  {
    "id": "prob-014",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "hard",
    "text": "One card is drawn from a standard 52-card deck. What is the probability that it is neither a heart nor a king?",
    "options": ["9/13", "10/13", "3/4", "4/13"],
    "correctIndex": 0,
    "explanation": "There are 13 hearts and 4 kings, with the king of hearts counted in both groups. The excluded total is 13 + 4 - 1 = 16. Probability = 36/52 = 9/13."
  },
  {
    "id": "prob-015",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Basic Probability",
    "difficulty": "hard",
    "text": "Two fair six-sided dice are rolled. What is the probability that their product is even?",
    "options": ["1/2", "1/4", "2/3", "3/4"],
    "correctIndex": 3,
    "explanation": "The product is odd only when both dice show odd numbers. That probability is (3/6) × (3/6) = 1/4. Therefore, the probability of an even product is 1 - 1/4 = 3/4."
  },
  {
    "id": "prob-016",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "easy",
    "text": "In how many different ways can 4 distinct books be arranged on a shelf?",
    "options": ["12", "16", "24", "8"],
    "correctIndex": 2,
    "explanation": "The number of arrangements is 4! = 4 × 3 × 2 × 1 = 24."
  },
  {
    "id": "prob-017",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "easy",
    "text": "How many distinct arrangements can be made using all the letters of CAT?",
    "options": ["3", "6", "9", "12"],
    "correctIndex": 1,
    "explanation": "All 3 letters are distinct. The number of arrangements is 3! = 6."
  },
  {
    "id": "prob-018",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "easy",
    "text": "In how many ways can 5 distinct people stand in a line?",
    "options": ["25", "60", "100", "120"],
    "correctIndex": 3,
    "explanation": "The number of linear arrangements is 5! = 120."
  },
  {
    "id": "prob-019",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "easy",
    "text": "How many three-digit numbers can be formed using 1, 2, and 3 exactly once each?",
    "options": ["3", "6", "9", "27"],
    "correctIndex": 1,
    "explanation": "The three distinct digits can be arranged in 3! = 6 ways."
  },
  {
    "id": "prob-020",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "easy",
    "text": "How many distinct arrangements can be made using all the letters of APPLE?",
    "options": ["60", "120", "30", "24"],
    "correctIndex": 0,
    "explanation": "There are 5 letters, with P repeated twice. The number of distinct arrangements is 5!/2! = 60."
  },
  {
    "id": "prob-021",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "medium",
    "text": "How many distinct arrangements can be made using all the letters of BALLOON?",
    "options": ["2520", "5040", "1260", "630"],
    "correctIndex": 2,
    "explanation": "BALLOON has 7 letters, with L repeated twice and O repeated twice. The count is 7!/(2! × 2!) = 1260."
  },
  {
    "id": "prob-022",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "medium",
    "text": "In how many ways can 6 distinct people stand in a line if A and B must stand next to each other?",
    "options": ["120", "240", "360", "720"],
    "correctIndex": 1,
    "explanation": "Treat A and B as one block. There are 5 objects to arrange in 5! ways, and A and B can switch places in 2 ways. Total = 5! × 2 = 240."
  },
  {
    "id": "prob-023",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "medium",
    "text": "How many four-digit numbers can be formed from digits 1, 2, 3, 4, and 5 without repeating any digit?",
    "options": ["24", "60", "625", "120"],
    "correctIndex": 3,
    "explanation": "The count is 5 × 4 × 3 × 2 = 5P4 = 120."
  },
  {
    "id": "prob-024",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "medium",
    "text": "In how many ways can 5 distinct books be arranged if two specified books must occupy the two ends of the shelf?",
    "options": ["6", "12", "24", "48"],
    "correctIndex": 1,
    "explanation": "The two specified books can occupy the ends in 2! ways. The remaining 3 books can be arranged in 3! ways. Total = 2! × 3! = 12."
  },
  {
    "id": "prob-025",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "medium",
    "text": "How many arrangements of the 6 distinct letters A, B, C, D, E, and F have A in the first position?",
    "options": ["24", "60", "120", "720"],
    "correctIndex": 2,
    "explanation": "Fix A in the first position and arrange the other 5 letters. There are 5! = 120 arrangements."
  },
  {
    "id": "prob-026",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "hard",
    "text": "In how many ways can 7 distinct people stand in a line if A and B must not stand next to each other?",
    "options": ["3600", "2520", "1800", "720"],
    "correctIndex": 0,
    "explanation": "Total arrangements = 7! = 5040. Arrangements with A and B together = 2 × 6! = 1440. Therefore, the required count is 5040 - 1440 = 3600."
  },
  {
    "id": "prob-027",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "hard",
    "text": "How many five-digit numbers can be formed from digits 0, 1, 2, 3, 4, and 5 without repetition?",
    "options": ["600", "720", "120", "300"],
    "correctIndex": 0,
    "explanation": "The first digit has 5 choices because it cannot be 0. The remaining four positions have 5, 4, 3, and 2 choices. Total = 5 × 5 × 4 × 3 × 2 = 600."
  },
  {
    "id": "prob-028",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "hard",
    "text": "In how many ways can 8 distinct people stand in a line if 3 specified people must stand together?",
    "options": ["720", "1440", "4320", "5040"],
    "correctIndex": 2,
    "explanation": "Treat the 3 specified people as one block. There are 6 objects to arrange in 6! ways, and the 3 people within the block can be arranged in 3! ways. Total = 6! × 3! = 4320."
  },
  {
    "id": "prob-029",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "hard",
    "text": "How many distinct arrangements can be made using all the letters of MISSISSIPPI?",
    "options": ["34650", "69300", "39916800", "11520"],
    "correctIndex": 0,
    "explanation": "MISSISSIPPI has 11 letters: I appears 4 times, S appears 4 times, and P appears twice. The count is 11!/(4! × 4! × 2!) = 34650."
  },
  {
    "id": "prob-030",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Permutations — Arrangements",
    "difficulty": "hard",
    "text": "How many arrangements of the 6 distinct letters in ORANGE have the vowels A and E next to each other?",
    "options": ["120", "240", "360", "720"],
    "correctIndex": 1,
    "explanation": "Treat A and E as one block. There are 5 objects to arrange in 5! ways, and the vowels can switch places in 2 ways. Total = 5! × 2 = 240."
  },
  {
    "id": "prob-031",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "easy",
    "text": "How many ways can 2 students be selected from a group of 5 students?",
    "options": ["5", "10", "20", "25"],
    "correctIndex": 1,
    "explanation": "Order does not matter, so the count is C(5,2) = 5!/(2! × 3!) = 10."
  },
  {
    "id": "prob-032",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "easy",
    "text": "How many different teams of 3 people can be selected from 6 people?",
    "options": ["12", "18", "20", "36"],
    "correctIndex": 2,
    "explanation": "The number of teams is C(6,3) = 6!/(3! × 3!) = 20."
  },
  {
    "id": "prob-033",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "easy",
    "text": "How many ways can one representative be selected from 8 students?",
    "options": ["8", "16", "28", "64"],
    "correctIndex": 0,
    "explanation": "Selecting one person from 8 can be done in C(8,1) = 8 ways."
  },
  {
    "id": "prob-034",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "easy",
    "text": "In how many ways can all 5 students in a group be selected for a team?",
    "options": ["0", "5", "10", "1"],
    "correctIndex": 3,
    "explanation": "There is only one way to select all members: C(5,5) = 1."
  },
  {
    "id": "prob-035",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "easy",
    "text": "How many ways can 2 people be selected from 4 people?",
    "options": ["4", "6", "8", "12"],
    "correctIndex": 1,
    "explanation": "The count is C(4,2) = 4!/(2! × 2!) = 6."
  },
  {
    "id": "prob-036",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "medium",
    "text": "A committee of 5 people is selected from 8 people. How many committees include a specified person?",
    "options": ["35", "56", "70", "21"],
    "correctIndex": 0,
    "explanation": "The specified person is already included. Choose the remaining 4 from the other 7: C(7,4) = 35."
  },
  {
    "id": "prob-037",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "medium",
    "text": "A group has 5 men and 4 women. How many groups of 3 people contain exactly 2 women?",
    "options": ["20", "30", "40", "60"],
    "correctIndex": 1,
    "explanation": "Choose 2 of the 4 women and 1 of the 5 men. The count is C(4,2) × C(5,1) = 6 × 5 = 30."
  },
  {
    "id": "prob-038",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "medium",
    "text": "How many groups of 4 can be selected from 10 people if at least one of two specified people must be included?",
    "options": ["70", "105", "140", "175"],
    "correctIndex": 2,
    "explanation": "Subtract groups containing neither specified person from all groups. C(10,4) - C(8,4) = 210 - 70 = 140."
  },
  {
    "id": "prob-039",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "medium",
    "text": "How many groups of 3 can be selected from 7 people if two specified people cannot both be selected?",
    "options": ["25", "30", "32", "35"],
    "correctIndex": 1,
    "explanation": "There are C(7,3) = 35 groups in total. If both specified people are included, choose 1 more from the other 5, giving 5 groups. Required count = 35 - 5 = 30."
  },
  {
    "id": "prob-040",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "medium",
    "text": "How many committees of 4 can be selected from 6 people if two specified people cannot serve together?",
    "options": ["6", "9", "12", "15"],
    "correctIndex": 1,
    "explanation": "There are C(6,4) = 15 committees in total. Committees containing both specified people require choosing 2 of the other 4, giving C(4,2) = 6. The required count is 15 - 6 = 9."
  },
  {
    "id": "prob-041",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "hard",
    "text": "A team of 5 is selected from 6 men and 5 women. How many teams contain exactly 3 men?",
    "options": ["150", "180", "200", "250"],
    "correctIndex": 2,
    "explanation": "Choose 3 of the 6 men and 2 of the 5 women. The count is C(6,3) × C(5,2) = 20 × 10 = 200."
  },
  {
    "id": "prob-042",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "hard",
    "text": "A committee of 4 is selected from 6 men and 4 women. How many committees contain at least 2 women?",
    "options": ["90", "105", "115", "125"],
    "correctIndex": 2,
    "explanation": "Count committees with 2, 3, or 4 women: C(4,2)C(6,2) + C(4,3)C(6,1) + C(4,4)C(6,0) = 90 + 24 + 1 = 115."
  },
  {
    "id": "prob-043",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "hard",
    "text": "How many groups of 5 can be selected from 8 people if two specified people must both be included?",
    "options": ["10", "15", "20", "56"],
    "correctIndex": 2,
    "explanation": "Both specified people are already selected. Choose the remaining 3 from the other 6: C(6,3) = 20."
  },
  {
    "id": "prob-044",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "hard",
    "text": "How many committees of 4 can be selected from 7 people if at least one of two specified people must be included?",
    "options": ["20", "25", "30", "35"],
    "correctIndex": 2,
    "explanation": "There are C(7,4) = 35 committees in total. Committees containing neither specified person number C(5,4) = 5. Required count = 35 - 5 = 30."
  },
  {
    "id": "prob-045",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Combinations — Selection",
    "difficulty": "hard",
    "text": "A team of 6 is selected from 8 men and 5 women. How many teams contain at least 4 men?",
    "options": ["518", "630", "658", "700"],
    "correctIndex": 2,
    "explanation": "Count teams with 4, 5, or 6 men: C(8,4)C(5,2) + C(8,5)C(5,1) + C(8,6)C(5,0) = 350 + 280 + 28 = 658."
  },
  {
    "id": "prob-046",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "easy",
    "text": "In how many distinct ways can 4 different people sit around a round table, considering rotations identical?",
    "options": ["24", "12", "6", "4"],
    "correctIndex": 2,
    "explanation": "For n distinct people around a round table, the number of arrangements is (n - 1)!. Thus, (4 - 1)! = 6."
  },
  {
    "id": "prob-047",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "easy",
    "text": "In how many distinct ways can 5 different people sit around a round table, considering rotations identical?",
    "options": ["120", "24", "60", "12"],
    "correctIndex": 1,
    "explanation": "The number of circular arrangements is (5 - 1)! = 4! = 24."
  },
  {
    "id": "prob-048",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "easy",
    "text": "Six different people sit around a round table. If one particular person must occupy a fixed reference seat, how many arrangements are possible?",
    "options": ["24", "120", "720", "60"],
    "correctIndex": 1,
    "explanation": "Fixing one person removes rotational duplicates. Arrange the remaining 5 people in 5! = 120 ways."
  },
  {
    "id": "prob-049",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "easy",
    "text": "Four different people sit around a round table. In how many arrangements are A and B sitting next to each other?",
    "options": ["2", "4", "6", "8"],
    "correctIndex": 1,
    "explanation": "Treat A and B as a block. The block and the other two people form 3 objects around a circle, giving 2! arrangements. A and B can switch places in 2 ways. Total = 2 × 2 = 4."
  },
  {
    "id": "prob-050",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "easy",
    "text": "Five different people sit around a round table. One person's seat is fixed as a reference. What is the probability that a specified second person sits immediately next to that person?",
    "options": ["1/4", "1/2", "1/3", "2/3"],
    "correctIndex": 1,
    "explanation": "The second person has 4 possible seats relative to the fixed person. Two are adjacent, so the probability is 2/4 = 1/2."
  },
  {
    "id": "prob-051",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "medium",
    "text": "Six different people sit around a round table. In how many arrangements are A and B sitting next to each other?",
    "options": ["24", "48", "120", "240"],
    "correctIndex": 1,
    "explanation": "Treat A and B as one block. There are 5 objects around the table, giving 4! arrangements. A and B can switch places in 2 ways. Total = 4! × 2 = 48."
  },
  {
    "id": "prob-052",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "medium",
    "text": "Five different people sit around a round table. In how many arrangements are A and B not sitting next to each other?",
    "options": ["6", "12", "18", "24"],
    "correctIndex": 1,
    "explanation": "There are 4! = 24 circular arrangements in total. With A and B together, there are 2 × 3! = 12. Therefore, the required count is 24 - 12 = 12."
  },
  {
    "id": "prob-053",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "medium",
    "text": "Six different people sit around a round table. In how many arrangements are A and B directly opposite each other?",
    "options": ["12", "24", "48", "120"],
    "correctIndex": 1,
    "explanation": "Fix A's position. B has exactly one opposite seat, and the remaining 4 people can be arranged in 4! = 24 ways."
  },
  {
    "id": "prob-054",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "medium",
    "text": "Five distinct books are arranged in a line. In how many arrangements are two specified books not next to each other?",
    "options": ["48", "60", "72", "96"],
    "correctIndex": 2,
    "explanation": "There are 5! = 120 arrangements. If the specified books are together, treat them as a block: 2 × 4! = 48. Required count = 120 - 48 = 72."
  },
  {
    "id": "prob-055",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "medium",
    "text": "Seven different people sit around a round table. In how many arrangements are C and D sitting next to each other?",
    "options": ["120", "240", "360", "720"],
    "correctIndex": 1,
    "explanation": "Treat C and D as one block. There are 6 objects around the table, giving 5! arrangements. C and D can switch places in 2 ways. Total = 5! × 2 = 240."
  },
  {
    "id": "prob-056",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "hard",
    "text": "Eight different people sit around a round table. In how many arrangements must three specified people sit consecutively as a group?",
    "options": ["360", "720", "1440", "5040"],
    "correctIndex": 1,
    "explanation": "Treat the three people as one block. Together with the other five people, there are 6 objects around the table: 5! arrangements. The block has 3! internal arrangements. Total = 5! × 3! = 720."
  },
  {
    "id": "prob-057",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "hard",
    "text": "Seven different people sit around a round table. In how many arrangements are A and B not sitting next to each other?",
    "options": ["480", "600", "720", "840"],
    "correctIndex": 1,
    "explanation": "Total circular arrangements = 6! = 720. Arrangements with A and B together = 2 × 5! = 240. Required count = 720 - 240 = 480."
  },
  {
    "id": "prob-058",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "hard",
    "text": "Six different people sit around a round table. In how many arrangements are A and B directly opposite each other?",
    "options": ["12", "24", "48", "120"],
    "correctIndex": 1,
    "explanation": "Fix A's seat. B must occupy the unique opposite seat. The remaining four people can be arranged in 4! = 24 ways."
  },
  {
    "id": "prob-059",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "hard",
    "text": "Five distinct couples sit around a round table. If each couple must sit together, how many arrangements are possible? Rotations are identical, but mirror-image arrangements are counted separately.",
    "options": ["384", "768", "192", "1536"],
    "correctIndex": 1,
    "explanation": "Treat each couple as a block. The 5 blocks can be arranged around a circle in 4! ways. Each couple can switch seats in 2 ways, giving 4! × 2^5 = 768."
  },
  {
    "id": "prob-060",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Circular Arrangements & Restricted Counting",
    "difficulty": "hard",
    "text": "Seven distinct people sit around a round table. In how many arrangements are three specified people never adjacent to one another?",
    "options": ["72", "96", "144", "216"],
    "correctIndex": 2,
    "explanation": "First arrange the other four people around the table in (4 - 1)! = 6 ways. This creates 4 gaps. Choose 3 of those gaps for the specified people and arrange them in 3! ways: 6 × C(4,3) × 3! = 144."
  },
  {
    "id": "prob-061",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "easy",
    "text": "Two fair coins are tossed. What is the probability that both coins show heads?",
    "options": ["1/2", "1/4", "3/4", "1"],
    "correctIndex": 1,
    "explanation": "The four equally likely outcomes are HH, HT, TH, and TT. Only HH has two heads, so the probability is 1/4."
  },
  {
    "id": "prob-062",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "easy",
    "text": "Events A and B are independent, with P(A) = 1/2 and P(B) = 1/3. What is P(A and B)?",
    "options": ["1/5", "5/6", "1/6", "2/3"],
    "correctIndex": 2,
    "explanation": "For independent events, P(A and B) = P(A) × P(B) = 1/2 × 1/3 = 1/6."
  },
  {
    "id": "prob-063",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "easy",
    "text": "Events A and B are mutually exclusive, with P(A) = 0.4 and P(B) = 0.5. What is P(A or B)?",
    "options": ["0.2", "0.5", "0.7", "0.9"],
    "correctIndex": 3,
    "explanation": "For mutually exclusive events, P(A or B) = P(A) + P(B) = 0.4 + 0.5 = 0.9."
  },
  {
    "id": "prob-064",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "easy",
    "text": "An integer is chosen uniformly from 1 to 10. Given that the integer is greater than 5, what is the probability that it is even?",
    "options": ["1/5", "2/5", "3/5", "1/2"],
    "correctIndex": 2,
    "explanation": "The numbers greater than 5 are 6, 7, 8, 9, and 10. Three of these are even, so the conditional probability is 3/5."
  },
  {
    "id": "prob-065",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "easy",
    "text": "A face card is drawn from a standard deck of 52 cards. Given that the card is a face card, what is the probability that it is a king?",
    "options": ["1/4", "1/3", "1/13", "1/2"],
    "correctIndex": 1,
    "explanation": "There are 12 face cards and 4 kings. Given that the card is a face card, the probability of a king is 4/12 = 1/3."
  },
  {
    "id": "prob-066",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "medium",
    "text": "A bag contains 4 red balls and 3 blue balls. Two balls are drawn without replacement. Given that the first ball is red, what is the probability that the second ball is red?",
    "options": ["4/7", "1/2", "3/7", "2/3"],
    "correctIndex": 1,
    "explanation": "After the first red ball is drawn, 3 red balls remain among 6 total balls. The probability is 3/6 = 1/2."
  },
  {
    "id": "prob-067",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "medium",
    "text": "Two fair dice are rolled. Given that their sum is 8, what is the probability that both dice show the same number?",
    "options": ["1/6", "1/3", "1/5", "1/2"],
    "correctIndex": 2,
    "explanation": "The ordered outcomes summing to 8 are (2,6), (3,5), (4,4), (5,3), and (6,2). Only (4,4) is a double, so the probability is 1/5."
  },
  {
    "id": "prob-068",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "medium",
    "text": "A fair coin is tossed and a fair six-sided die is rolled. What is the probability of getting heads and a 6?",
    "options": ["1/6", "1/8", "1/12", "1/3"],
    "correctIndex": 2,
    "explanation": "The coin and die outcomes are independent. The probability is 1/2 × 1/6 = 1/12."
  },
  {
    "id": "prob-069",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "medium",
    "text": "Events A and B have P(A) = 0.6, P(B) = 0.5, and P(A and B) = 0.3. Which statement is correct?",
    "options": ["They are mutually exclusive", "They are independent", "P(A or B) = 0.3", "They are complementary"],
    "correctIndex": 1,
    "explanation": "Since P(A) × P(B) = 0.6 × 0.5 = 0.3 = P(A and B), the events are independent."
  },
  {
    "id": "prob-070",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "medium",
    "text": "Events A and B have P(A) = 0.5, P(B) = 0.4, and P(A and B) = 0.2. What is P(A or B)?",
    "options": ["0.3", "0.5", "0.7", "0.9"],
    "correctIndex": 1,
    "explanation": "Use P(A or B) = P(A) + P(B) - P(A and B) = 0.5 + 0.4 - 0.2 = 0.7."
  },
  {
    "id": "prob-071",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "hard",
    "text": "An urn contains 5 white balls and 3 black balls. Two balls are drawn without replacement. What is the probability that both are white?",
    "options": ["5/14", "5/8", "1/2", "10/21"],
    "correctIndex": 0,
    "explanation": "The probability is (5/8) × (4/7) = 20/56 = 5/14."
  },
  {
    "id": "prob-072",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "hard",
    "text": "Two fair coins are tossed. Given that at least one coin shows heads, what is the probability that both coins show heads?",
    "options": ["1/2", "1/3", "1/4", "2/3"],
    "correctIndex": 1,
    "explanation": "Given at least one head, the possible outcomes are HH, HT, and TH. Only HH has two heads, so the probability is 1/3."
  },
  {
    "id": "prob-073",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "hard",
    "text": "A card is drawn from a standard 52-card deck. Given that it is red, what is the probability that it is a face card?",
    "options": ["1/13", "3/13", "1/4", "3/26"],
    "correctIndex": 1,
    "explanation": "There are 26 red cards, including 6 red face cards. The conditional probability is 6/26 = 3/13."
  },
  {
    "id": "prob-074",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "hard",
    "text": "Events A and B satisfy P(A and B) = 0.18 and P(B) = 0.6. What is P(A given B)?",
    "options": ["0.18", "0.30", "0.42", "0.78"],
    "correctIndex": 1,
    "explanation": "P(A given B) = P(A and B)/P(B) = 0.18/0.6 = 0.30."
  },
  {
    "id": "prob-075",
    "topicSlug": "probability-permutation-combination",
    "subtopic": "Conditional Probability & Combined Events",
    "difficulty": "hard",
    "text": "A bag contains 3 red balls and 2 blue balls. Two balls are drawn without replacement. What is the probability of getting at least one red ball?",
    "options": ["3/5", "7/10", "9/10", "1/2"],
    "correctIndex": 2,
    "explanation": "Use the complement. The probability of drawing two blue balls is (2/5) × (1/4) = 1/10. Therefore, the probability of at least one red ball is 1 - 1/10 = 9/10."
  }
];

const seedProbability = async () => {
  await connectDB();
  console.log('Seeding Probability, Permutation, and Combination questions...');

  let addedSubtopics = new Set();
  let questionsInserted = 0;
  let questionsSkipped = 0;

  for (const qData of newQuestions) {
    // Find or Create Topic
    let topic = await Topic.findOne({ slug: qData.topicSlug });
    if (!topic) {
      console.log(`Topic not found for slug: ${qData.topicSlug}, creating...`);
      topic = new Topic({
        name: qData.topicSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
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

    // Validate
    if (qData.options.length !== 4 || 
        qData.correctIndex < 0 || qData.correctIndex > 3 ||
        !qData.explanation || 
        !['easy', 'medium', 'hard'].includes(qData.difficulty)) {
      console.error(`Validation failed for: ${qData.text}`);
      continue;
    }

    // Prevent duplicate
    const existingQ = await Question.findOne({ text: qData.text });
    if (existingQ) {
      questionsSkipped++;
      continue;
    }

    // Create new question
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
    console.log(`Added Probability subtopics: ${Array.from(addedSubtopics).join(', ')}`);
  }
  process.exit();
};

seedProbability();
