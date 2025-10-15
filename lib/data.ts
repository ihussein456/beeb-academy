import postgres from 'postgres';
import { QuestionBank } from './definitions';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getQuestions(){
    const data = await sql<QuestionBank[]>`
    SELECT questions, marks, markscheme, subject
    FROM question_bank
    ORDER BY RANDOM()
    LIMIT 1;
  `;
  return data[0]; // return just the single random question
}