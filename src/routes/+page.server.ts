import type { Actions } from '@sveltejs/kit';
import { MongoClient, ServerApiVersion, type MongoClientOptions } from 'mongodb';
import OpenAI from "openai";
import fs from "node:fs";
import type { ImageGenerateParams } from 'openai/resources/images.mjs';

const ai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });


interface Fakemon {
    name: string;
    type1: string;
    type2: string;
    habitat: string;
    bestStats: string[];
    height: number;
    weight: number;
    dex: string;
    imageUrl: string;
}

const uri = `mongodb+srv://${import.meta.env.VITE_DB_USERNAME}:${import.meta.env.VITE_DB_PASSWORD}@${import.meta.env.VITE_DB_HOST}/?retryWrites=true&w=majority&appName=fakemon-dex`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
} as MongoClientOptions);


const serializeNonPOJOs = (obj: object) => {
    return structuredClone(obj);
}

const generatePrompt = (data: FormData) => {
    return `
    Create a fakemon dex entry with the following data:
    ${JSON.stringify(Object.fromEntries(data.entries()))}
    `;
}

export const actions = {
    generate: async ({ request }) => {
        const data = await request.formData();

        console.log(data);


        const dexEntry = await ai.responses.create({
            model: "gpt-4.1",
            input: generatePrompt(data)
        });

        console.log(dexEntry.output_text);

        // const response = await ai.responses.create({
        //     model: "gpt-4.1-mini",
        //     input: "Generate an image of gray tabby cat hugging an otter with an orange scarf",
        //     tools: [{ type: "image_generation" }],
        // });

        const imagePrompt: ImageGenerateParams = {
            model: "dall-e-3", // Or "dall-e-2"
            prompt: dexEntry.output_text,
            n: 1, // number of images
            size: "1024x1024", // or "512x512", "1792x1024", etc.
            response_format: "url", // or "b64_json" for base64
        }

        console.log(imagePrompt);

        const response = await ai.images.generate(imagePrompt);

        const fakemonImage = response?.data?.[0]?.url;

        // Save the image to a file
        // const fakemonImage = response.output
        //     .filter((output) => output.type === "image_generation_call")
        //     .map((output) => output.result);

        // if (fakemonImage.length > 0) {
        //     const imageBase64 = fakemonImage[0];
        //     fs.writeFileSync("fakemon_image.png", Buffer.from(imageBase64, "base64"));
        // }

        // console.log(fakemonImage);

        return {
            dexEntry: dexEntry.output_text,
            fakemonImage: fakemonImage
        }
    }
} satisfies Actions;

export async function load() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const entries = await client.db("fakemon-dex").collection("entries").find({}).toArray();

        return { entries: serializeNonPOJOs(entries) as Fakemon[] };
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}