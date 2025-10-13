import postgres from 'postgres';
import { QuestionBank } from './definitions';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getQuestions(){
    const data = await sql<QuestionBank[]>`SELECT questions, marks, markscheme FROM question_bank`;
    return data;
}