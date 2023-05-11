import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import axios from 'axios'
import App from './App'

const serverUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/'
    : document.location.origin
axios.defaults.baseURL = serverUrl

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
