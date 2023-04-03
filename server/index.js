const express = require("express")
const app = express()
const server = require('http').createServer(app)
const WebSocket = require('ws')

const wss = new WebSocket.Server({ server: server })

wss.on('connection', function connection(ws) {
  console.log('a new client connected');
  ws.send('welcome new client') 
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
    ws.send('got your message, it was this: ', message)
  })
})


app.get('/', (req, res) => res.send('Hello world!'))


server.listen(3000, () => console.log('LISTENING ON PORT 3000'))