import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

createRoot(document.querySelector('#root')).render(
  <Suspense fallback={<div className="center">loading</div>}>
    <App />
  </Suspense>,
)
