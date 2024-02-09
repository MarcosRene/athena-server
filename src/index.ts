import 'dotenv/config'
import './lib/dayjs'

import path from 'node:path'
import http from 'node:http'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { router } from './router'

const app = express()
const server = http.createServer(app)

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_USER_PASSWORD}@cluster0.09zwuop.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.use(cors())
    app.use(express.json())
    app.use(router)
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    )

    server.listen(process.env.PORT, () => {
      console.log('Server running no port 3333 🚀')
    })
  })

  .catch(() => {
    console.log('Error connecting to mongodb ⚠️')
  })
