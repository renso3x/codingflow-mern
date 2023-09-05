import * as UserController from '../controllers/users'

import express from "express";

const router = express.Router()

router.get('/', UserController.getAuthenticatedUser)

router.post('/signup', UserController.signUp)

router.post('/signin', UserController.login)

router.post('/logout', UserController.logout)

export default router