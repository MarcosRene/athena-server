import 'dotenv/config'

import path from 'node:path'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { app as router } from './router'

const app = express()

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_USER_PASSWORD}@cluster0.09zwuop.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.use(cors())
    app.use(express.json())

    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    )

    app.use(router)

    app.listen(process.env.PORT, () => {
      console.log('Server running no port 3333 🚀')
    })
  })
  .catch(() => {
    console.log('Error connecting to mongodb ⚠️')
  })
