import Card from 'react-bootstrap/Card';
import { MdDelete } from 'react-icons/md'
import { Note as NoteModel } from '../models/note'
import { formatDate } from '../utils/formatDate';
import styleUtils from '../styles/utils.module.css'
import styles from '../styles/Note.module.css'

interface NoteProps {
    note: NoteModel
    className?: string,
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteClicked: (note: NoteModel) => void
}

const Note = ({ note, className, onDeleteNoteClicked, onNoteClicked }: NoteProps) => {
    const { title, text, createdAt, updatedAt } = note

    let noteDateText: string
    if (updatedAt > createdAt) {
        noteDateText = `Updated ${formatDate(updatedAt)}`
    } else {
        noteDateText = `Created ${formatDate(createdAt)}`
    }

    return (
        <Card
            className={`${styles.noteCard} ${className}`}
            onClick={() => onNoteClicked(note)}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteNoteClicked(note)
                            e.stopPropagation()
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>{text}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {noteDateText}
            </Card.Footer>
        </Card>
    )
}

export default Note