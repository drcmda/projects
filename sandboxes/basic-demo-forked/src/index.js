import ReactDOM from 'react-dom'
import { Suspense } from 'react'
import { Stats } from '@react-three/drei'
import './styles.css'
import App from './App'

ReactDOM.render(
  <>
    <Suspense fallback={null}>
      <App />
    </Suspense>
    <Stats />
  </>,
  document.getElementById('root')
)
