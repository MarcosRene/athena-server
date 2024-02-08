import path from 'node:path'
import { Router } from 'express'
import multer from 'multer'

import UserController from './controllers/User'
import SessionController from './controllers/Session'
import AppointmentController from './controllers/Appointment'

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

router.get('/appointments', AppointmentController.index)

router.post('/appointments', AppointmentController.store)

router.get('/appointments/:id', AppointmentController.show)

router.put('/appointments/:id', AppointmentController.update)

router.delete('/appointments/:id', AppointmentController.destroy)
