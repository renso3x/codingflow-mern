import { createNote, deleteNote, getNote, getNotes, patchNote } from "../controllers/notes";

import express from 'express'

const router = express.Router()

router.get('/', getNotes)

router.post('/', createNote)

router.get('/:id', getNote)

router.patch('/:id', patchNote)

router.delete('/:id', deleteNote)

export default router
