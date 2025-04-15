const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get("/notes", async (req, res) => {
    const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } })
    res.json(notes)
})

app.post("/notes", async (req, res) => {
    const { title, content } = req.body
    console.log("📥 Received note:", { title, content }) // 👈 AICI
    try {
        const note = await prisma.note.create({ data: { title, content } })
        res.json(note)
    } catch (err) {
        console.error("❌ Error creating note:", err)
        res.status(500).json({ error: "Failed to create note" })
    }
})

app.delete("/notes/:id", async (req, res) => {
    const { id } = req.params
    await prisma.note.delete({ where: { id } })
    res.json({ success: true })
})

// node server.js
// npx prisma studio
app.listen(3001, () => console.log("Server running on http://localhost:3001"))
