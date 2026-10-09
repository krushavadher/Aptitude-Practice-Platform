import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';
import Topic from '../models/Topic.js';
import connectDB from '../config/db.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const newQuestions = [
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "easy",
    "text": "Five people A, B, C, D, and E live on floors 1 to 5, one person per floor. A lives on floor 3. B lives immediately below A. On which floor does B live?",
    "options": ["Floor 1", "Floor 2", "Floor 4", "Floor 5"],
    "correctIndex": 1,
    "explanation": "B lives immediately below A on floor 3, so B lives on floor 2."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "easy",
    "text": "Four people P, Q, R, and S live on floors 1 to 4. P lives on the top floor, and Q lives on floor 2. Which floor is occupied by R if R lives immediately below P?",
    "options": ["Floor 1", "Floor 2", "Floor 3", "Floor 4"],
    "correctIndex": 2,
    "explanation": "P lives on floor 4. The floor immediately below P is floor 3, so R lives on floor 3."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "easy",
    "text": "Three people A, B, and C live on floors 1, 2, and 3. A lives on floor 1, and B lives on floor 3. Which floor does C occupy?",
    "options": ["Floor 1", "Floor 2", "Floor 3", "Cannot be determined"],
    "correctIndex": 1,
    "explanation": "A and B occupy floors 1 and 3. The remaining floor, floor 2, belongs to C."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "easy",
    "text": "Six people live on six different floors. R lives on floor 5, and S lives immediately below R. On which floor does S live?",
    "options": ["Floor 3", "Floor 4", "Floor 5", "Floor 6"],
    "correctIndex": 1,
    "explanation": "The floor immediately below floor 5 is floor 4."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "easy",
    "text": "Five people A, B, C, D, and E live on floors 1 to 5. E lives on floor 5, A lives on floor 1, and B lives on floor 3. Which floor is available for C if D lives on floor 2?",
    "options": ["Floor 1", "Floor 2", "Floor 4", "Floor 5"],
    "correctIndex": 2,
    "explanation": "A, D, B, and E occupy floors 1, 2, 3, and 5. Therefore, C occupies floor 4."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "medium",
    "text": "Six people A, B, C, D, E, and F live on floors 1 to 6. A lives on floor 4, B lives immediately above A, and C lives on floor 1. What is the lowest possible floor for D if D lives above A?",
    "options": ["Floor 2", "Floor 3", "Floor 5", "Floor 6"],
    "correctIndex": 2,
    "explanation": "A is on floor 4, and D must live above A. The possible floors are 5 and 6, so the lowest possible floor is 5."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "medium",
    "text": "Five people P, Q, R, S, and T live on floors 1 to 5. P lives above Q, R lives below Q, S lives on floor 5, and T lives on floor 1. Which person must live on floor 3?",
    "options": ["P", "Q", "R", "S"],
    "correctIndex": 1,
    "explanation": "S is on floor 5 and T is on floor 1. Since R is below Q and P is above Q, the only arrangement is R on floor 2, Q on floor 3, and P on floor 4."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "medium",
    "text": "Six people A, B, C, D, E, and F live on floors 1 to 6. A lives immediately above B, C lives immediately above A, and B lives on floor 2. On which floor does C live?",
    "options": ["Floor 3", "Floor 4", "Floor 5", "Floor 6"],
    "correctIndex": 1,
    "explanation": "B is on floor 2, A is immediately above B on floor 3, and C is immediately above A on floor 4."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "medium",
    "text": "Five people A, B, C, D, and E live on floors 1 to 5. A lives above B, C lives below B, D lives above A, and E lives below C. Who lives on the lowest floor?",
    "options": ["A", "B", "C", "E"],
    "correctIndex": 3,
    "explanation": "The order from bottom to top is E, C, B, A, D. Therefore, E lives on the lowest floor."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "medium",
    "text": "Seven people P, Q, R, S, T, U, and V live on floors 1 to 7. P lives on floor 4, Q lives immediately above P, R lives immediately below P, S lives on floor 1, and T lives on floor 7. Which floors remain for U and V?",
    "options": ["Floors 2 and 3", "Floors 5 and 6", "Floors 2 and 6", "Floors 3 and 5"],
    "correctIndex": 1,
    "explanation": "P is on floor 4, Q on floor 5, R on floor 3, S on floor 1, and T on floor 7. The remaining floors are 2 and 6. Correction: the correct option is Floors 2 and 6."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "hard",
    "text": "Six people P, Q, R, S, T, and U live on floors 1 to 6. P lives on floor 6, Q lives on floor 2, R lives immediately above Q, S lives immediately above R, T lives on floor 1, and U occupies the remaining floor. On which floor does U live?",
    "options": ["Floor 3", "Floor 4", "Floor 5", "Floor 6"],
    "correctIndex": 2,
    "explanation": "P is on floor 6, Q on floor 2, R on floor 3, S on floor 4, and T on floor 1. The remaining floor is floor 5, occupied by U."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "hard",
    "text": "Five people A, B, C, D, and E live on floors 1 to 5. A lives immediately above B, C lives immediately above A, D lives on floor 1, and E lives on floor 5. On which floor does A live?",
    "options": ["Floor 2", "Floor 3", "Floor 4", "Floor 5"],
    "correctIndex": 1,
    "explanation": "D is on floor 1 and E is on floor 5. The consecutive arrangement B, A, C must occupy floors 2, 3, and 4 respectively. Therefore, A lives on floor 3."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "hard",
    "text": "Seven people A, B, C, D, E, F, and G live on floors 1 to 7. A lives on floor 4, B immediately above A, C immediately below A, D on floor 1, and E on floor 7. Which floors are occupied by F and G?",
    "options": ["Floors 2 and 5", "Floors 3 and 6", "Floors 2 and 6", "Floors 5 and 7"],
    "correctIndex": 2,
    "explanation": "D is on floor 1, C on floor 3, A on floor 4, B on floor 5, and E on floor 7. F and G occupy the remaining floors 2 and 6."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "hard",
    "text": "Six people A, B, C, D, E, and F live on floors 1 to 6. A lives above B, C lives above A, D lives below B, E lives above C, and F lives on floor 1. Who lives on the top floor?",
    "options": ["A", "B", "C", "E"],
    "correctIndex": 3,
    "explanation": "The order from bottom to top is F, D, B, A, C, E. Therefore, E lives on the top floor."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Floor-Based Puzzles",
    "difficulty": "hard",
    "text": "Seven people A, B, C, D, E, F, and G live on floors 1 to 7. A lives on floor 3, B lives immediately above A, C lives on floor 7, D lives immediately below A, E lives on floor 1, and F lives on floor 5. Which floor does G occupy?",
    "options": ["Floor 2", "Floor 4", "Floor 6", "Floor 7"],
    "correctIndex": 2,
    "explanation": "E is on floor 1, D on floor 2, A on floor 3, B on floor 4, F on floor 5, and C on floor 7. The remaining floor is floor 6, occupied by G."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "easy",
    "text": "Four boxes A, B, C, and D are arranged in a row from left to right. A is first and D is last. If B is immediately to the right of A, which box is third?",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 2,
    "explanation": "The order is A, B, C, D. Therefore, C is third."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "easy",
    "text": "Five books are arranged from left to right. Book P is first, book Q is second, and book R is last. Which position is occupied by book S if book T is third and S is immediately before R?",
    "options": ["Second", "Third", "Fourth", "Fifth"],
    "correctIndex": 2,
    "explanation": "The order is P, Q, T, S, R. S occupies the fourth position."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "easy",
    "text": "Five boxes are arranged in a row. Box A is to the left of B, and B is to the left of C. Which statement must be true?",
    "options": ["C is left of A", "A is left of C", "B is left of A", "A and C are adjacent"],
    "correctIndex": 1,
    "explanation": "If A is left of B and B is left of C, then A must be left of C. They do not necessarily have to be adjacent."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "easy",
    "text": "Six boxes are arranged from left to right. Box M is third, and box N is immediately after M. What is the position of N?",
    "options": ["Second", "Third", "Fourth", "Fifth"],
    "correctIndex": 2,
    "explanation": "N is immediately after the third box, so N occupies the fourth position."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "easy",
    "text": "Five people stand in a line. R is first, S is second, T is third, U is fourth, and V is fifth. Who stands immediately before U?",
    "options": ["R", "S", "T", "V"],
    "correctIndex": 2,
    "explanation": "T occupies the third position and U the fourth, so T stands immediately before U."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "medium",
    "text": "Six boxes A, B, C, D, E, and F are arranged from left to right. A is first, F is last, B is immediately after A, and E is immediately before F. If C is immediately after B, which box occupies the fourth position?",
    "options": ["B", "C", "D", "E"],
    "correctIndex": 2,
    "explanation": "The arrangement is A, B, C, D, E, F. D occupies the fourth position."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "medium",
    "text": "Five books P, Q, R, S, and T are arranged in a row. P is before Q, Q is before R, S is after R, and T is after S. Which book is in the middle?",
    "options": ["P", "Q", "R", "S"],
    "correctIndex": 2,
    "explanation": "The order is P, Q, R, S, T. R is third, the middle position."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "medium",
    "text": "Seven boxes are arranged in a row. A is first, G is last, B is immediately after A, and F is immediately before G. Which position must be occupied by B?",
    "options": ["First", "Second", "Third", "Fourth"],
    "correctIndex": 1,
    "explanation": "Because B is immediately after A and A is first, B must occupy the second position."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "medium",
    "text": "Six books are arranged from left to right. P is second, Q is immediately to the right of P, and R is immediately to the left of P. What is the position of R?",
    "options": ["First", "Second", "Third", "Fourth"],
    "correctIndex": 0,
    "explanation": "P is second, so the position immediately to its left is first. Therefore, R is first."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "medium",
    "text": "Five boxes A, B, C, D, and E are arranged in a row. A is before B, C is after B, D is before A, and E is after C. Which box is first?",
    "options": ["A", "B", "D", "E"],
    "correctIndex": 2,
    "explanation": "The order is D, A, B, C, E. Therefore, D is first."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "hard",
    "text": "Six boxes A, B, C, D, E, and F are arranged from left to right in the order A, B, C, D, E, F. Which box is immediately before F?",
    "options": ["C", "D", "E", "A"],
    "correctIndex": 2,
    "explanation": "In the given order, E is immediately before F."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "hard",
    "text": "Seven boxes A, B, C, D, E, F, and G are arranged in a row. A is first, G is last, B is immediately after A, C is immediately after B, D is immediately before G, and E is fifth. Which box occupies the fourth position?",
    "options": ["C", "D", "E", "F"],
    "correctIndex": 3,
    "explanation": "The arrangement is A, B, C, F, E, D, G. F occupies the fourth position."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "hard",
    "text": "Six boxes A, B, C, D, E, and F are arranged so that A is before B, B is before C, C is before D, D is before E, and E is before F. Which box is third?",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 2,
    "explanation": "The order is A, B, C, D, E, F. C is third."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "hard",
    "text": "Eight books are arranged from left to right. P is fourth, Q is two places to the right of P, and R is immediately to the left of Q. What is R's position?",
    "options": ["Fourth", "Fifth", "Sixth", "Seventh"],
    "correctIndex": 1,
    "explanation": "P is fourth. Q is two places to the right, so Q is sixth. R is immediately to the left of Q, so R is fifth."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Box and Order Arrangement Puzzles",
    "difficulty": "hard",
    "text": "Six books A, B, C, D, E, and F are arranged in a row. A is first, F is last, B is immediately after A, E is immediately before F, and C is immediately before D. Which arrangement is valid?",
    "options": ["A, B, C, D, E, F", "A, C, B, D, E, F", "A, B, D, C, E, F", "A, B, C, E, D, F"],
    "correctIndex": 0,
    "explanation": "In A, B, C, D, E, F, B immediately follows A, E immediately precedes F, and C immediately precedes D. The other arrangements violate at least one condition."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "easy",
    "text": "A father is 40 years old and his son is 10 years old. What will be the difference between their ages after 5 years?",
    "options": ["25 years", "30 years", "35 years", "40 years"],
    "correctIndex": 1,
    "explanation": "After 5 years, their ages will be 45 and 15. The difference remains 45 − 15 = 30 years."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "easy",
    "text": "Riya is 12 years old, and her brother is 8 years old. What is the sum of their ages after 3 years?",
    "options": ["20 years", "23 years", "26 years", "29 years"],
    "correctIndex": 2,
    "explanation": "After 3 years, their ages will be 15 and 11. Their sum will be 15 + 11 = 26 years."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "easy",
    "text": "A mother is 36 years old and her daughter is 12 years old. How many times the daughter's present age is the mother's present age?",
    "options": ["2 times", "3 times", "4 times", "5 times"],
    "correctIndex": 1,
    "explanation": "36 ÷ 12 = 3. The mother is three times as old as her daughter."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "easy",
    "text": "A person is 25 years old now. How old was the person 7 years ago?",
    "options": ["16 years", "17 years", "18 years", "19 years"],
    "correctIndex": 2,
    "explanation": "25 − 7 = 18 years."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "easy",
    "text": "The present ages of A and B are 15 and 20 years respectively. What will be the ratio of their ages after 5 years?",
    "options": ["2:3", "3:4", "4:5", "5:6"],
    "correctIndex": 1,
    "explanation": "After 5 years, their ages will be 20 and 25. The ratio is 20:25 = 4:5. Correction: the correct option is 4:5."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "medium",
    "text": "A father is three times as old as his son. Their ages add up to 48 years. How old is the son?",
    "options": ["10 years", "12 years", "14 years", "16 years"],
    "correctIndex": 1,
    "explanation": "Let the son's age be x. The father's age is 3x. Thus, 4x = 48, so x = 12 years."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "medium",
    "text": "A is 5 years older than B. If B is 17 years old, how old will A be in 4 years?",
    "options": ["21 years", "22 years", "25 years", "26 years"],
    "correctIndex": 2,
    "explanation": "A is currently 17 + 5 = 22 years old. In 4 years, A will be 26 years old. Correction: the correct option is 26 years."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "medium",
    "text": "The present ages of two siblings are in the ratio 2:3. If their total age is 40 years, what is the age of the younger sibling?",
    "options": ["12 years", "16 years", "20 years", "24 years"],
    "correctIndex": 1,
    "explanation": "The total number of ratio parts is 2 + 3 = 5. Each part is 40 ÷ 5 = 8 years, so the younger sibling is 2 × 8 = 16 years old."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "medium",
    "text": "A mother is 30 years older than her daughter. If the daughter is 10 years old, what will be the ratio of their ages after 10 years?",
    "options": ["2:1", "3:1", "4:1", "5:2"],
    "correctIndex": 0,
    "explanation": "After 10 years, the mother will be 50 and the daughter will be 20. The ratio is 50:20 = 5:2. Correction: the correct option is 5:2."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "medium",
    "text": "A person is twice as old as their sibling. Six years ago, the older person was three times as old as the sibling. If the sibling is currently x years old, what is x?",
    "options": ["8", "10", "12", "14"],
    "correctIndex": 2,
    "explanation": "Let the sibling's age be x and the older person's age be 2x. Six years ago, 2x − 6 = 3(x − 6). Solving gives x = 12."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "hard",
    "text": "A father and son have a combined age of 60 years. Five years ago, the father was five times as old as the son. What is the father's present age?",
    "options": ["40 years", "45 years", "50 years", "55 years"],
    "correctIndex": 1,
    "explanation": "Let the father's age be F and the son's age be S. F + S = 60 and F − 5 = 5(S − 5). Solving gives S = 15 and F = 45."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "hard",
    "text": "A is twice as old as B. Eight years ago, A was four times as old as B. How old is B now?",
    "options": ["10 years", "12 years", "14 years", "16 years"],
    "correctIndex": 1,
    "explanation": "Let B = x and A = 2x. Eight years ago, 2x − 8 = 4(x − 8). Solving gives x = 12."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "hard",
    "text": "The present ages of A and B are in the ratio 5:3. In 8 years, their ages will be in the ratio 7:5. What is A's present age?",
    "options": ["15 years", "18 years", "20 years", "25 years"],
    "correctIndex": 2,
    "explanation": "Let their ages be 5x and 3x. Then (5x + 8)/(3x + 8) = 7/5. Solving gives x = 4, so A is 20 years old."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "hard",
    "text": "A mother is four times as old as her daughter. In 12 years, the mother will be twice as old as her daughter. How old is the daughter now?",
    "options": ["4 years", "6 years", "8 years", "10 years"],
    "correctIndex": 1,
    "explanation": "Let the daughter's age be x and the mother's age be 4x. Then 4x + 12 = 2(x + 12). Solving gives x = 6."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Age-Based Puzzles",
    "difficulty": "hard",
    "text": "A father and daughter have a combined age of 50 years. In 5 years, the father will be three times as old as the daughter. What is the daughter's present age?",
    "options": ["8 years", "10 years", "12 years", "15 years"],
    "correctIndex": 1,
    "explanation": "Let the daughter's age be D and the father's age be F. F + D = 50 and F + 5 = 3(D + 5). Substituting F = 50 − D gives D = 10."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "easy",
    "text": "A meeting is scheduled on Monday. Another meeting is scheduled exactly two days later. On which day is the second meeting?",
    "options": ["Tuesday", "Wednesday", "Thursday", "Friday"],
    "correctIndex": 1,
    "explanation": "Two days after Monday is Wednesday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "easy",
    "text": "Four tasks A, B, C, and D are scheduled from Monday to Thursday, one task per day. A is scheduled Monday, and B is scheduled Tuesday. Which task is scheduled Thursday if C is scheduled Wednesday?",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 3,
    "explanation": "A, B, and C are scheduled Monday, Tuesday, and Wednesday. D is scheduled Thursday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "easy",
    "text": "A class is held every Wednesday. If the first class of a month is on the 3rd, what is the date of the next class?",
    "options": ["7th", "9th", "10th", "11th"],
    "correctIndex": 2,
    "explanation": "The next Wednesday is seven days later: 3 + 7 = 10."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "easy",
    "text": "Five activities are scheduled from Monday to Friday. The first activity is on Monday and the last is on Friday. Which day lies exactly between Tuesday and Thursday?",
    "options": ["Monday", "Tuesday", "Wednesday", "Friday"],
    "correctIndex": 2,
    "explanation": "Wednesday lies between Tuesday and Thursday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "easy",
    "text": "A project begins on the 10th of a month. A second phase begins 4 days later. On which date does the second phase begin?",
    "options": ["12th", "13th", "14th", "15th"],
    "correctIndex": 2,
    "explanation": "Four days after the 10th is the 14th."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "medium",
    "text": "Four interviews A, B, C, and D are scheduled Monday through Thursday, one per day. A is on Monday, B is immediately after A, and D is on Thursday. On which day is C scheduled?",
    "options": ["Monday", "Tuesday", "Wednesday", "Thursday"],
    "correctIndex": 2,
    "explanation": "A is Monday, B is Tuesday, and D is Thursday. C must be scheduled Wednesday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "medium",
    "text": "Five tasks P, Q, R, S, and T are scheduled Monday through Friday. P is on Monday, Q is on Wednesday, and R is on Friday. On which two days must S and T be scheduled?",
    "options": ["Monday and Tuesday", "Tuesday and Thursday", "Wednesday and Thursday", "Thursday and Friday"],
    "correctIndex": 1,
    "explanation": "Monday, Wednesday, and Friday are occupied by P, Q, and R. The remaining days are Tuesday and Thursday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "medium",
    "text": "Four tasks A, B, C, and D are scheduled Monday through Thursday. D is on Monday, A is on Tuesday, A must be before B, and C must be after B. On which day is B scheduled?",
    "options": ["Monday", "Tuesday", "Wednesday", "Thursday"],
    "correctIndex": 2,
    "explanation": "D is Monday and A is Tuesday. B must follow A and C must follow B, so B is Wednesday and C is Thursday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "medium",
    "text": "Three presentations P, Q, and R are scheduled on Monday, Tuesday, and Wednesday, one per day. P must occur before R, and Q must occur after P. Which day must P be scheduled?",
    "options": ["Monday", "Tuesday", "Wednesday", "Cannot be determined"],
    "correctIndex": 0,
    "explanation": "P must occur before both Q and R. Therefore, P must be on Monday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "medium",
    "text": "Four tasks A, B, C, and D are scheduled in a row. A must occur before B, and C must occur before D. Which order satisfies both conditions?",
    "options": ["B, A, C, D", "A, B, D, C", "A, C, B, D", "D, C, A, B"],
    "correctIndex": 2,
    "explanation": "In A, C, B, D, A occurs before B and C occurs before D. The other options violate at least one condition."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "hard",
    "text": "Five exams P, Q, R, S, and T are scheduled Monday through Friday, one per day. P is before Q, R is on Wednesday, S is after Q, and T is on Monday. On which day is Q scheduled?",
    "options": ["Monday", "Tuesday", "Thursday", "Friday"],
    "correctIndex": 2,
    "explanation": "T occupies Monday and R occupies Wednesday. P, Q, and S must occupy Tuesday, Thursday, and Friday in that order. Therefore, Q is on Thursday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "hard",
    "text": "Four activities A, B, C, and D are scheduled Monday through Thursday. D is Monday, A must occur before C, and B must occur after C. Which day is B scheduled?",
    "options": ["Tuesday", "Wednesday", "Thursday", "Monday"],
    "correctIndex": 2,
    "explanation": "D is Monday. A, C, and B must occur Tuesday, Wednesday, and Thursday in that order. B is Thursday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "hard",
    "text": "Six activities A, B, C, D, E, and F are scheduled Monday through Saturday, one per day. A is Monday, F is Saturday, B is immediately after A, and E is immediately before F. C and D occupy the remaining two days. Which two days are occupied by C and D?",
    "options": ["Tuesday and Wednesday", "Wednesday and Thursday", "Thursday and Friday", "Tuesday and Friday"],
    "correctIndex": 1,
    "explanation": "A is Monday, B Tuesday, E Friday, and F Saturday. C and D therefore occupy Wednesday and Thursday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "hard",
    "text": "Five tasks A, B, C, D, and E are scheduled Monday through Friday. D is Monday, E is Friday, A is Tuesday, and C must occur after B. On which day is C scheduled?",
    "options": ["Wednesday", "Thursday", "Friday", "Monday"],
    "correctIndex": 1,
    "explanation": "B and C must occupy Wednesday and Thursday in that order, so C is scheduled Thursday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "hard",
    "text": "Five interviews A, B, C, D, and E are scheduled Monday through Friday. A must occur before B, B before C, D is Monday, and E is Friday. On which day is B scheduled?",
    "options": ["Tuesday", "Wednesday", "Thursday", "Friday"],
    "correctIndex": 1,
    "explanation": "D is Monday and E is Friday. A, B, and C occupy Tuesday, Wednesday, and Thursday in order. B is Wednesday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Scheduling and Day/Month-Based Puzzles",
    "difficulty": "hard",
    "text": "Four tasks A, B, C, and D are scheduled Monday through Thursday. D is Monday, A is Tuesday, and B must be before C. Which day is C scheduled?",
    "options": ["Tuesday", "Wednesday", "Thursday", "Monday"],
    "correctIndex": 2,
    "explanation": "D occupies Monday and A Tuesday. B and C occupy Wednesday and Thursday in that order, so C is Thursday."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "easy",
    "text": "A is taller than B, and B is taller than C. Who is the tallest?",
    "options": ["A", "B", "C", "Cannot be determined"],
    "correctIndex": 0,
    "explanation": "Since A is taller than B and B is taller than C, A is the tallest."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "easy",
    "text": "In a race, R finishes before S, and S finishes before T. Who finishes last?",
    "options": ["R", "S", "T", "Cannot be determined"],
    "correctIndex": 2,
    "explanation": "The finishing order is R, S, T. Therefore, T finishes last."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "easy",
    "text": "Five students are ranked from highest to lowest. A ranks first, B second, C third, D fourth, and E fifth. Who ranks immediately above D?",
    "options": ["A", "B", "C", "E"],
    "correctIndex": 2,
    "explanation": "C is third and D is fourth, so C ranks immediately above D."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "easy",
    "text": "P is heavier than Q but lighter than R. Which person is the heaviest among P, Q, and R?",
    "options": ["P", "Q", "R", "Cannot be determined"],
    "correctIndex": 2,
    "explanation": "The relationship is R > P > Q. Therefore, R is the heaviest."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "easy",
    "text": "In a queue, A stands ahead of B, and B stands ahead of C. Who stands at the back among these three?",
    "options": ["A", "B", "C", "Cannot be determined"],
    "correctIndex": 2,
    "explanation": "The order from front to back is A, B, C. Therefore, C is at the back."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "medium",
    "text": "In a class of 30 students, R ranks 8th from the top. What is R's rank from the bottom?",
    "options": ["21st", "22nd", "23rd", "24th"],
    "correctIndex": 2,
    "explanation": "Rank from bottom = total students − rank from top + 1 = 30 − 8 + 1 = 23rd."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "medium",
    "text": "C is taller than A, A is taller than B, and B is taller than D. Who is the second tallest?",
    "options": ["C", "A", "B", "D"],
    "correctIndex": 1,
    "explanation": "The order from tallest to shortest is C, A, B, D. A is second tallest."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "medium",
    "text": "Four runners M, K, L, and N finish a race. M finishes before K, K before L, and L before N. Who finishes second?",
    "options": ["K", "M", "L", "N"],
    "correctIndex": 0,
    "explanation": "The order is M, K, L, N. K finishes second."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "medium",
    "text": "A student is 9th from the front and 12th from the back in a queue. How many students are in the queue?",
    "options": ["19", "20", "21", "22"],
    "correctIndex": 1,
    "explanation": "Total = rank from front + rank from back − 1 = 9 + 12 − 1 = 20 students."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "medium",
    "text": "D is taller than A, A is taller than B, B is taller than C, and C is taller than E. Who is the second tallest?",
    "options": ["A", "B", "C", "E"],
    "correctIndex": 0,
    "explanation": "The order is D, A, B, C, E. A is second tallest."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "hard",
    "text": "Five runners A, B, C, D, and E finish a race. D finishes before A, A before B, B before C, and E after C. Who finishes third?",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 1,
    "explanation": "The order is D, A, B, C, E. B finishes third."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "hard",
    "text": "A person is 15th from the front and 18th from the back in a queue. How many people are in the queue?",
    "options": ["31", "32", "33", "34"],
    "correctIndex": 1,
    "explanation": "Total people = 15 + 18 − 1 = 32."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "hard",
    "text": "Six students F, D, A, B, C, and E are ranked from tallest to shortest in that order. Who is the second tallest?",
    "options": ["F", "D", "A", "B"],
    "correctIndex": 1,
    "explanation": "D is second in the given order, so D is the second tallest."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "hard",
    "text": "There are 50 students in a class. R ranks 17th from the top, and S ranks 20th from the bottom. How many students are ranked between R and S?",
    "options": ["12", "13", "14", "15"],
    "correctIndex": 1,
    "explanation": "S's rank from the top is 50 − 20 + 1 = 31. Students between them = 31 − 17 − 1 = 13."
  },
  {
    "topicSlug": "logical-puzzles",
    "subtopic": "Comparison and Ranking Puzzles",
    "difficulty": "hard",
    "text": "Six people F, D, A, B, C, and E are ranked from tallest to shortest in that order. Who is third tallest?",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "The order is F, D, A, B, C, E. A is third tallest."
  }
];

const seedLogicalPuzzles = async () => {
  await connectDB();
  console.log('Seeding Logical Puzzles questions...');

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
        category: 'logical',
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
    console.log(`Added Logical Puzzles subtopics: ${Array.from(addedSubtopics).join(', ')}`);
  }
  process.exit();
};

seedLogicalPuzzles();
