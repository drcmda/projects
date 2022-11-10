import { Suspense, lazy } from 'react'
import { createRoot } from 'react-dom'
import './styles.css'
import App from './App'

const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel(1103970), Scene: lazy(() => import('./portals/Lesson39')) },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430), Scene: lazy(() => import('./portals/Bubbles')) },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452), Scene: lazy(() => import('./portals/SpringyBoxes')) },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: pexel(327482), Scene: lazy(() => import('./portals/Stage1')) },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(325185), Scene: lazy(() => import('./portals/Lesson39')) },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(358574), Scene: lazy(() => import('./portals/Stage1')) },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(227675), Scene: lazy(() => import('./portals/Stage1')) },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(911738), Scene: lazy(() => import('./portals/Lesson39')) },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1738986), Scene: lazy(() => import('./portals/Stage1')) }
]

createRoot(document.getElementById('root')).render(
  <Suspense fallback={null}>
    <App images={images} />
  </Suspense>
)
