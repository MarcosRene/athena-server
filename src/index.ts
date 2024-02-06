import http from 'node:http'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const server = http.createServer(app)

app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ message: 'ok' })
})

server.listen(process.env.PORT, () => {
  console.log('Server running no port 3333 🚀')
})
