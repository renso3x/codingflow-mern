import { Alert, Button, Form, Modal } from "react-bootstrap";
import { SignUpCredentials, signUp } from "../api/users.api";

import { ConflictError } from "../errors/http_errors";
import TextInputField from "./form/TextInputField";
import { User } from "../models/user";
import styleUtils from '../styles/utils.module.css'
import { useForm } from "react-hook-form";
import { useState } from "react";

interface SignUpModalProps {
    onDismiss: () => void
    onSignUpSuccessful: (user: User) => void
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
    const [errorText, setErrorText] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm<SignUpCredentials>()

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newuser = await signUp(credentials)
            onSignUpSuccessful(newuser)
        } catch(error) {
            if (error instanceof ConflictError) {
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
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorText && <Alert variant="danger">{errorText}</Alert>}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required"}}
                        error={errors.username}
                    />
                    <TextInputField
                        name="email"
                        label="Email"
                        type="text"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Required"}}
                        error={errors.email}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="Password"
                        placeholder="password"
                        register={register}
                        registerOptions={{ required: "Required"}}
                        error={errors.password}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.w100}
                    >Sign Up</Button>
                </Form>
            </Modal.Body>

        </Modal>
    );
}

export default SignUpModal;