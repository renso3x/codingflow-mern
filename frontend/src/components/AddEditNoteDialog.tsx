import { Button, Form, Modal } from 'react-bootstrap'
import { NoteInput, createNote, updateNote } from '../api/notes.api';

import { Note } from '../models/note';
import { useForm } from 'react-hook-form'

interface AddEditNoteDialogProps {
    onDismiss: () => void
    onNoteSaved: (note: Note) => void
    noteToEdit?: Note | null
}

const AddEditNoteDialog = ({ onDismiss, onNoteSaved, noteToEdit }: AddEditNoteDialogProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || '',
            text: noteToEdit?.text || ''
        }
    })

    async function onSubmit(input: NoteInput) {
        try {

            let noteResponse: Note;
            if (noteToEdit) {
                noteResponse = await updateNote(noteToEdit._id, input)
            } else {
                noteResponse = await createNote(input)
            }
            onNoteSaved(noteResponse)
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit" : "Add"} Note
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register('title', { required: "Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Text" {...register('text')} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    form="addNoteForm"
                    disabled={isSubmitting}
                >Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNoteDialog;