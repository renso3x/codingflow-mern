import { Note } from '../models/note'
import { http } from './http'

export async function fetchNotes(): Promise<Note[]> {
    const response = await http(`/api/notes`, { method: 'GET' })
    return response.json()
}

export interface NoteInput {
    title: string,
    text?: string
}

export async function createNote(note: NoteInput) {
    const response = await http('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
    })
    return response.json()
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await http('/api/notes/' + noteId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
    })
    return response.json()
}

export async function deleteNote(noteId: string) {
    await http('/api/notes/' + noteId, { method: 'DELETE'})
}