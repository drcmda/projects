import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import { Stats } from '@react-three/drei'
import './styles.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <Suspense fallback={<div className="loading">loading</div>}>
    <App />
    <Stats />
  </Suspense>
)
