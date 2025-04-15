const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

// GET /api/notes
router.get('/', async (req, res) => {
    try {
        const notes = await prisma.note.findMany({
            orderBy: { createdAt: 'desc' }
        })
        res.json(notes)
    } catch (err) {
        console.error('Error fetching notes:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

router.post('/', async (req, res) => {
    try {
        const newNote = await prisma.note.create({
            data: {
                title: '',
                description: '',
                tags: [],
                location: null,
                sharedWithUsersCount: null,
            }
        })
        res.status(201).json(newNote)
    } catch (err) {
        console.error('Error creating note:', err)
        res.status(500).json({ error: 'Could not create note' })
    }
})

module.exports = router
