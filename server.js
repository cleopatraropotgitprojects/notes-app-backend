const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const notesRouter = require('./routes/notes')
const dashboardRouter = require('./routes/dashboard')

app.use('/api/notes', notesRouter)
app.use('/api/dashboard', dashboardRouter)


const port = 3001
// node server.js
// npx prisma studio
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`)
})
