import { Alert, Button, Form, Modal } from "react-bootstrap";
import { LoginCredetials, login } from "../api/users.api";

import TextInputField from "./form/TextInputField";
import { UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";
import stylesUtil from '../styles/utils.module.css'
import { useForm } from "react-hook-form";
import { useState } from "react";

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void
}

const LoginModal = ({
    onDismiss,
    onLoginSuccessful
}: LoginModalProps) => {
    const [errorText, setErrorText] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<LoginCredetials>()

    async function onSubmit(credentials: LoginCredetials) {
        try {
            const user = await login(credentials)
            onLoginSuccessful(user)
        } catch (error) {
            console.log(error)
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message)
            } else {
                alert(error)
            }
            console.error(error)
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Login
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={stylesUtil.w100}
                    >
                        Signin
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;