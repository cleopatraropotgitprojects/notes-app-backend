const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const totalNotes = await prisma.note.count();
        const pinnedNotes = await prisma.note.count({
            where: { pinned: true },
        });
        const deletedNotes = await prisma.note.count({
            where: { trashed: true },
        });

        const notesPerDay = await prisma.note.groupBy({
            by: ['createdAt'],
            _count: { id: true },
        });

        res.json({
            totalNotes,
            pinnedNotes,
            deletedNotes,
            notesPerDay,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching dashboard data' });
    }
});

module.exports = router;
