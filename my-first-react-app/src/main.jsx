//in this carpet you will find the code that runs your app. The main.jsx file here serves as the entry point of the application.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Greeting from './Greeting.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Greeting />
  </StrictMode>,
)
