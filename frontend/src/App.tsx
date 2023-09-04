import { Button, Col, Container, Row } from 'react-bootstrap'
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

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetchNotes()
        setNotes(response)
      } catch (e) {
        console.error(e)
        alert(e)
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

  return (
    <Container>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
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
