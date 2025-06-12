import type { Actions } from '@sveltejs/kit';
import { MongoClient, ServerApiVersion, type MongoClientOptions } from 'mongodb';
import OpenAI from "openai";
import type { ImageGenerateParams } from 'openai/resources/images.mjs';

const ai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });

interface DexEntry {
    species: string;
    type1: string;
    type2: string;
    habitat: string;
    stats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    };
    height: number;
    weight: number;
    dexEntry: string;
}

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
    Return the data in JSON that can be parsed via JSON.parse(). Return the data in the following JSON format:
    {
        "species": "string",
        "type1": "string",
        "type2": "string",
        "habitat": "string",
        "stats": {
            "hp": "number",
            "attack": "number",
            "defense": "number",
            "special-attack": "number",
            "special-defense": "number",
            "speed": "number"
        },
        "height": "number",
        "weight": "number",
        "dexEntry": "string"
    }
    `;
}

export const actions = {
    generate: async ({ request }) => {
        const data = await request.formData();

        console.log(data);

        const dexJson = await ai.responses.create({
            model: "gpt-4.1",
            input: generatePrompt(data)
        });

        console.log(dexJson.output_text);

        let error = null;
        const sanitizedDexJson = dexJson.output_text.replace(/```json/g, '').replace(/```/g, '');

        try {
            await client.connect();
            const entry = await client.db("fakemon-dex").collection("entries").insertOne(JSON.parse(sanitizedDexJson) as DexEntry);

            console.log(entry);
        } catch (err) {
            error = err;
            console.error(error);
        } finally {
            await client.close();
        }

        const imagePrompt: ImageGenerateParams = {
            model: "dall-e-3",
            prompt: dexJson.output_text,
            n: 1,
            size: "1024x1024",
            response_format: "url",
        }

        console.log(imagePrompt);

        const response = await ai.images.generate(imagePrompt);

        const fakemonImage = response?.data?.[0]?.url;

        return {
            error: error,
            dexEntry: JSON.parse(sanitizedDexJson),
            fakemonImage: fakemonImage
        }
    }
} satisfies Actions;

export async function load() {
    try {
        await client.connect();
        const entries = await client.db("fakemon-dex").collection("entries").find({}).toArray();

        return { entries: serializeNonPOJOs(entries) as Fakemon[] };
    } finally {
        await client.close();
    }
}