import { createRoot } from 'react-dom/client'
import './styles.css'
import Canvas from './Canvas'
import Overlay from './Overlay'

createRoot(document.getElementById('root')).render(
  <>
    <Canvas />
    <Overlay />
  </>
)
