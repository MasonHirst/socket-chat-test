import React, { useState } from "react";
function App() {
  const [inputValue, setInputValue] = useState('')

  function handleClick() {
    if (inputValue) {

    } else alert('Message cannot be empty')
  }
  
  return (
    <div className="App" style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h1>Test socket</h1>
      <input onChange={() => setInputValue(inputValue)} placeholder="message" />
      <button onClick={handleClick}>Send message</button>
     
    </div>
  );
}

export default App;
