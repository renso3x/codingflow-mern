import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignedUpClicked: () => void,
    onLoginClicked: () => void
}

const NavBarLoggedOutView = ({
    onSignedUpClicked,
    onLoginClicked,
}: NavBarLoggedOutViewProps) => {
    return (
        <>
            <Button onClick={onSignedUpClicked}>Sign Up</Button>
            <Button onClick={onLoginClicked}>Login</Button>
        </>
    );
}

export default NavBarLoggedOutView;