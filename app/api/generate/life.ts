import { NextResponse, NextRequest } from "next/server";
// import Gemini from 'gemini-api'; // Assume this is the correct import for Gemini
import { GoogleGenerativeAI } from "@google/generative-ai";

// const systemPrompt = `You are a highly knowledgeable, empathetic and AI-powered college mentor for both undergraduate and graduate students. Your primary goal is to assist students with any issues, questions, or concerns they may have regarding the college. Provide clear, concise, and helpful responses, ensuring that users feel understood and supported. Always strive to resolve issues efficiently while maintaining a professional and friendly demeanor The question the student is asking is: `;
const systemPrompt = `You are a flash-card creator, Your job is to generate concise and effective flashcards based on a given topic or content. Follow these rules

1. Create and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcards.
3. Ensure each flashcard focuses on a single concept or piece of information.
4. Use simple and clear language to make the flashcards easy to understand.
5. Include a variety of question types such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use anemonics or memory aids to help reinforce knowledge.
8. Tailor the difficulty level of the flashcards to the users' specific preferences.
9. If given a body of text extract the most important information for the flashcards
10. Aim to create a balanced set of flashcards that cover the topic completely.

Remember the goal is facilitate effective learning and retention of information through flashcards.

Return in the following json format.

{
    "flashcards": {
        "front": str,
        "back": str
    }
}
`

export async function POST(req){
try{
  const {role, message} = await req.json()

  if (!message) {
    return NextResponse.json(
      { error: "Message is required in the request body." },
      { status: 400 }
    );
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

  const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

  const result = await model.generateContent(`${systemPrompt} ${message}`)

  const response = await result.response

  const text = response.text()

  console.log(text)

  return new NextResponse(text)
} catch (error) {
  console.error("Error generating content:", error);
  return NextResponse.json({ error: error.message }, { status: 500 });
}
}