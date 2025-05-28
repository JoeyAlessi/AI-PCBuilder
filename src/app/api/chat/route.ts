import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    console.log('Received user message:', message);

    const response = await openai.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable PC building assistant. Help users with PC component selection and building advice."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      stream: false
    });

    const assistantMessage = response.choices[0].message;
    
    if (!assistantMessage || typeof assistantMessage.content !== 'string') {
      throw new Error('Invalid response format from Groq');
    }

    return NextResponse.json({
      content: assistantMessage.content
    });

  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
