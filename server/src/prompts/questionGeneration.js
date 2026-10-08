export const getGenerationPrompt = (topicName, subtopic, difficulty, count) => `
You are an expert aptitude question writer. Generate ${count} unique, high-quality multiple-choice questions for the topic "${topicName}" with a specific focus on "${subtopic}". 
The difficulty should be strictly "${difficulty}".

CRITICAL INSTRUCTIONS:
1. You must provide exactly 4 options for each question.
2. The options must be unique and non-empty.
3. Provide the correctIndex (0, 1, 2, or 3) corresponding to the correct option.
4. Provide a clear, step-by-step explanation of how to solve the problem.
5. Do not include ambiguity or trick questions with multiple valid interpretations.
6. The output MUST be a valid JSON array of objects. Do NOT include markdown fences, just the raw JSON.

Output format:
[
  {
    "text": "Question text here...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Step 1... Step 2... Therefore, Option A is correct."
  }
]
`;

export const getVerificationPrompt = (questionText, options) => `
You are an expert test taker. Solve the following multiple-choice question.

Question: ${questionText}

Options:
0: ${options[0]}
1: ${options[1]}
2: ${options[2]}
3: ${options[3]}

Carefully think step by step. After your reasoning, strictly output ONLY the integer index (0, 1, 2, or 3) of the correct option as a valid JSON object in the following format:
{ "correctIndex": <integer> }
Do not output markdown fences or any other text outside the JSON object.
`;
