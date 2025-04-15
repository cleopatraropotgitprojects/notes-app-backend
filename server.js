const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const notesRouter = require('./routes/notes')
app.use('/api/notes', notesRouter)

// node server.js
// npx prisma studio
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`)
})
