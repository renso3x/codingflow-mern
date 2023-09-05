import { useEffect, useState } from 'react';

import { Container } from 'react-bootstrap'
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPagedLoggedOutView from './components/NotesPageLoggedOutView';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import { getLoggedInUser } from './api/users.api';
import styles from './styles/NotesPage.module.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await getLoggedInUser()
        setLoggedInUser(user)
      } catch(error) {
        console.error(error)
      }
    }

    fetchLoggedInUser()
  }, [])

  return (
    <div>
      <NavBar
        loginInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? <NotesPageLoggedInView /> : <NotesPagedLoggedOutView />}
        </>
        {
          showSignUpModal &&
            <SignUpModal
              onDismiss={() =>  setShowSignUpModal(false)}
              onSignUpSuccessful={(user) => {
                setLoggedInUser(user)
                setShowSignUpModal(false)
              }}
            />
        }

        { showLoginModal &&
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user)
              setShowLoginModal(false)
            }}
          />
        }
      </Container>
    </div>
  );
}

export default App;
