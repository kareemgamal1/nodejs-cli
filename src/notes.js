import { getDB, insertDB, saveDB } from "./db.js"
import crypto from "node:crypto"

export const newNote = async (note, tags) => {
    const newNote = {
        content: note,
        id: crypto.randomUUID(),
        tags
    }
await insertDB("notes", newNote)
    return newNote
}

export const getAllNotes = async () => {
    const { notes } = await getDB();
    return notes
}

export const findNotes = async (filter) => {
    const notes = await getAllNotes();
    const filteredNotes = notes.filter((note) => note.content.toLowerCase().includes(filter.toLowerCase()))
    return filteredNotes
}

export const removeNote = async (id) => {
    const db = await getDB();
    const { notes } = db;
    const match = notes.find(note => note.id == id);

    if (match) {
        const newNotes = notes.filter(note => note.id !== id)
        await saveDB({ ...db, notes: newNotes })
        return id;
    }
}

export const removeAllNotes = async () => {
    const db = await getDB();

    saveDB({ ...db, notes: [] })
}