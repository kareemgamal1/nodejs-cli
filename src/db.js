import fs from "node:fs/promises"
import { fileURLToPath } from "node:url"

const DB_URL = new URL("../db.json", import.meta.url)
const DB_PATH = fileURLToPath(DB_URL)

export const getDB = async () => {
    const db = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(db)
}

export const saveDB = async (db) => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
    return db;
}


export const insertDB = async (entriesName, entry) => {
    const db = await getDB();
    db[entriesName].push(entry)
    await saveDB(db);
}