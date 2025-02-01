import { taskTools } from "@/ai/tools";
import systemMessage from "@/constants/system-message";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export const POST = async (req: Request) => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not configured');
        }

        const { messages } = await req.json()

        const response = streamText({
            model: openai("gpt-4o-mini"),
            system: systemMessage,
            messages: messages,
            tools: taskTools,
            maxSteps: 5,
            toolChoice: "auto",
            temperature: 0.3,
        })
        return response.toDataStreamResponse()
    } catch (error: any) {
        console.error('API Route Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
