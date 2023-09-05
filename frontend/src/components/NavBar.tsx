import { Container, Nav, Navbar } from "react-bootstrap";

import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { User } from "../models/user";

interface NavBarProps {
    loginInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({
    loginInUser,
    onSignUpClicked,
    onLoginClicked,
    onLogoutSuccessful
}: NavBarProps) => {

    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand>Cool Notes App</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        {loginInUser ?
                            <NavBarLoggedInView
                                user={loginInUser}
                                onLogoutSuccessful={onLogoutSuccessful}
                            /> :
                            <NavBarLoggedOutView
                                onSignedUpClicked={onSignUpClicked}
                                onLoginClicked={onLoginClicked}
                            />
                        }
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;