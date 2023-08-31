import React, { useEffect, useState } from 'react';

import Note from './components/Note';
import { Note as NoteModel } from './models/note';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  useEffect( () => {
    async function loadNotes() {
      try {
        const response = await fetch(`/api/notes`, { method: 'GET' })
        const notes = await response.json()

        setNotes(notes)
      } catch(error) {
        console.log(error)
      }
    }

    loadNotes()
  }, [])
  console.log(notes)

  return (
    <div className="App">
      {notes.map(note => <Note key={note._id} note={note} />)}
    </div>
  );
}

export default App;
