import { Button, Navbar } from "react-bootstrap";

import { User } from "../models/user";
import { logout } from "../api/users.api";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void
}


const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    async function onLogout() {
        try {
            await logout()
            onLogoutSuccessful()
        } catch(error) {
            console.error(error)
            alert(error)
        }
    }


    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={onLogout}>Logout</Button>
        </>
    );
}

export default NavBarLoggedInView;