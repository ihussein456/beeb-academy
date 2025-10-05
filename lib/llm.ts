import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function api(answer: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are an exam marker for GCSE Science. 
                Mark the student's answer against the provided markscheme. 
                Award marks fairly and explain your reasoning per mark point.

                Question: Describe the plum pudding model of the atom. [2 marks] 
                Marks: 2 marks Max
                Mark Scheme: a ball of positive charge
                with (negative) electrons
                embedded
                do not accept references to
                protons, nuclei, neutrons
                1
                1 
                Student answer: ${answer}
                Give your response in the following format:
                Total Marks: [Total Marks]
                Examiner comments: [Examiner comments]
                `,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });
  return response.text;
}
