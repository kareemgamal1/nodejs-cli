import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
    insertDB: jest.fn(),
    getDB: jest.fn(),
    saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import('../src/db.js');
const { newNote, getAllNotes, removeNote } = await import('../src/notes.js');

beforeEach(() => {
    insertDB.mockClear();
    getDB.mockClear();
    saveDB.mockClear();
})

test('newNote isnerts data and returns it', async () => {
    const note = {
        content: "Note",
        tags: ['hello']
    }

    const result = await newNote(note.content, note.tags)
    expect(result.content).toEqual(note.content)
    expect(result.tags).toEqual(note.tags)
})

test("getAllNotes returns all notes", async () => {
    const db = {
        notes: ['1', '2', '3']
    }
    getDB.mockResolvedValue(db);

    const result = await getAllNotes();
    expect(result).toEqual(db.notes)
})

test("removeNote does nothing if no ID", async () => {
    const notes = [
        { id: 1, content: "note1" },
        { id: 2, content: "note2" },
        { id: 3, content: "note3" }
    ]
    saveDB.mockResolvedValue(notes);

    const result = await removeNote(4);
    expect(result).toBeUndefined();
})