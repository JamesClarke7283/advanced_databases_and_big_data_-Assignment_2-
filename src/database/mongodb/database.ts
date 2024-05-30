import { MongoClient } from 'mongodb';
import { join } from "https://deno.land/std@0.131.0/path/mod.ts";

export function connect_mongo_database(password: string): MongoClient {
    const url = 'mongodb://root:'+password+'@localhost:27017/';
    const client = new MongoClient(url);
    return client;
}

export async function get_collection_from_file(collection_name: string): Promise<any> {
    const basePath = "data/collections";
    const filename = `Movies.${collection_name}.json`;
    const filePath = join(basePath, filename);

    try {
        const fileContent = await Deno.readTextFile(filePath);
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading file: ${filePath}`, error);
        throw error;
    }
}

export async function database_exists(client: MongoClient, dbName: string) {
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    return dbs.databases.some(db => db.name === dbName);
}

export async function create_mongo_database(password: string) {
    const client = connect_mongo_database(password);
    if (await database_exists(client, "Movies")) {
        console.log("MongoDB database already populated")
    } else {
    const db = client.db("Movies");

    const collections = ['Artist', 'Country', 'Internet_user', 'Movie', 'Role', 'Score_movie']
    for (const collection of collections) {
        const db_collection = db.collection(collection);
        const collection_content = await get_collection_from_file(collection);
        console.log("MongoDB: Inserting: "+JSON.stringify(collection_content) +" into "+ collection)
        db_collection.insertMany(collection_content);
    }
}
}