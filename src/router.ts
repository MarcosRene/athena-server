import path from 'node:path'
import express, { Router } from 'express'
import multer from 'multer'

import authMiddleware from './middlewares/auth'

import UserController from './controllers/User'
import SessionController from './controllers/Session'
import ScheduleController from './controllers/Schedule'

export const app = express()

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

app.route('/hello').get((request, response) => {
  return response.json({ message: 'Learning lab' })
})

app.get('/users', UserController.index)

app.post('/users', UserController.store)

app.get('/users/:id', UserController.show)

app.patch('/users/:id', upload.single('image'), UserController.update)

app.delete('/users/:id', UserController.delete)

app.post('/session', SessionController.store)

// router.use(authMiddleware)

app.get('/schedules', ScheduleController.index)

app.post('/schedules', ScheduleController.store)

app.get('/schedules/:id', ScheduleController.show)

app.put('/schedules/:id', ScheduleController.update)

app.delete('/schedules/:id', ScheduleController.delete)
