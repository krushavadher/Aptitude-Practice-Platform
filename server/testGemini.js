import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    console.log('Testing with model:', process.env.GEMINI_MODEL);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-flash-latest',
      contents: 'Hello, world!',
    });
    console.log('Success!', response.text);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
