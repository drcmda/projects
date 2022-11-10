import { render } from 'react-dom'
import { Suspense } from 'react'
import './styles.css'
import App from './App'
import { Leva } from 'leva'

render(
  <Suspense fallback="loading">
    <App />
    <Leva collapsed />
  </Suspense>,
  document.getElementById('root')
)
