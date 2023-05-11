import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Component = ({ message }) => {
  const [inputValue, setInputValue] = useState('')
  
  function handleSubmit(e) {
    e.preventDefault()
    axios.post('api/message', { message: inputValue })
    .then(({data}) => {
      console.log(data)
    })
    .catch(console.error)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
      }}
    >
      <input
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="message"
      />
      <button type="submit">Send message</button>
      <h3>Latest message from the homies: {message}</h3>
    </form>
  )
}

export default Component
