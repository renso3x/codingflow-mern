import "dotenv/config"

import createHTTPError, { isHttpError } from 'http-errors'
import express, {NextFunction, Request, Response} from 'express'

import MongoStore from "connect-mongo"
import NotesRouter from './routes/notes'
import UserRouter from './routes/users'
import env from './util/validateEnv'
import morgan from 'morgan'
import { requiresAuth } from "./middleware/auth"
import session from 'express-session'

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    })
}))

// ROUTER
app.use('/api/notes', requiresAuth, NotesRouter)
app.use('/api/users', UserRouter)

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