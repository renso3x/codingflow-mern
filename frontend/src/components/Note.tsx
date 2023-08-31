import Card from 'react-bootstrap/Card';
import { Note as NoteModel } from '../models/note'
import { formatDate } from '../utils/formatDate';
import styles from '../styles/Note.module.css'

interface NoteProps {
    note: NoteModel
    className?: string
}

const Note = ({ note, className }: NoteProps) => {
    const { title, text, createdAt, updatedAt } = note

    let noteDateText: string
    if (updatedAt > createdAt) {
        noteDateText = `Updated ${formatDate(updatedAt)}`
    } else {
        noteDateText = `Created ${formatDate(createdAt)}`
    }

    return (
        <Card className={`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title>{title}</Card.Title>
                <Card.Text className={styles.cardText}>{text}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {noteDateText}
            </Card.Footer>
        </Card>
    )
}

export default Note