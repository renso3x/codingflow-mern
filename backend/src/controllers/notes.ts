import { NextFunction, Request, RequestHandler, Response } from "express"

import NoteModel from '../models/note'
import { assertIsDefined } from "../util/assertIsDefined"
import createHTTPError from 'http-errors'
import mongoose from 'mongoose'

export const getNotes: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUserId = req.session.userId
    try {
        assertIsDefined(authenticatedUserId)

        const notes = await NoteModel.find({ userId: authenticatedUserId }).exec()

        return res.status(200).json(notes)
    } catch (err) {
        next(err)
    }
}

export const getNote: RequestHandler = async(req, res, next) => {
    const authenticatedUserId = req.session.userId
    const noteId = req.params.id
    try {
        assertIsDefined(authenticatedUserId)

        if(!mongoose.isValidObjectId(noteId)) {
            throw createHTTPError(400, "Invalid note id")
        }

        const note = await NoteModel.findById(noteId).exec()

        if (!note) {
            throw createHTTPError(404, "Note not found")
        }

        if (!note.userId.equals(authenticatedUserId)) {
            throw createHTTPError(401, 'You cannot access this note.')
        }

        return res.status(200).json(note)
    } catch (err) {
        next(err)
    }
}

interface CreateNodeBody {
    title?: string
    text?: string
}

export const createNote: RequestHandler<unknown, unknown, CreateNodeBody, unknown> = async (req, res, next) => {
    const authenticatedUserId = req.session.userId
    const title = req.body.title
    const text = req.body.text

    try {
        assertIsDefined(authenticatedUserId)

        if (!title) {
            throw createHTTPError(400, "Note must have a title")
        }

        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
            title,
            text
        })

        res.status(201).json(newNote)
    } catch (err) {
        next(err)
    }
}

interface UpdateNoteParams {
    id: string
}
interface UpdateNodeBody {
    title?: string
    text?: string
}

export const patchNote: RequestHandler<UpdateNoteParams, undefined, UpdateNodeBody, undefined> = async (req, res, next) => {
    const authenticatedUserId = req.session.userId
    const noteId = req.params.id
    const newTitle = req.body.title
    const newText = req.body.text

    try {
        assertIsDefined(authenticatedUserId)

        if(!mongoose.isValidObjectId(noteId)) {
            throw createHTTPError(400, "Invalid note id")
        }

        if (!newTitle) {
            throw createHTTPError(400, "Note must have a title")
        }

        const note = await NoteModel.findById(noteId).exec()

        if (!note) {
            throw createHTTPError(404, "Note not found")
        }

        if (!note.userId.equals(authenticatedUserId)) {
            throw createHTTPError(401, 'You cannot access this note.')
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote.toObject())
    } catch(error) {
        next(error)
    }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId
    const noteId = req.params.id

    try {
        assertIsDefined(authenticatedUserId)

        if(!mongoose.isValidObjectId(noteId)) {
            throw createHTTPError(400, "Invalid note id")
        }

        const note = await NoteModel.findById(noteId).exec()

        if (!note) {
            throw createHTTPError(404, "Note not found")
        }

        if (!note.userId.equals(authenticatedUserId)) {
            throw createHTTPError(401, 'You cannot access this note.')
        }

        await note.deleteOne()

        res.sendStatus(204)
    } catch(error) {
        next(error)
    }
}