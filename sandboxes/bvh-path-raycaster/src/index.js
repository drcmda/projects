import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import './styles.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <Suspense fallback={<div className="loading">loading</div>}>
    <App />
  </Suspense>
)
