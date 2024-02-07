import path from 'node:path'
import { Router } from 'express'
import multer from 'multer'

import UserController from './controllers/User'
import SessionController from './controllers/Session'

export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    },
  }),
})

router.get('/users', UserController.index)

router.post('/users', UserController.store)

router.get('/users/:id', UserController.show)

router.patch('/users/:id', upload.single('image'), UserController.update)

router.post('/session', SessionController.store)
