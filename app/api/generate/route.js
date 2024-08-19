import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define the system prompt for the AI
const systemPrompt = `You are a flash-card creator, Your job is to generate concise and effective flashcards based on a given topic or content. Follow these rules:

1. Create concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcards.
3. Ensure each flashcard focuses on a single concept or piece of information.
4. Use simple and clear language to make the flashcards easy to understand.
5. Include a variety of question types such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce knowledge.
8. Tailor the difficulty level of the flashcards to the users' specific preferences.
9. If given a body of text, extract the most important information for the flashcards.
10. Aim to create a balanced set of flashcards that cover the topic completely.
11. Only generate 10 flashcards.

Return in the following JSON format:

{
    "flashcards": [
        {
            "front": str,
            "back": str
        }
    ]
}`;

export async function POST(req) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required in the request body." },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(`${systemPrompt} ${message}`);

        // Attempt to get the text response
        let responseText = await result.response.text();

        // Strip out any code block formatting (backticks)
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '');

        // Try parsing the response as JSON
        let flashcards;
        try {
            flashcards = JSON.parse(responseText);
        } catch (parseError) {
            // If parsing fails, return the raw response or handle it as needed
            console.error("Failed to parse response as JSON:", parseError);
            return NextResponse.json({
                error: "The AI service returned an unexpected format. Please try again.",
                rawResponse: responseText
            }, { status: 500 });
        }

        // Return the flashcards as JSON if the response was parsed successfully
        return NextResponse.json(flashcards.flashcards);

    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
