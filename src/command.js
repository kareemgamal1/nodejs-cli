import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { findNotes, getAllNotes, newNote, removeAllNotes, removeNote } from "./notes.js";
import { start } from "./server.js";
import { logNotes } from "./utils.js";

yargs(hideBin(process.argv))
    .command(
        "new <note>",
        "Create a new note",
        (yargs) => {
            return yargs
                .positional("note", {
                    type: "string",
                    description: "The content of the note to create",
                    default: "anything",
                })
                .option("tags", {
                    alias: "t",
                    type: "string",
                    description: "tags to add to the note",
                });
        },
        async (argv) => {
            const tags = argv.tags ? argv.tags.split(",") : [];
            const note = await newNote(argv.note, tags);
            console.log("Note Added: ", note.content);
        }
    )
    .command(
        "all",
        "get all notes",
        () => { },
        async () => {
            const notes = await getAllNotes();
            logNotes(notes);
        }
    )
    .command(
        "find <filter>",
        "get matching notes",
        (yargs) => {
            return yargs.positional("filter", {
                describe:
                    "The search term to filter notes by, will be applied to note.content",
                type: "string",
            });
        },
        async (argv) => {
            const matches = await findNotes(argv.filter);
            logNotes(matches);
        }
    )
    .command(
        "remove <id>",
        "remove a note by id",
        (yargs) => {
            return yargs.positional("id", {
                type: "number",
                description: "The id of the note you want to remove",
            });
        },
        async (argv) => {
            const argID = argv.id;
            const id = await removeNote(argID)
            id ? console.log("removed note with ID:", id) : console.log(`ID ${argID} not found`)
        }
    )
    .command(
        "web [port]",
        "launch website to see notes",
        (yargs) => {
            return yargs.positional("port", {
                describe: "port to bind on",
                default: 5000,
                type: "number",
            });
        },
        async (argv) => {
            const notes = await getAllNotes()
            start(notes, argv.port)
        }
    )
    .command(
        "clean",
        "remove all notes",
        () => { },
        async () => removeAllNotes()
    )
    .demandCommand(1)
    .parse();
