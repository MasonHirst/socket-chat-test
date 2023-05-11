import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import axios from 'axios'
import App from './App'
import { v4 } from 'uuid'

if (!localStorage.getItem('testSocketToken')) {
  localStorage.setItem('testSocketToken', v4())
}


const serverUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/'
    : document.location.origin
axios.defaults.baseURL = serverUrl

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('testSocketToken')
  // Do something before request is sent
  return config
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
