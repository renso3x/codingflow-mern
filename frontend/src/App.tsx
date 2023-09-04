import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import { deleteNote, fetchNotes } from './api/notes.api';

import AddEditNoteDialog from './components/AddEditNoteDialog';
import { FaPlus } from 'react-icons/fa'
import Note from './components/Note';
import { Note as NoteModel } from './models/note';
import styles from './styles/NotesPage.module.css';
import stylesUtils from './styles/utils.module.css';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)
  const [notesLoading, setNotesLoading] = useState(true)
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false)
        setNotesLoading(true)
        const response = await fetchNotes()
        setNotes(response)
      } catch (e) {
        console.error(e)
        setShowNotesLoadingError(true)
      } finally {
        setNotesLoading(false)
      }
    }
    loadNotes()
  }, [])

  const handleDeleleteNote = async (note: NoteModel) => {
    try {
      await deleteNote(note._id)
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id))
    } catch (e) {
      console.error(e)
      alert(e)
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
      {notes.map(note => (
        <Col key={note._id}>
          <Note
            note={note}
            className={styles.note}
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClicked={handleDeleleteNote}
          />
        </Col>
      ))}
    </Row>
  )

  return (
    <Container className={styles.notesPage}>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      {notesLoading && <Spinner animation='border' variant='primary' />}
      {showNotesLoadingError && <p>Something went wrong. Please refresh the page.</p>}
      {!notesLoading && !showNotesLoadingError &&
        <>
          {
            notes.length > 0
              ? notesGrid
              : <p> YOu don't have any notes yet.</p>
          }
        </>
      }
      {showAddNoteDialog &&
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(note) => {
            setShowAddNoteDialog(false)
            setNotes([...notes, note])
          }}
        />
      }
      {noteToEdit &&
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updateNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updateNote._id ? updateNote : existingNote)
            )
            setNoteToEdit(null)
          }}
        />
      }
    </Container>
  );
}

export default App;
