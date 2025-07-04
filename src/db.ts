import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Note } from "./types/note.js";
import { Database } from "./types/database.js";

const DB_URL = new URL("../db.json", import.meta.url);
const DB_PATH = fileURLToPath(DB_URL);

export const getDB: () => Promise<Database> = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (db: Database) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

export const insertDB = async (entriesName: string, entry: Note) => {
  const db = await getDB();
  db[entriesName as keyof typeof db].push(entry);
  await saveDB(db);
};
