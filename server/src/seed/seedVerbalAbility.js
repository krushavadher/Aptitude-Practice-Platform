import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';
import Topic from '../models/Topic.js';
import connectDB from '../config/db.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const newQuestions = [
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "easy",
    "text": "Choose the correct word to complete the sentence: She ___ to college every day.",
    "options": ["go", "goes", "going", "gone"],
    "correctIndex": 1,
    "explanation": "The singular subject 'she' takes the verb 'goes' in the simple present tense."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "easy",
    "text": "Choose the correct sentence.",
    "options": ["Neither of the answers are correct.", "Neither of the answers is correct.", "Neither answers is correct.", "Neither of answers are correct."],
    "correctIndex": 1,
    "explanation": "'Neither' is treated as singular in standard aptitude-test grammar, so 'is' is appropriate."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "easy",
    "text": "Fill in the blank: I have lived in this city ___ 2020.",
    "options": ["for", "from", "since", "during"],
    "correctIndex": 2,
    "explanation": "'Since' is used with a specific starting point in time, such as 2020."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "easy",
    "text": "Choose the correct article: He is ___ honest man.",
    "options": ["an", "a", "the", "no article"],
    "correctIndex": 0,
    "explanation": "'Honest' begins with a vowel sound because its 'h' is silent, so 'an' is used."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "easy",
    "text": "Fill in the blank: They ___ playing football when it started raining.",
    "options": ["was", "were", "is", "has"],
    "correctIndex": 1,
    "explanation": "'They' takes 'were' in the past continuous tense: were playing."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "medium",
    "text": "Choose the correct sentence.",
    "options": ["Each of the students have a book.", "Each of the student have a book.", "Each of the students has a book.", "Each students has a book."],
    "correctIndex": 2,
    "explanation": "'Each' takes a singular verb, so 'has' is correct. The phrase 'each of the students' is also grammatically correct."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "medium",
    "text": "Complete the sentence: If I ___ you, I would accept the offer.",
    "options": ["am", "were", "was being", "will be"],
    "correctIndex": 1,
    "explanation": "In a hypothetical condition, the standard expression is 'If I were you'."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "medium",
    "text": "Fill in the blank: She is senior ___ me in this organization.",
    "options": ["than", "to", "from", "with"],
    "correctIndex": 1,
    "explanation": "'Senior' is conventionally followed by 'to', not 'than'."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "medium",
    "text": "Complete the sentence: No sooner had the train arrived ___ the passengers rushed in.",
    "options": ["when", "then", "than", "while"],
    "correctIndex": 2,
    "explanation": "The standard paired construction is 'no sooner ... than'."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "medium",
    "text": "Choose the correct verb: The news ___ quite shocking.",
    "options": ["are", "were", "is", "have been"],
    "correctIndex": 2,
    "explanation": "'News' is a singular noun despite ending in 's', so it takes 'is'."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "hard",
    "text": "Complete the sentence: One of the students who ___ selected for the final round has withdrawn.",
    "options": ["was", "were", "is", "has been"],
    "correctIndex": 1,
    "explanation": "'Who' refers to 'students', which is plural. Therefore, 'were selected' is correct."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "hard",
    "text": "Complete the sentence: Neither the teacher nor the students ___ aware of the change.",
    "options": ["was", "is", "were", "has been"],
    "correctIndex": 2,
    "explanation": "With 'neither ... nor', the verb commonly agrees with the nearer subject. 'Students' is plural, so 'were' is correct."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "hard",
    "text": "Complete the sentence: By the time we reached the station, the train ___.",
    "options": ["had left", "has left", "leaves", "will leave"],
    "correctIndex": 0,
    "explanation": "The train's departure happened before another past event. The past perfect 'had left' expresses this."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "hard",
    "text": "Complete the sentence: Scarcely had the meeting begun ___ the lights went out.",
    "options": ["than", "when", "then", "while"],
    "correctIndex": 1,
    "explanation": "The standard construction is 'scarcely ... when'."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Error Spotting & Sentence Correction",
    "difficulty": "hard",
    "text": "Choose the grammatically correct sentence.",
    "options": ["He did not know where was she going.", "He did not knew where she was going.", "He did not know where she was going.", "He did not knew where was she going."],
    "correctIndex": 2,
    "explanation": "After 'did not', use the base verb 'know'. An indirect question uses statement word order: 'where she was going'."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "easy",
    "text": "Choose the synonym of 'Abundant'.",
    "options": ["Scarce", "Plentiful", "Empty", "Limited"],
    "correctIndex": 1,
    "explanation": "'Abundant' means existing in large quantities; 'plentiful' is a synonym."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "easy",
    "text": "Choose the antonym of 'Ancient'.",
    "options": ["Old", "Historic", "Modern", "Traditional"],
    "correctIndex": 2,
    "explanation": "'Ancient' means very old, while 'modern' means relating to the present or recent times."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "easy",
    "text": "Choose the synonym of 'Rapid'.",
    "options": ["Slow", "Quick", "Weak", "Late"],
    "correctIndex": 1,
    "explanation": "'Rapid' means happening or moving quickly."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "easy",
    "text": "Choose the antonym of 'Generous'.",
    "options": ["Kind", "Helpful", "Selfish", "Friendly"],
    "correctIndex": 2,
    "explanation": "'Generous' means willing to give or share; 'selfish' describes someone unwilling to do so."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "easy",
    "text": "Choose the synonym of 'Brief'.",
    "options": ["Lengthy", "Concise", "Complicated", "Detailed"],
    "correctIndex": 1,
    "explanation": "'Brief' means short in duration or length; 'concise' means expressing something in few words."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "medium",
    "text": "Choose the synonym of 'Diligent'.",
    "options": ["Careless", "Hardworking", "Impatient", "Uncertain"],
    "correctIndex": 1,
    "explanation": "'Diligent' means showing care and persistent effort; 'hardworking' is the closest synonym."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "medium",
    "text": "Choose the antonym of 'Obsolete'.",
    "options": ["Outdated", "Unused", "Current", "Ancient"],
    "correctIndex": 2,
    "explanation": "'Obsolete' means no longer in use. 'Current' means belonging to the present."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "medium",
    "text": "Choose the synonym of 'Mitigate'.",
    "options": ["Worsen", "Reduce", "Ignore", "Prevent completely"],
    "correctIndex": 1,
    "explanation": "'Mitigate' means to make something less severe or harmful; 'reduce' is the closest option."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "medium",
    "text": "Choose the antonym of 'Ambiguous'.",
    "options": ["Unclear", "Vague", "Explicit", "Confusing"],
    "correctIndex": 2,
    "explanation": "'Ambiguous' means open to multiple interpretations. 'Explicit' means clear and specific."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "medium",
    "text": "Choose the synonym of 'Prudent'.",
    "options": ["Reckless", "Wise", "Wasteful", "Hasty"],
    "correctIndex": 1,
    "explanation": "'Prudent' means acting with care and good judgment; 'wise' is the closest synonym."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "hard",
    "text": "Choose the synonym of 'Ephemeral'.",
    "options": ["Permanent", "Short-lived", "Frequent", "Ancient"],
    "correctIndex": 1,
    "explanation": "'Ephemeral' means lasting for a very short time."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "hard",
    "text": "Choose the antonym of 'Pragmatic'.",
    "options": ["Practical", "Realistic", "Idealistic", "Sensible"],
    "correctIndex": 2,
    "explanation": "'Pragmatic' emphasizes practical considerations, whereas 'idealistic' emphasizes ideals or principles, sometimes without regard to practical limitations."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "hard",
    "text": "Choose the synonym of 'Ubiquitous'.",
    "options": ["Rare", "Present everywhere", "Temporary", "Hidden"],
    "correctIndex": 1,
    "explanation": "'Ubiquitous' means seeming to be present or found everywhere."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "hard",
    "text": "Choose the antonym of 'Lucid'.",
    "options": ["Clear", "Intelligible", "Coherent", "Obscure"],
    "correctIndex": 3,
    "explanation": "'Lucid' means clear and easy to understand. 'Obscure' means unclear or difficult to understand."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Synonyms & Antonyms",
    "difficulty": "hard",
    "text": "Choose the synonym of 'Sporadic'.",
    "options": ["Continuous", "Regular", "Occasional", "Predictable"],
    "correctIndex": 2,
    "explanation": "'Sporadic' means occurring irregularly or occasionally."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "easy",
    "text": "Read the passage: 'Many students believe that studying for long hours guarantees success. However, research and experience suggest that regular revision, adequate sleep, and focused practice often produce better results than exhausting study sessions.' What is the main idea?",
    "options": ["Students should never study for long hours.", "Effective study habits matter more than simply studying for long hours.", "Sleep is more important than studying.", "Revision is unnecessary if students practice."],
    "correctIndex": 1,
    "explanation": "The passage emphasizes focused practice, revision, and rest rather than relying only on long study hours."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "easy",
    "text": "Read the passage: 'Urban trees provide shade, absorb some air pollutants, and make streets more pleasant. In hot cities, planting trees can also help reduce the urban heat effect.' Which benefit is directly mentioned?",
    "options": ["Trees eliminate all pollution.", "Trees increase road traffic.", "Trees can help cool urban areas.", "Trees remove the need for buildings."],
    "correctIndex": 2,
    "explanation": "The passage explicitly says that planting trees can help reduce the urban heat effect."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "easy",
    "text": "Read the passage: 'Mira began carrying a reusable water bottle to college. After a month, she noticed that she had purchased fewer disposable bottles and saved money as well.' What can be concluded?",
    "options": ["Reusable bottles are always expensive.", "Mira stopped drinking water.", "Small changes can reduce disposable bottle use and save money.", "College students cannot use disposable bottles."],
    "correctIndex": 2,
    "explanation": "Mira's experience illustrates how a simple habit can reduce disposable bottle purchases and save money."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "easy",
    "text": "Read the passage: 'The local library extended its opening hours during examination month. More students began visiting in the evening, especially those who needed a quiet place to study after work.' Why did evening visits increase?",
    "options": ["The library removed its books.", "Students needed a quiet place to study after work.", "Examinations were cancelled.", "The library charged lower fees."],
    "correctIndex": 1,
    "explanation": "The passage directly identifies students' need for a quiet study space after work."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "easy",
    "text": "Read the passage: 'Online courses allow learners to study from different locations and often revisit recorded lessons. However, students still need discipline to complete assignments and stay engaged.' What challenge does the passage identify?",
    "options": ["Online courses never have recorded lessons.", "Students must maintain discipline and engagement.", "Learners cannot study from different locations.", "Assignments are impossible to complete online."],
    "correctIndex": 1,
    "explanation": "The passage identifies self-discipline and engagement as challenges of online learning."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "medium",
    "text": "Read the passage: 'A company introduced flexible working hours to improve employee satisfaction. After six months, employees reported a better work-life balance. Yet managers found that teams needed clearer communication procedures to coordinate across different schedules.' What is the best conclusion?",
    "options": ["Flexible work always reduces productivity.", "Flexible schedules can offer benefits but require effective coordination.", "Employees prefer fixed schedules in every situation.", "Communication becomes unnecessary when hours are flexible."],
    "correctIndex": 1,
    "explanation": "The passage presents both an advantage of flexible work and a coordination challenge."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "medium",
    "text": "Read the passage: 'Some cities have invested in cycling lanes. Where the lanes connect major residential areas with workplaces and transit stations, cycling becomes a more practical option. Isolated lanes, however, may attract fewer regular commuters.' What is the author's main point?",
    "options": ["Cycling is impossible in cities.", "Every isolated cycling lane is dangerous.", "Connected cycling infrastructure is more useful for commuting.", "Public transport should be removed."],
    "correctIndex": 2,
    "explanation": "The passage emphasizes that connected cycling lanes are more practical than isolated ones."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "medium",
    "text": "Read the passage: 'A survey found that people who kept a regular sleep schedule often reported feeling more alert during the day. The survey did not prove that sleep schedules alone caused the improvement, because diet, stress, and exercise could also influence alertness.' What limitation does the passage mention?",
    "options": ["The survey measured no responses.", "Other factors could also affect alertness.", "Sleep has no relationship to alertness.", "All participants had identical diets."],
    "correctIndex": 1,
    "explanation": "The passage cautions that diet, stress, and exercise may also influence alertness, so causation cannot be established from the survey alone."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "medium",
    "text": "Read the passage: 'A small business began selling products through an online store. Its customer base expanded beyond the local area, but the owner also had to learn about shipping, returns, and online customer support.' Which statement best summarizes the passage?",
    "options": ["Online stores guarantee profit.", "Online selling can expand reach while introducing new responsibilities.", "Local shops cannot sell products online.", "Shipping is the only concern for online sellers."],
    "correctIndex": 1,
    "explanation": "The passage describes both the wider customer reach and the additional responsibilities associated with online selling."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "medium",
    "text": "Read the passage: 'An organization replaced lengthy annual training sessions with shorter monthly workshops. Employees appreciated the manageable sessions, and managers could introduce updated procedures more frequently. The organization still needed to evaluate whether the new approach improved long-term performance.' What remains uncertain?",
    "options": ["Whether employees attended any workshop.", "Whether monthly workshops are shorter.", "Whether the new training approach improves long-term performance.", "Whether procedures can ever change."],
    "correctIndex": 2,
    "explanation": "The passage explicitly says long-term performance still needs to be evaluated."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "hard",
    "text": "Read the passage: 'Artificial intelligence can automate repetitive tasks, allowing employees to focus on complex decisions and creative work. Its benefits, however, depend on data quality, careful implementation, and employee training. Organizations that ignore these requirements may automate existing mistakes rather than eliminate them.' Which inference is best supported?",
    "options": ["AI always eliminates human error.", "Automation is beneficial regardless of implementation.", "Successful AI adoption requires more than acquiring technology.", "Employee training prevents every technical failure."],
    "correctIndex": 2,
    "explanation": "The passage emphasizes data quality, implementation, and training as necessary conditions for realizing AI's benefits."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "hard",
    "text": "Read the passage: 'A city introduced a congestion charge for vehicles entering its busiest district. Traffic volume subsequently declined, although researchers noted that improved public transport and changes in fuel prices may also have contributed. The city plans to collect further data before attributing the entire decline to the charge.' Which conclusion is most reasonable?",
    "options": ["The charge had no effect whatsoever.", "The decline proves the charge was the only cause.", "Traffic declined, but the charge's exact contribution is not yet certain.", "Fuel prices never influence traffic."],
    "correctIndex": 2,
    "explanation": "The passage reports a decline but acknowledges other possible causes, so the exact effect of the charge remains uncertain."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "hard",
    "text": "Read the passage: 'A university made several lectures available as recordings. Students valued being able to review difficult material, but some delayed watching the recordings until the end of the term. Faculty members concluded that access to recorded lectures was most useful when combined with a regular study plan.' What is the central argument?",
    "options": ["Recorded lectures should be banned.", "Recorded lectures are useful only for faculty.", "Recorded lectures are more effective when paired with consistent study habits.", "Students should watch all lectures at the end of term."],
    "correctIndex": 2,
    "explanation": "The passage concludes that recordings work best when students follow a regular study plan."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Reading Comprehension",
    "difficulty": "hard",
    "text": "Read the passage: 'Researchers studying a new teaching method found that students performed better on immediate tests than students taught using the traditional method. The researchers cautioned that the study did not measure whether students retained the material months later or whether the results would generalize to other age groups.' Which claim would be unjustified?",
    "options": ["The new method performed better on immediate tests in this study.", "Long-term retention remains untested.", "The method is proven to be superior for every age group and over the long term.", "The researchers identified limitations in their study."],
    "correctIndex": 2,
    "explanation": "The study did not test long-term retention or other age groups, so a universal claim of superiority is unjustified."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "easy",
    "text": "Arrange the sentences into a logical paragraph: A. Finally, submit the form. B. First, open the application website. C. Next, fill in the required details. D. Then, review the information.",
    "options": ["B, C, D, A", "A, B, C, D", "C, B, A, D", "B, D, C, A"],
    "correctIndex": 0,
    "explanation": "The logical sequence follows the process: open the website, fill in details, review them, and submit the form."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "easy",
    "text": "Arrange the sentences into a logical paragraph: A. The seeds began to grow. B. Rina planted seeds in a pot. C. She watered the soil regularly. D. After several days, small green shoots appeared.",
    "options": ["A, B, C, D", "B, C, A, D", "C, B, D, A", "D, A, B, C"],
    "correctIndex": 1,
    "explanation": "Rina first planted the seeds, watered them, the seeds began to grow, and shoots appeared."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "easy",
    "text": "Arrange the sentences into a logical paragraph: A. As a result, the roads became slippery. B. Dark clouds gathered in the sky. C. Soon, heavy rain began to fall. D. Drivers reduced their speed.",
    "options": ["B, C, A, D", "A, D, B, C", "C, B, D, A", "D, A, C, B"],
    "correctIndex": 0,
    "explanation": "Clouds gather first, rain begins, roads become slippery, and drivers respond by slowing down."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "easy",
    "text": "Arrange the sentences into a logical paragraph: A. Finally, the cake was ready to serve. B. She mixed the ingredients in a bowl. C. She poured the mixture into a baking pan. D. She baked the mixture in the oven.",
    "options": ["B, C, D, A", "A, B, C, D", "C, D, B, A", "B, D, A, C"],
    "correctIndex": 0,
    "explanation": "The ingredients are mixed, poured into a pan, baked, and then served."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "easy",
    "text": "Arrange the sentences into a logical paragraph: A. He reached the station. B. He bought a ticket. C. He boarded the train. D. He checked the train schedule at home.",
    "options": ["A, B, D, C", "D, A, B, C", "B, A, C, D", "C, D, A, B"],
    "correctIndex": 1,
    "explanation": "He checks the schedule first, reaches the station, buys a ticket, and boards the train."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "medium",
    "text": "Arrange the sentences into a logical paragraph: A. This helps them identify gaps in their knowledge. B. Students should review their mistakes after a test. C. They can then practice the concepts they misunderstood. D. Consequently, they may perform better on future tests.",
    "options": ["B, A, C, D", "A, B, D, C", "C, D, B, A", "D, C, A, B"],
    "correctIndex": 0,
    "explanation": "Reviewing mistakes helps students identify knowledge gaps, practice weak concepts, and potentially improve future performance."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "medium",
    "text": "Arrange the sentences into a logical paragraph: A. The collected waste is then sorted. B. Many households separate recyclable waste from other rubbish. C. Reusable materials are sent for processing. D. This makes recycling more efficient.",
    "options": ["A, B, D, C", "B, A, C, D", "C, D, B, A", "D, A, C, B"],
    "correctIndex": 1,
    "explanation": "Households separate waste first, it is sorted, reusable materials are processed, and the overall process becomes more efficient."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "medium",
    "text": "Arrange the sentences into a logical paragraph: A. Therefore, the team divided the work among its members. B. The project initially seemed too large for one person. C. Each member focused on a different task. D. The team completed the project before the deadline.",
    "options": ["B, A, C, D", "A, C, B, D", "D, B, C, A", "C, A, D, B"],
    "correctIndex": 0,
    "explanation": "The project seems too large, the team divides the work, members handle separate tasks, and the project is completed."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "medium",
    "text": "Arrange the sentences into a logical paragraph: A. The results were compared with the original measurements. B. The researchers first collected data. C. They analyzed the data using statistical methods. D. The comparison helped them evaluate their hypothesis.",
    "options": ["B, C, A, D", "A, D, B, C", "C, B, D, A", "D, A, C, B"],
    "correctIndex": 0,
    "explanation": "Data is collected, analyzed, compared with the original measurements, and then used to evaluate the hypothesis."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "medium",
    "text": "Arrange the sentences into a logical paragraph: A. However, this convenience can encourage unnecessary purchases. B. Online shopping has made buying products easier. C. Comparing prices and checking needs can help consumers make better decisions. D. A thoughtful approach can reduce impulsive spending.",
    "options": ["B, A, C, D", "A, B, D, C", "C, D, B, A", "D, C, A, B"],
    "correctIndex": 0,
    "explanation": "The paragraph introduces online shopping, describes a possible drawback, and then gives ways to make better decisions."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "hard",
    "text": "Arrange the sentences into a logical paragraph: A. The findings were then reviewed by independent experts. B. The team designed an experiment to test its hypothesis. C. After collecting the results, the team analyzed the data. D. The review helped identify weaknesses before publication.",
    "options": ["B, C, A, D", "C, B, D, A", "A, D, B, C", "D, A, C, B"],
    "correctIndex": 0,
    "explanation": "The experiment is designed first, results are collected and analyzed, experts review the findings, and weaknesses are identified."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "hard",
    "text": "Arrange the sentences into a logical paragraph: A. These patterns can help planners anticipate future demand. B. Cities collect information about transport use. C. Analysts examine the information for recurring patterns. D. Planners can then adjust routes and schedules accordingly.",
    "options": ["B, C, A, D", "A, B, D, C", "C, A, B, D", "D, C, B, A"],
    "correctIndex": 0,
    "explanation": "Transport information is collected, patterns are identified, those patterns help forecast demand, and planners adjust services."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "hard",
    "text": "Arrange the sentences into a logical paragraph: A. As a result, the final report became more reliable. B. The analyst checked the data for missing values and inconsistencies. C. Any problems found were corrected or documented. D. Only then did the analyst draw conclusions from the data.",
    "options": ["B, C, D, A", "A, D, B, C", "C, B, A, D", "D, A, C, B"],
    "correctIndex": 0,
    "explanation": "The analyst checks the data, addresses problems, draws conclusions, and produces a more reliable report."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "hard",
    "text": "Arrange the sentences into a logical paragraph: A. This evidence challenged the original explanation. B. The researchers proposed an explanation for the observations. C. They collected additional evidence to test it. D. They then revised their explanation to account for the new findings.",
    "options": ["B, C, A, D", "C, B, D, A", "A, D, B, C", "D, A, C, B"],
    "correctIndex": 0,
    "explanation": "An explanation is proposed, additional evidence is collected, the evidence challenges the explanation, and the researchers revise it."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Para Jumbles & Sentence Rearrangement",
    "difficulty": "hard",
    "text": "Arrange the sentences into a logical paragraph: A. This comparison revealed which approach was more effective under the tested conditions. B. The researchers divided participants into two groups. C. Each group followed a different learning method. D. Their results were measured using the same assessment.",
    "options": ["B, C, D, A", "A, B, C, D", "C, A, D, B", "D, C, B, A"],
    "correctIndex": 0,
    "explanation": "Participants are divided into groups, each group uses a method, both are assessed consistently, and the results are compared."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "easy",
    "text": "Fill in the blank: The children were ___ to see the magician perform.",
    "options": ["excited", "exciting", "excite", "excitement"],
    "correctIndex": 0,
    "explanation": "'Excited' describes how the children felt. 'Exciting' would describe something that causes excitement."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "easy",
    "text": "Fill in the blank: Please switch ___ the lights before leaving the room.",
    "options": ["in", "off", "over", "through"],
    "correctIndex": 1,
    "explanation": "'Switch off' means to turn off an electrical device or light."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "easy",
    "text": "Fill in the blank: She is interested ___ learning new languages.",
    "options": ["on", "at", "in", "for"],
    "correctIndex": 2,
    "explanation": "The correct expression is 'interested in'."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "easy",
    "text": "Fill in the blank: The bus arrived ___ time, so we did not miss the event.",
    "options": ["at", "on", "by", "in"],
    "correctIndex": 1,
    "explanation": "'On time' means at the scheduled or expected time."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "easy",
    "text": "Fill in the blank: If you work hard, you ___ improve your skills.",
    "options": ["will", "would have", "had", "are"],
    "correctIndex": 0,
    "explanation": "The first conditional uses the present simple in the 'if' clause and 'will' plus the base verb in the main clause."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "medium",
    "text": "Fill in the blank: Despite the heavy rain, the match continued ___ interruption.",
    "options": ["without", "unless", "because", "during of"],
    "correctIndex": 0,
    "explanation": "'Without interruption' means the match continued without being stopped."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "medium",
    "text": "Fill in the blank: The manager asked the employees to submit the report ___ Friday.",
    "options": ["until", "by", "since", "among"],
    "correctIndex": 1,
    "explanation": "'By Friday' specifies a deadline no later than Friday."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "medium",
    "text": "Fill in the blank: The instructions were so ___ that everyone understood what to do.",
    "options": ["vague", "ambiguous", "clear", "confusing"],
    "correctIndex": 2,
    "explanation": "'Clear' fits because the sentence says everyone understood the instructions."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "medium",
    "text": "Fill in the blank: Neither the candidates nor the interviewer ___ available yesterday.",
    "options": ["were", "are", "was", "have been"],
    "correctIndex": 2,
    "explanation": "With 'neither ... nor', the verb generally agrees with the nearer subject. 'Interviewer' is singular, so 'was' is correct."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "medium",
    "text": "Fill in the blank: The new policy aims to ___ unnecessary expenses without reducing service quality.",
    "options": ["increase", "curb", "ignore", "generate"],
    "correctIndex": 1,
    "explanation": "'Curb' means to control or limit. It fits the aim of reducing unnecessary expenses."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "hard",
    "text": "Fill in the blank: Had the team prepared more carefully, it ___ the avoidable errors.",
    "options": ["will prevent", "would have prevented", "would prevent", "had prevented"],
    "correctIndex": 1,
    "explanation": "This is a third conditional describing an unreal past situation: 'Had ... prepared, it would have prevented ...'."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "hard",
    "text": "Fill in the blank: The proposal was rejected not because it was expensive, ___ because its benefits were unclear.",
    "options": ["and", "but", "so", "or"],
    "correctIndex": 1,
    "explanation": "The paired construction is 'not because ..., but because ...', contrasting the actual reason with the incorrect one."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "hard",
    "text": "Fill in the blank: The scientist's conclusion was considered ___ because it was supported by several independent studies.",
    "options": ["credible", "arbitrary", "implausible", "irrelevant"],
    "correctIndex": 0,
    "explanation": "'Credible' means believable or trustworthy, which fits a conclusion supported by independent studies."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "hard",
    "text": "Fill in the blank: The instructions were carefully worded to prevent any ___ in interpretation.",
    "options": ["clarity", "ambiguity", "accuracy", "certainty"],
    "correctIndex": 1,
    "explanation": "'Ambiguity' means the possibility of multiple interpretations. The sentence describes preventing that problem."
  },
  {
    "topicSlug": "verbal-ability",
    "subtopic": "Fill in the Blanks & Cloze Tests",
    "difficulty": "hard",
    "text": "Complete the cloze passage: 'Although the product was initially expensive, demand increased because customers considered it reliable. The company therefore decided to ___ production to meet the growing demand.'",
    "options": ["curtail", "expand", "abandon", "suspend"],
    "correctIndex": 1,
    "explanation": "Growing demand gives the company a reason to expand production. The other options mean reducing or stopping production."
  }
];

const seedVerbalAbility = async () => {
  await connectDB();
  console.log('Seeding Verbal Ability questions...');

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
        category: 'verbal',
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
    console.log(`Added Verbal Ability subtopics: ${Array.from(addedSubtopics).join(', ')}`);
  }
  process.exit();
};

seedVerbalAbility();
