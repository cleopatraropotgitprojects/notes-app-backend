const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

// GET /api/notes
router.get('/', async (req, res) => {
    const trashed = req.query.trashed === 'true'
    try {
        const notes = await prisma.note.findMany({
            where: { trashed },
            orderBy: { createdAt: 'desc' },
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
                title: req.body.title || '',
                description: req.body.description || '',
                tags: Array.isArray(req.body.tags) ? req.body.tags : [],
                location: req.body.location || null,
                trashed: false,
            }
        })
        res.status(201).json(newNote)
    } catch (err) {
        console.error('❌ Error creating note:', err)
        res.status(500).json({ error: 'Could not create note' })
    }
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const updatedNote = await prisma.note.update({
            where: { id },
            data: {
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags,
                location: req.body.location,
                pinned: req.body.pinned,
                trashed: req.body.trashed,
            },
        })
        res.json(updatedNote)
    } catch (err) {
        console.error('❌ Error updating note:', err)
        res.status(500).json({ error: 'Could not update note' })
    }
})

router.patch('/:id/trash', async (req, res) => {
    const { id } = req.params
    try {
        const trashedNote = await prisma.note.update({
            where: { id },
            data: { trashed: true },
        })
        res.json(trashedNote)
    } catch (err) {
        console.error('❌ Error trashing note:', err)
        res.status(500).json({ error: 'Could not trash note' })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await prisma.note.delete({ where: { id } })
        res.status(204).end()
    } catch (err) {
        console.error('❌ Error deleting note:', err)
        res.status(500).json({ error: 'Could not delete note' })
    }
})

module.exports = router
