import crypto from "node:crypto";
import { getDB, insertDB, saveDB } from "./db.ts";
import { Note } from "./types/note.ts";

export const newNote = async (note: string, tags: string[]) => {
  const newNote = {
    content: note,
    id: crypto.randomUUID(),
    tags,
  };
  await insertDB("notes", newNote);
  return newNote;
};

export const getAllNotes = async (): Promise<Note[]> => {
  const { notes } = await getDB();
  return notes;
};

export const findNotes = async (filter?: string) => {
  const notes = await getAllNotes();

  if (!filter) return notes;

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
  return filteredNotes;
};

export const removeNote = async (id?: string) => {
  if (!id) return;

  const db = await getDB();
  const { notes } = db;
  const match = notes.find((note) => note.id == id);

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ ...db, notes: newNotes });
    return id;
  }
};

export const removeAllNotes = async () => {
  const db = await getDB();

  saveDB({ ...db, notes: [] });
};
