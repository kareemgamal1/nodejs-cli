import { Note } from "./types/note.js";

export const logNotes = (notes: Note[]) => {
  if (!notes || notes.length === 0) {
    console.log("No notes found");
  }

  notes.forEach(({ id, content, tags }) => {
    console.log("\n");
    console.log("id: ", id);
    !!tags?.length && console.log("tags: ", tags);
    console.log("content: ", content);
  });
};
