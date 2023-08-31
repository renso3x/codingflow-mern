import "dotenv/config"

import createHTTPError, { isHttpError } from 'http-errors'
import express, {NextFunction, Request, Response} from 'express'

import NotesRouter from './routes/notes'
import morgan from 'morgan'

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use('/api/notes', NotesRouter)

app.use((req, res, next) => {
    next(createHTTPError(404, "Endpoint not found"))
})

// handle error
app.use((error: unknown, req: Request, res: Response, _next: NextFunction) => {
    console.error(error)
    let errMessage = "An unknown error occured."
    let statusCode = 500

    if(isHttpError(error)) {
        statusCode = error.status
        errMessage = error.message
    }

    res.status(statusCode).json({ message: errMessage })
})

export default app