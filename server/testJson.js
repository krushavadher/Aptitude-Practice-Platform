import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: 'Generate 2 easy multiple choice questions about Math in JSON format.',
      config: { responseMimeType: "application/json" }
    });
    console.log('Success!', response.text);
  } catch (err) {
    console.error('Error:', err.message);
  }
}
test();
