import http from 'node:http'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()

import { router } from './router'

const app = express()
const server = http.createServer(app)

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_USER_PASSWORD}@cluster0.09zwuop.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.use(express.json())
    app.use(router)

    server.listen(process.env.PORT, () => {
      console.log('Server running no port 3333 🚀')
    })
  })

  .catch(() => {
    console.log('Error connecting to mongodb ⚠️')
  })
