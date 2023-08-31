import { Button, Col, Container, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';

import AddNoteDialog from './components/AddNoteDialog';
import Note from './components/Note';
import { Note as NoteModel } from './models/note';
import { fetchNotes } from './api/notes.api';
import styles from './styles/NotesPage.module.css';
import stylesUtils from './styles/utils.module.css';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)

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

  return (
    <Container>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map(note => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog &&
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(note) => {
            setShowAddNoteDialog(false)
            setNotes([...notes, note])
          }}
        />
      }
    </Container>
  );
}

export default App;
