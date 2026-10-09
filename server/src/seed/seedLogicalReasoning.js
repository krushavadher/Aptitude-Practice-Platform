import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';
import Topic from '../models/Topic.js';
import connectDB from '../config/db.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const newQuestions = [
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "easy",
    "text": "If CAT is coded as DBU, how is DOG coded using the same rule?",
    "options": ["EPH", "EOG", "DPH", "FQI"],
    "correctIndex": 0,
    "explanation": "Each letter moves one position forward: D→E, O→P, G→H."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "easy",
    "text": "If BOOK is coded as CPPL, how is TREE coded?",
    "options": ["USFF", "UQFF", "TSFF", "VSFF"],
    "correctIndex": 0,
    "explanation": "Each letter moves one position forward, so TREE becomes USFF."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "easy",
    "text": "If SUN is coded as TVO, how is MOON coded?",
    "options": ["NPPO", "NQPO", "MPPO", "NOOP"],
    "correctIndex": 0,
    "explanation": "Moving each letter one position forward gives MOON → NPPO."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "easy",
    "text": "If letters are represented by their alphabetical positions, how is INK represented?",
    "options": ["9-14-11", "8-14-10", "9-13-11", "10-14-12"],
    "correctIndex": 0,
    "explanation": "I is 9, N is 14, and K is 11."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "easy",
    "text": "If APPLE is coded as ELPPA, how is TRAIN coded?",
    "options": ["NIART", "NIRAT", "TNIAR", "NIATR"],
    "correctIndex": 0,
    "explanation": "The letters are arranged in reverse order: TRAIN becomes NIART."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "medium",
    "text": "If TABLE is coded as UBCMF, how is CHAIR coded?",
    "options": ["DIBJS", "DIBIR", "DHBJS", "EIBJS"],
    "correctIndex": 0,
    "explanation": "Every letter is shifted one position forward: CHAIR becomes DIBJS."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "medium",
    "text": "If each letter is replaced by its opposite letter in the alphabet, with A↔Z and B↔Y, how is CAT coded?",
    "options": ["XZG", "XAG", "XZH", "WZG"],
    "correctIndex": 0,
    "explanation": "C maps to X, A maps to Z, and T maps to G, giving XZG."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "medium",
    "text": "If ROAD is coded as URDG, how is MILK coded using the same rule?",
    "options": ["PLON", "OLNM", "PLOM", "QMON"],
    "correctIndex": 0,
    "explanation": "Each letter moves three positions forward: MILK becomes PLON."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "medium",
    "text": "In a code, 123 means 'red blue green', 345 means 'blue yellow white', and 156 means 'red black orange'. Which digit represents blue?",
    "options": ["1", "2", "3", "5"],
    "correctIndex": 2,
    "explanation": "The first two codes share the word blue and the digit 3."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "medium",
    "text": "If each letter is shifted two positions forward, what is the code for TIGER?",
    "options": ["VKIGT", "VJIGT", "VKJGT", "UKIGT"],
    "correctIndex": 0,
    "explanation": "T→V, I→K, G→I, E→G, and R→T."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "hard",
    "text": "If MANGO is coded as OCPIQ, how is GRAPE coded using the same rule?",
    "options": ["ITCRG", "ITBPH", "HSBQF", "JUDSH"],
    "correctIndex": 0,
    "explanation": "Each letter moves two positions forward: GRAPE becomes ITCRG."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "hard",
    "text": "A word is coded by shifting every letter one position forward and then reversing the result. How is LION coded?",
    "options": ["OPJM", "OPJN", "NJPQ", "MJPO"],
    "correctIndex": 0,
    "explanation": "LION becomes MJPO after shifting. Reversing MJPO gives OPJM."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "hard",
    "text": "If the value of a word is the sum of the alphabetical positions of its letters, what is the value of CODE?",
    "options": ["27", "26", "25", "28"],
    "correctIndex": 0,
    "explanation": "C=3, O=15, D=4, E=5. The sum is 3+15+4+5=27."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "hard",
    "text": "If each letter is shifted one position backward, with A becoming Z, how is BCA coded?",
    "options": ["ABZ", "ACZ", "ABY", "ZAB"],
    "correctIndex": 0,
    "explanation": "B→A, C→B, and A→Z, giving ABZ."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Coding-Decoding",
    "difficulty": "hard",
    "text": "A word is coded by reversing it and then shifting every letter one position forward. How is NOTE coded?",
    "options": ["FUPO", "FUPN", "FUQP", "ETON"],
    "correctIndex": 0,
    "explanation": "NOTE reversed is ETON. Shifting each letter forward gives FUPO."
  },

  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "easy",
    "text": "A is the brother of B. B is the sister of C. How is A related to C?",
    "options": ["Brother", "Sister", "Father", "Cousin"],
    "correctIndex": 0,
    "explanation": "A is male and is C's sibling, so A is C's brother."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "easy",
    "text": "P is the mother of Q. Q is the father of R. How is P related to R?",
    "options": ["Mother", "Grandmother", "Aunt", "Sister"],
    "correctIndex": 1,
    "explanation": "P is the mother of R's father, so P is R's grandmother."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "easy",
    "text": "X is the sister of Y. Y is the son of Z. How is X related to Z?",
    "options": ["Daughter", "Mother", "Aunt", "Cousin"],
    "correctIndex": 0,
    "explanation": "X is Y's sister, and Y is Z's son, so X is Z's daughter."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "easy",
    "text": "A is the father of B, and B is the mother of C. How is A related to C?",
    "options": ["Uncle", "Grandfather", "Father", "Brother"],
    "correctIndex": 1,
    "explanation": "A is the father of C's mother, making A C's grandfather."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "easy",
    "text": "M is the wife of N. N is the brother of P. How is M related to P?",
    "options": ["Sister", "Sister-in-law", "Mother", "Daughter"],
    "correctIndex": 1,
    "explanation": "M is married to P's brother, so she is P's sister-in-law."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "medium",
    "text": "Pointing to a boy, Riya says, 'He is the son of my mother's only daughter.' How is the boy related to Riya?",
    "options": ["Brother", "Son", "Nephew", "Cousin"],
    "correctIndex": 1,
    "explanation": "Riya's mother's only daughter is Riya, so the boy is Riya's son."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "medium",
    "text": "A is the son of B. C is B's sister. D is C's mother. How is D related to A?",
    "options": ["Mother", "Aunt", "Grandmother", "Sister"],
    "correctIndex": 2,
    "explanation": "D is the mother of B's sister C and therefore B's mother. D is A's grandmother."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "medium",
    "text": "P is the brother of Q. Q is the daughter of R. S is R's wife. How is S related to P?",
    "options": ["Sister", "Mother", "Aunt", "Daughter"],
    "correctIndex": 1,
    "explanation": "P and Q are siblings. Since S is Q's mother's wife, S is P's mother under the usual aptitude-test assumption that S is Q's mother."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "medium",
    "text": "A woman says, 'The person in the photograph is the son of my father's only son.' She has one brother and no other siblings. How is the person related to her?",
    "options": ["Son", "Nephew", "Brother", "Cousin"],
    "correctIndex": 1,
    "explanation": "Her father's only son is her brother. His son is her nephew."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "medium",
    "text": "A is the father of B. C is the wife of A. D is the brother of B. How is C related to D?",
    "options": ["Sister", "Mother", "Aunt", "Grandmother"],
    "correctIndex": 1,
    "explanation": "C is A's wife, and A is D's father. Under the usual family-relation assumption, C is D's mother."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "hard",
    "text": "A is the brother of B. B is the daughter of C. C is married to D. D is the father of E, who is A's sibling. How is E related to B?",
    "options": ["Sibling", "Cousin", "Aunt", "Uncle"],
    "correctIndex": 0,
    "explanation": "E is A's sibling, and A is B's brother. Therefore E is also B's sibling."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "hard",
    "text": "Pointing to a woman, Arun says, 'Her mother is the only daughter of my mother.' How is the woman related to Arun?",
    "options": ["Daughter", "Sister", "Niece", "Cousin"],
    "correctIndex": 2,
    "explanation": "Arun's mother's only daughter is Arun's sister. The woman's mother is his sister, so the woman is his niece."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "hard",
    "text": "P is the mother of Q. R is the father of P. S is the daughter of Q. How is R related to S?",
    "options": ["Father", "Grandfather", "Great-grandfather", "Uncle"],
    "correctIndex": 2,
    "explanation": "R is P's father, P is Q's mother, and Q is S's parent. R is S's great-grandfather."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "hard",
    "text": "A is the son of B. B is the daughter of C. C is the wife of D. E is D's son and B's brother. How is E related to A?",
    "options": ["Father", "Uncle", "Grandfather", "Brother"],
    "correctIndex": 1,
    "explanation": "E is B's brother, and B is A's mother. E is A's maternal uncle."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Blood Relations",
    "difficulty": "hard",
    "text": "Neha says, 'This man's wife is the only daughter of my maternal grandfather.' Assuming Neha's mother is that only daughter, how is the man related to Neha?",
    "options": ["Father", "Maternal uncle", "Brother", "Grandfather"],
    "correctIndex": 0,
    "explanation": "The man's wife is Neha's mother, so the man is Neha's father."
  },

  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "easy",
    "text": "Ravi walks 5 km north and then 3 km east. In which direction is he from his starting point?",
    "options": ["North", "North-east", "South-east", "West"],
    "correctIndex": 1,
    "explanation": "He is north and east of his starting point, so he is north-east."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "easy",
    "text": "A person faces north and turns right. Which direction is the person facing now?",
    "options": ["West", "South", "East", "North"],
    "correctIndex": 2,
    "explanation": "A right turn from north points east."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "easy",
    "text": "Meena walks 4 km south and then 4 km north. Where is she relative to her starting point?",
    "options": ["4 km north", "4 km south", "At the starting point", "8 km north"],
    "correctIndex": 2,
    "explanation": "The equal movements in opposite directions cancel out."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "easy",
    "text": "A man faces west and turns left. Which direction does he face?",
    "options": ["North", "South", "East", "West"],
    "correctIndex": 1,
    "explanation": "A left turn from west points south."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "easy",
    "text": "A person walks 6 km east and then 2 km west. How far is the person from the starting point?",
    "options": ["8 km east", "4 km east", "4 km west", "2 km east"],
    "correctIndex": 1,
    "explanation": "The net movement is 6−2=4 km east."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "medium",
    "text": "A person walks 3 km north, 4 km east, and 3 km south. Where is the person relative to the starting point?",
    "options": ["4 km east", "4 km west", "3 km north", "At the starting point"],
    "correctIndex": 0,
    "explanation": "The north and south movements cancel, leaving 4 km east."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "medium",
    "text": "Facing south, Priya turns left, then right, then right again. Which direction is she facing?",
    "options": ["North", "South", "East", "West"],
    "correctIndex": 3,
    "explanation": "South→east after a left turn; east→south after a right turn; south→west after another right turn."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "medium",
    "text": "A person walks 8 km north and 6 km east. What is the shortest distance from the starting point?",
    "options": ["10 km", "12 km", "14 km", "2 km"],
    "correctIndex": 0,
    "explanation": "The distance is √(8²+6²)=√100=10 km."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "medium",
    "text": "A man faces east, turns 180 degrees, and then turns 90 degrees clockwise. Which direction does he face?",
    "options": ["North", "South", "East", "West"],
    "correctIndex": 0,
    "explanation": "East becomes west after 180 degrees. Turning 90 degrees clockwise from west points north."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "medium",
    "text": "A woman walks 5 km west, 12 km north, and 5 km east. How far and in which direction is she from her starting point?",
    "options": ["12 km north", "5 km east", "12 km south", "22 km north"],
    "correctIndex": 0,
    "explanation": "The west and east movements cancel, leaving 12 km north."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "hard",
    "text": "A person walks 10 km north, 8 km east, 4 km south, and 2 km west. What is the shortest distance from the starting point?",
    "options": ["6 km", "6√2 km", "10 km", "12 km"],
    "correctIndex": 1,
    "explanation": "Net movement is 6 km north and 6 km east. Distance = √(6²+6²)=6√2 km."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "hard",
    "text": "At sunrise, Aman faces the sun. He turns right and then turns 180 degrees. Which direction is he facing?",
    "options": ["East", "West", "North", "South"],
    "correctIndex": 2,
    "explanation": "At sunrise he faces east. Turning right points south; turning 180 degrees from south points north."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "hard",
    "text": "A person walks 7 km east, 24 km north, and 7 km west. What is the shortest distance from the starting point?",
    "options": ["7 km", "24 km", "25 km", "31 km"],
    "correctIndex": 1,
    "explanation": "The east and west movements cancel, leaving 24 km north."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "hard",
    "text": "A person faces north-west and turns 90 degrees clockwise. Which direction is the person facing?",
    "options": ["North-east", "South-west", "North", "South-east"],
    "correctIndex": 0,
    "explanation": "Turning 90 degrees clockwise from north-west points north-east."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Direction Sense",
    "difficulty": "hard",
    "text": "A person walks 9 km south, 12 km west, and 9 km north. How far is the person from the starting point?",
    "options": ["9 km west", "12 km west", "21 km west", "12 km east"],
    "correctIndex": 1,
    "explanation": "The south and north movements cancel, leaving 12 km west."
  },

  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "easy",
    "text": "Statements: All roses are flowers. All flowers are plants. Conclusions: I. All roses are plants. II. All plants are roses.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 0,
    "explanation": "All roses are flowers and all flowers are plants, so all roses are plants. The reverse is not guaranteed."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "easy",
    "text": "Statements: All cats are animals. Some animals are pets. Conclusions: I. All cats are animals. II. Some cats are pets.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 0,
    "explanation": "Conclusion I is directly stated. The animals that are pets are not necessarily cats."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "easy",
    "text": "Statements: No birds are mammals. All sparrows are birds. Conclusions: I. No sparrows are mammals. II. All sparrows are mammals.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 0,
    "explanation": "Sparrows are birds, and no birds are mammals."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "easy",
    "text": "Statements: All pens are stationery. Some stationery items are expensive. Conclusions: I. All pens are stationery. II. All pens are expensive.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 0,
    "explanation": "Conclusion I is stated directly. The expensive stationery items need not include pens."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "easy",
    "text": "Statements: Some books are novels. All novels are fiction. Conclusions: I. Some books are fiction. II. All books are fiction.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 0,
    "explanation": "The books that are novels must be fiction, but the statement does not cover all books."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "medium",
    "text": "Statements: All A are B. No B are C. Conclusions: I. No A are C. II. No C are A.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 2,
    "explanation": "A is entirely within B, and B does not overlap C. Therefore neither A nor C overlaps the other."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "medium",
    "text": "Statements: Some doctors are writers. All writers are readers. Conclusions: I. Some doctors are readers. II. All doctors are readers.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 0,
    "explanation": "The doctors who are writers must be readers. Nothing establishes that all doctors are readers."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "medium",
    "text": "Statements: No apples are oranges. Some fruits are apples. Conclusions: I. Some fruits are not oranges. II. No fruits are oranges.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 0,
    "explanation": "The fruits that are apples cannot be oranges. Other fruits may still be oranges."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "medium",
    "text": "Statements: All engineers are graduates. Some graduates are artists. Conclusions: I. Some engineers are artists. II. Some artists are graduates.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 1,
    "explanation": "Some artists are graduates follows from the second statement. No overlap between engineers and artists is guaranteed."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "medium",
    "text": "Statements: Some cars are electric. All electric vehicles are quiet. Conclusions: I. Some cars are quiet. II. All cars are quiet.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 0,
    "explanation": "The electric cars must be quiet, but other cars may not be quiet."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "hard",
    "text": "Statements: All A are B. Some B are C. No C are D. Conclusions: I. Some B are not D. II. Some A are C.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 0,
    "explanation": "The B that are C cannot be D, so some B are not D. No overlap between A and C is guaranteed."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "hard",
    "text": "Statements: Some A are B. All B are C. No C are D. Conclusions: I. Some A are C. II. Some A are not D.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 2,
    "explanation": "The A that are B must be C and cannot be D. Both conclusions follow."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "hard",
    "text": "Statements: All P are Q. All R are Q. Some P are S. Conclusions: I. Some S are Q. II. Some R are P.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 0,
    "explanation": "Some P are S and all P are Q, so some S are Q. P and R need not overlap."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "hard",
    "text": "Statements: No A are B. Some C are A. All C are D. Conclusions: I. Some D are not B. II. No D are B.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 0,
    "explanation": "Some C are A, so those C are not B. Since all C are D, some D are not B. Other D may be B."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Syllogisms",
    "difficulty": "hard",
    "text": "Statements: Some M are N. Some N are O. All O are P. Conclusions: I. Some N are P. II. Some M are O.",
    "options": ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    "correctIndex": 0,
    "explanation": "The N that are O must be P. The M that are N need not be the same items as the N that are O."
  },

  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "easy",
    "text": "Five people A, B, C, D, and E sit in a row facing north. A is at the left end, and B sits immediately to the right of A. Who sits second from the left?",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 1,
    "explanation": "A occupies the first seat and B occupies the second seat."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "easy",
    "text": "Four people P, Q, R, and S sit in a row facing north. P sits at the left end, S at the right end, and Q sits immediately to the right of P. Who sits between Q and S?",
    "options": ["P", "Q", "R", "S"],
    "correctIndex": 2,
    "explanation": "The order is P, Q, R, S. R sits between Q and S."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "easy",
    "text": "Three friends A, B, and C sit in a row. B is between A and C. If A sits at the left end, who sits at the right end?",
    "options": ["A", "B", "C", "Cannot be determined"],
    "correctIndex": 2,
    "explanation": "The order is A, B, C."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "easy",
    "text": "Five people sit in a row facing north. R is in the middle seat. What is R's position from the left?",
    "options": ["First", "Second", "Third", "Fourth"],
    "correctIndex": 2,
    "explanation": "The middle seat in a row of five is the third seat."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "easy",
    "text": "Six people sit in a row facing north. X is at the extreme left and Y is at the extreme right. How many people sit between X and Y?",
    "options": ["3", "4", "5", "6"],
    "correctIndex": 1,
    "explanation": "Four seats lie between the two end seats in a row of six."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "medium",
    "text": "Five people A, B, C, D, and E sit in a row facing north. A sits at the left end, B immediately to the right of A, E at the right end, and C immediately to the left of E. Who sits in the middle?",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 3,
    "explanation": "The order is A, B, D, C, E. D occupies the middle seat."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "medium",
    "text": "Six people P, Q, R, S, T, and U sit in a row facing north. P is at the left end, U is at the right end, Q sits immediately to the right of P, and R sits immediately to the right of Q. What is R's position from the left?",
    "options": ["Second", "Third", "Fourth", "Fifth"],
    "correctIndex": 1,
    "explanation": "P is first, Q is second, and R is third."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "medium",
    "text": "Four people A, B, C, and D sit around a circular table facing the center. A sits opposite C. B sits immediately clockwise from A. Who sits opposite B?",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 3,
    "explanation": "With A opposite C and B immediately clockwise from A, D occupies the seat opposite B."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "medium",
    "text": "Five people sit in a row facing north. M sits to the right of O and to the left of N. P sits to the right of N. Which order satisfies the conditions?",
    "options": ["O, M, N, P", "M, O, N, P", "O, N, M, P", "P, N, M, O"],
    "correctIndex": 0,
    "explanation": "The conditions require O before M, M before N, and N before P."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "medium",
    "text": "Seven people sit in a row facing north. A is fourth from the left. B is immediately to the left of A. What is B's position from the left?",
    "options": ["Second", "Third", "Fourth", "Fifth"],
    "correctIndex": 1,
    "explanation": "B sits immediately before A, so B is third from the left."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "hard",
    "text": "Six people A, B, C, D, E, and F sit in a row facing north. A is at the left end, F at the right end, B immediately to the right of A, and C immediately to the left of F. D sits to the left of E, and E sits to the left of C. Who occupies the third seat?",
    "options": ["B", "D", "E", "C"],
    "correctIndex": 1,
    "explanation": "The order is A, B, D, E, C, F. D occupies the third seat."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "hard",
    "text": "Six people P, Q, R, S, T, and U sit around a circular table facing the center. In clockwise order, P is followed by Q, then R, then S, then T, then U. Who sits opposite Q?",
    "options": ["P", "R", "T", "U"],
    "correctIndex": 2,
    "explanation": "In a circle of six, the opposite seat is three places away. T sits opposite Q."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "hard",
    "text": "Five people A, B, C, D, and E sit in a row facing north. B is immediately right of A, C is immediately right of B, E is at the right end, and D sits between C and E. Who occupies the middle seat?",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 2,
    "explanation": "The order is A, B, C, D, E. C occupies the third, middle seat."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "hard",
    "text": "Eight people sit in a row facing north. A is third from the left. B is two seats to the right of A. C is immediately to the left of B. What is C's position from the left?",
    "options": ["Fourth", "Fifth", "Sixth", "Seventh"],
    "correctIndex": 1,
    "explanation": "A is third, B is fifth, and C is immediately to B's left, so C is fourth from the left."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "hard",
    "text": "Six people A, B, C, D, E, and F sit in a row facing north. A is at the left end, F at the right end, B immediately to the right of A, C immediately to the left of F, and D sits between B and E. Which arrangement satisfies all conditions?",
    "options": ["A, B, D, E, C, F", "A, D, B, E, C, F", "A, B, E, D, C, F", "A, B, D, C, E, F"],
    "correctIndex": 0,
    "explanation": "A, B, D, E, C, F satisfies every stated position constraint."
  },
  {
    "topicSlug": "logical-reasoning",
    "subtopic": "Seating Arrangement",
    "difficulty": "hard",
    "text": "Seven people A, B, C, D, E, F, and G sit in a row facing north. D is in the middle, A immediately to the left of D, B immediately to the right of D, F at the left end, and G at the right end. Who occupies the second seat from the right?",
    "options": ["A", "B", "C", "E"],
    "correctIndex": 3,
    "explanation": "The arrangement is F, C, A, D, B, E, G. E is second from the right."
  }
];

const seedLogicalReasoning = async () => {
  await connectDB();
  console.log('Seeding Logical Reasoning questions...');

  // --- Step 1: Remove unneeded topics ---
  const keptSlugs = ['quantitative', 'logical-reasoning'];
  const deletedTopics = await Topic.deleteMany({ slug: { $nin: keptSlugs } });
  console.log(`Deleted ${deletedTopics.deletedCount} unused topics.`);
  
  // Optionally delete questions that no longer belong to valid topics
  const validTopics = await Topic.find({ slug: { $in: keptSlugs } });
  const validTopicIds = validTopics.map(t => t._id);
  const deletedQuestions = await Question.deleteMany({ topicId: { $nin: validTopicIds } });
  console.log(`Deleted ${deletedQuestions.deletedCount} orphaned questions.`);
  // --------------------------------------

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
        category: 'logic',
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
    console.log(`Added Logical Reasoning subtopics: ${Array.from(addedSubtopics).join(', ')}`);
  }
  process.exit();
};

seedLogicalReasoning();
