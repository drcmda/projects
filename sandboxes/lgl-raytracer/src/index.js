import { render } from 'react-dom'
import { Suspense } from 'react'
import { Leva } from 'leva'
import { Loader } from '@react-three/drei'
import './styles.css'
import App from './App'

render(
  <Suspense fallback={<Loader />}>
    <App />
    <Leva collapsed />
  </Suspense>,
  document.getElementById('root')
)
