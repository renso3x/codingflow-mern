import { ConflictError, UnauthorizedError } from "../errors/http_errors"

export async function http(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init)
    if (response.ok) {
        return response
    } else {
        const errorBody = await response.json()
        const errorMessage = errorBody.message
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage)
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage)
        } else {
            throw Error("Response failed with status: " + response.status + " message: " + errorMessage)
        }
    }
}

