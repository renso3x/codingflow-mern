import { User } from "../models/user";
import { http } from "./http";

export async function getLoggedInUser(): Promise<User> {
    const response = await http('/api/users', { method: 'GET' })

    return response.json()
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await http('/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export interface LoginCredetials {
    username: string,
    password: string
}

export async function login(credentials: LoginCredetials): Promise<User> {
    const response = await http('/api/users/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export async function logout() {
    await http('/api/users/logout', { method: 'POST' })
}
