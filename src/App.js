import React, { useEffect } from 'react'
import Component from './Component'

function App() {
  const socket = new WebSocket('ws://localhost:3005')
  useEffect(() => {
    socket.addEventListener('open', function (event) {
      console.log('connected to ws server ')
    })
  })

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
      <Component socket={socket} />
    </div>
  )
}

export default App
