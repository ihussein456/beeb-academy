import postgres from 'postgres';
import { Question } from './definitions';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getQuestions(){
    const data = await sql<Question[]>`SELECT question, marks, markscheme FROM questions`;
    return data;
}