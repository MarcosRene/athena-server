import { Router } from 'express'

import UserController from './controllers/User'

export const router = Router()

router.get('/users', UserController.index)
router.post('/users', UserController.store)
router.get('/users/:id', UserController.show)
