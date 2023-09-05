import { Container } from 'react-bootstrap';
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPagedLoggedOutView from '../components/NotesPageLoggedOutView';
import { User } from '../models/user';
import styles from '../styles/NotesPage.module.css';

interface NotesPageProps {
    loggedInUser: User | null
}

const NotePage = ({ loggedInUser }: NotesPageProps) => {
    return (
        <Container className={styles.notesPage}>
            <>
            {loggedInUser ? <NotesPageLoggedInView /> : <NotesPagedLoggedOutView />}
            </>
        </Container>
    );
}

export default NotePage;