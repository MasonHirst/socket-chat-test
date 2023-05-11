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


const clients = {}

const { WebSocketServer, WebSocket } = require('ws')
const wss = new WebSocketServer({
  server: app.listen(PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`)
  }),
})
wss.on('listening', () => console.log('SOCKET LISTENING ON PORT: ' + wss.address().port))

wss.on('connection', function connection(ws) {
  console.log('new client: ',)
  ws.on('error', console.error)
  
  ws.on('message', function message(data, isBinary) {
    console.log(wss.clients.size)
    const newData = JSON.parse(data)
    
    if (newData.event_type === 'auth') {
      ws.token = newData.token
      clients[newData.token] = ws
    } 
  })
  
  ws.on('close', function close() {
    console.log('disconnected')
    
  })
})


//! Endpoints
app.post('/api/message', (req, res) => {
  const { message } = req.body
  try {
    console.log('sending message: ', message)
    console.log('clients object length: ', Object.values(clients).length)
    Object.values(clients).forEach(function each(client) {
      console.log('client id: ', client.token)
      if (client.readyState === WebSocket.OPEN) {
        const body = JSON.stringify({message})
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
  