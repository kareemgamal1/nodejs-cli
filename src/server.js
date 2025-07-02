import fs from "node:fs/promises"
import http from "node:http"
import open from "open"

export const interpolate = (html, data) => {
    return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
        return data[placeholder] ?? ""
    })
}

export const formatNotes = (notes) => {
    return notes.map((note) => {
        return `
        <div>
        <p>${note.content}</p>
        <div className="tags">
        ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        </div>`
    }).join('')
}

export const createServer = notes => {
    return http.createServer(async (req, res) => {
        const HTML_PATH = new URL('./template.html', import.meta.url)
        const template = await fs.readFile(HTML_PATH, 'utf-8')
        const html = interpolate(template, { notes: formatNotes(notes) })

        res.writeHead(200, { "content-type": "text/html" })
        res.end(html)
    })
}

export const start = (notes, port) => {
    const server = createServer(notes);
    server.listen(port, () => {
        const address = `http://localhost:${port}`
        console.log(`server on ${address}`)
        open(address)
    })
}