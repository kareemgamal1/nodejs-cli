# 📝 Notes CLI App

A lightweight command-line notes application built with Node.js.  
Supports tagging, searching, deleting, and viewing notes in your browser.

I built this project while following the [Introduction to Node.js Course](https://frontendmasters.com/courses/node-js-v3) by Scott Moss.

> ✍️ **No copy&pasting, code-generation tools or AI assistants were used while building the project** — this is part of my effort to deeply understand Node.js and later move into Express. AI was only used for documenting this README.

---

## 🔧 Improvements I Made

- Expanded the file-based DB structure to allow support for additional entries in the future.
- Designed delete and clear operations to surgically update the JSON DB instead of fully replacing it.
- Tweaked paths and file system behavior to make everything work smoothly on my local Windows 11 setup.

---

## ⚙️ Features

- Create and tag notes directly from the CLI
- Search notes by content
- Remove individual notes or clear all notes
- View all notes in your browser via a local web server

---

## 📦 Commands

```bash
# Add a new note
notes new "Finish reading Atomic Habits" --tags=books,habits

# List all notes
notes all

# Search notes by keyword
notes find "atomic"

# Remove a note by ID
notes remove <id>

# Remove all notes
notes clean

# View notes in browser (default port: 5000)
notes web [port]
```

---

## 🗃️ Data Storage

Notes are currently stored in a local JSON file (`db.json`).  
The file system operations are abstracted using Node's `fs/promises`.

**Example `db.json` content:**

```json
{
  "notes": [
    {
      "id": "uuid-1234",
      "content": "Sample note content",
      "tags": ["example", "demo"]
    }
  ]
}
```

> ⚠️ This system will be replaced with Prisma and a real SQL database (SQLite or PostgreSQL).

---

## 🛠️ Tech Stack

| Tech / Tool           | Purpose                        |
| --------------------- | ------------------------------ |
| Node.js               | Runtime environment            |
| yargs                 | CLI command parsing            |
| node:fs/promises      | Async file operations          |
| node:crypto           | UUID generation                |
| node:http             | Web server to display notes    |
| node: open            | Launches the server in browser |
| TypeScript            | Type safety and tooling        |
| Jest                  | Testing framework              |
| Express _(Planned)_   | Web framework for REST API     |
| Prisma _(Planned)_    | ORM for database integration   |
| Supertest _(Planned)_ | HTTP API testing               |

---

## 🛣️ Upcoming Improvements

- [x] Convert to TypeScript
- [ ] Replace file storage with Prisma + SQLite/PostgreSQL
- [ ] Use Express for HTTP APIs
- [ ] Add HTTPS support
- [ ] Add full unit + integration test coverage
- [ ] Integrate CI for test automation
- [ ] Restructure codebase for better separation of concerns

---

## 📂 Project Structure

```bash
.
├── src/
│   ├── command.js       # CLI command logic
│   ├── db.js            # Async DB helpers using JSON
│   ├── notes.js         # Notes operations (CRUD)
│   ├── server.js        # HTTP server logic
│   ├── template.html    # Web template to render notes
│   └── utils.js         # Utility functions like logging
├── db.json              # Notes data storage (temporary)
├── index.js             # CLI entry point
├── package.json         # Project metadata and dependencies
└── README.md            # This file
```

---

## 🧪 Testing

The project will include testing using Jest and Supertest.

**Test Goals:**

- [x] CLI command unit tests
- [ ] DB layer logic tests
- [ ] Web API tests once Express is added

```bash
# Run tests (once implemented)
pnpm test
```

---

## 🔐 Security (Planned)

- [ ] Input validation for CLI and API routes
- [ ] Escaping note content before rendering to HTML
- [ ] Add HTTPS support using certificates
- [ ] Sanitize tags and content before storage
- [ ] Handle file and DB errors gracefully

---

## 🏃‍♂️ How to Run It

1. **Install pnpm:**

```bash
https://pnpm.io/installation
```

2. **Install dependencies:**

```bash
pnpm i
```

3. **Link the CLI locally:**  
   This creates a global `note` command based on the `bin` field in `package.json`.

```bash
pnpm link -g
```

4. **Use it:**  
   Now you can run commands like:

```bash
note new "remember the milk"
note all
note web
```
