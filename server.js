const express = require('express')
const cors = require('cors')
const notesRouter = require('./routes/notes')

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

app.use('/api/notes', notesRouter)

// node server.js
// npx prisma studio
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`)
})
