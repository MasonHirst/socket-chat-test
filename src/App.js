import React, { useEffect, useState } from 'react'
import Component from './Component'
import { v4 } from 'uuid'

if (!localStorage.getItem('testSocketToken')) {
  localStorage.setItem('testSocketToken', v4())
}

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
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
    const ws = new WebSocket(serverUrl)

    ws.addEventListener('open', function (event) {
      console.log('connected to ws server ')
      ws.send(
        JSON.stringify({ event_type: 'auth', token: localStorage.getItem('testSocketToken') })
      )
    })

    ws.addEventListener('message', function (event) {
      const body = JSON.parse(event.data)
      console.log('Message from server ', body.message)
      setMessage(body.message)
    })
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
      <Component message={message} />
    </div>
  )
}

export default App
