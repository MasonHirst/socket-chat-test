import React, { useEffect, useState } from 'react'
import Component from './Component'

function App() {
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null)

  function sendMessage(message) {
    socket.send(JSON.stringify({ message }))
  }

  useEffect(() => {
    function connectClient() {
      let serverUrl
      let scheme = 'ws'
      let location = document.location
      if (location.protocol === 'https:') {
        scheme += 's'
      }
      serverUrl = `${scheme}://${location.hostname}:${location.port}`
      if (process.env.NODE_ENV === 'development') {
        serverUrl = 'ws://localhost:8080'
      }
      const ws = new WebSocket(
        `${serverUrl}?token=${localStorage.getItem('testSocketToken')}`
      )
  
      ws.addEventListener('open', function (event) {
        console.log('connected to ws server ')
        setSocket(ws)
      })
  
      ws.addEventListener('message', function (event) {
        const body = JSON.parse(event.data)
        console.log('Message from server ', body.message)
        setMessage(body.message)
      })
  
      ws.addEventListener('close', function (event) {
        console.log('disconnected from ws server ')
        setTimeout(() => {
          console.log('Reconnecting...')
          connectClient() // try to reconnect after a delay
        }, 1000)
      })  
    }
    connectClient()
  }, [])

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        flexDirection: 'column',
        gap: 15,
        color: 'white',
      }}
    >
      <h1>Test socket</h1>
      <Component message={message} sendMessage={sendMessage} />
    </div>
  )
}

export default App
