import { jest } from "@jest/globals";

// Mock the necessary functions from db.ts
jest.unstable_mockModule("../src/db.ts", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.ts");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.ts");

// Type assertions to get Jest mock methods
const mockInsertDB = insertDB as jest.MockedFunction<typeof insertDB>;
const mockGetDB = getDB as jest.MockedFunction<typeof getDB>;
const mockSaveDB = saveDB as jest.MockedFunction<typeof saveDB>;

// Clear the mocks before each test
beforeEach(() => {
  mockInsertDB.mockClear();
  mockGetDB.mockClear();
  mockSaveDB.mockClear();
});

test("newNote inserts data and returns it", async () => {
  const note = { content: "Note", tags: ["hello"] };
  const result = await newNote(note.content, note.tags);
  expect(result.content).toEqual(note.content);
  expect(result.tags).toEqual(note.tags);
});

test("getAllNotes returns all notes", async () => {
  const db = {
    notes: [
      {
        id: "1",
        content: "note1",
        tags: ["tag1"],
      },
      {
        id: "2",
        content: "note2",
      },
      {
        id: "3",
        content: "note3",
      },
    ],
  };
  mockGetDB.mockResolvedValue(db);

  const result = await getAllNotes();
  expect(result).toEqual(db.notes);
});

test("removeNote does nothing if no ID", async () => {
  const db = {
    notes: [
      { id: "1", content: "note1" },
      { id: "2", content: "note2" },
      { id: "3", content: "note3" },
    ],
  };
  mockSaveDB.mockResolvedValue(db);

  const result = await removeNote("4");
  expect(result).toBeUndefined();
});
