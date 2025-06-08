import OpenAI from "openai";
const client = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });

const response = await client.responses.create({
    model: "gpt-4.1",
    input: "Write a one-sentence bedtime story about a unicorn."
});

console.log(response.output_text);