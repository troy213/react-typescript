import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  // Comment React.Strictmode in dev mode because it causing weird issue in react-beautiful-dnd in react 18
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
