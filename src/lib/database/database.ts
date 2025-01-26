import {env} from "$env/dynamic/private";
import {Db, MongoClient} from "mongodb";

const client = new MongoClient(`mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@cluster.xgka4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`);
export let database: Db;

export async function connect() {
    await client.connect();
    database = client.db("wikiguesser");
}
