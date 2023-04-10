import React, { useState } from 'react'

const Component = ({ socket }) => {
  const [inputValue, setInputValue] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit() {
    if (inputValue) {
      // console.log({inputValue})
      socket.send(inputValue)
    } else alert('Message cannot be empty')
  }

  socket.addEventListener("message", ({data}) => {
    setMessage(data)
    console.log("Message from server: ", data);
  });
  
  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 15,
    }}>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="message"
      />
      <button type='submit'>Send message</button>
      <h3>Latest message from the homies: {message}</h3>
    </form>
  )
}

export default Component
