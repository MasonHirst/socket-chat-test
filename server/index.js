// ! IMPORTS
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const path = require('path')

//! Middleware
const join = path.join(__dirname, '..', 'build')
app.use(express.static(join))
app.use(express.json())
app.use(cors())

//! Server listen
const PORT = process.env.PORT || 8080

const { WebSocketServer, WebSocket } = require('ws')
const wss = new WebSocketServer({
  server: app.listen(PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`)
  }),
})
wss.on('listening', () =>
  console.log('SOCKET LISTENING ON PORT: ' + wss.address().port)
)

wss.on('connection', function connection(ws, req) {
  // Extract token from query parameters
  let token = null

  // Check if the URL contains a query parameter named 'token'
  if (req.url.includes('?')) {
    const queryParameters = req.url.split('?')[1]
    const urlParams = new URLSearchParams(queryParameters)
    token = urlParams.get('token')
  }
  // console.log('token: ', token)
  // Attach the token to the WebSocket object
  ws.token = token

  console.log('new client: ')
  ws.on('error', console.error)

  ws.on('message', function message(data, isBinary) {})
  ws.on('pong', () => {
    // console.log('pong')
  })

  ws.on('close', function close() {
    console.log('disconnected')
  })

  setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.ping()
      }
    })
  }, 3000)
})

//! Endpoints
app.post('/api/message', (req, res) => {
  console.log('send message endpoint called')
  const { message } = req.body
  const token = req.headers.authorization
  try {
    // console.log('sending message: ', message)
    wss.clients.forEach(function each(client) {
      if (client.token === token) return console.log('not sending to self')

      if (client.readyState === WebSocket.OPEN) {
        const body = JSON.stringify({ message })
        client.send(body)
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})
