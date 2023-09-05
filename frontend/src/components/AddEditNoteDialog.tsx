import { Button, Form, Modal } from 'react-bootstrap'
import { NoteInput, createNote, updateNote } from '../api/notes.api';

import { Note } from '../models/note';
import TextInputField from './form/TextInputField';
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
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        isInvalid={!!errors.title}
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        error={errors.title}
                    />
                    <TextInputField
                        name="text"
                        label="Text"
                        type="textarea"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />
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