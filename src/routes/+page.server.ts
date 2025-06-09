import type { Actions } from '@sveltejs/kit';
import { MongoClient, ServerApiVersion, type MongoClientOptions } from 'mongodb';

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

export const actions = {
    generate: async ({ request }) => {
        const data = await request.formData();
        
        console.log(data);
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