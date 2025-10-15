import { GoogleGenAI } from "@google/genai";
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});


export async function api(answer: string, question: string, marks: number, markscheme: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are a GCSE Science examiner. Mark the student's answer using the mark scheme.

Question: ${question} [${marks} marks]
Mark Scheme: ${markscheme}
Student Answer: ${answer}

Format your response EXACTLY as shown below with blank lines between sections:

**Total Marks: [X / ${marks}]**

**Examiner Comments:**

Mark 1: [One short sentence - max 15 words]

Mark 2: [One short sentence - max 15 words]

Mark 3: [One short sentence - max 15 words]

(continue for all marks...)

**Mark Scheme:**

• [First mark point]
• [Second mark point]
• [Third mark point]
(list all from mark scheme)`,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });
  return response.text;
}
