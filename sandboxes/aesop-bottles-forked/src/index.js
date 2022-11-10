import React from 'react'
import { render } from 'react-dom'
import { Loader } from '@react-three/drei'
import './styles.css'
import App from './App'

render(
  <React.StrictMode>
    <App />
    <Loader />
  </React.StrictMode>,
  document.getElementById('root')
)
