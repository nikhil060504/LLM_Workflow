import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function runGemini(systemPrompt: string, userMessage: string) {
    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
    });

    const prompt = `${systemPrompt}\n\n${userMessage}`;

    // Retry logic for overloaded servers
    const maxRetries = 3;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Gemini API attempt ${attempt}/${maxRetries}...`);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error: any) {
            lastError = error;

            // If server is overloaded (503), wait and retry
            if (error.status === 503 && attempt < maxRetries) {
                const waitTime = attempt * 2000; // 2s, 4s, 6s
                console.log(`Server overloaded, retrying in ${waitTime}ms...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
                continue;
            }

            // For other errors or final attempt, throw
            throw error;
        }
    }

    throw lastError;
}
