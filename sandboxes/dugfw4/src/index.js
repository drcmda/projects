import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import Overlay from './overlay/Input'
import Timer from './overlay/Timer'
import Logo from './overlay/Logo'
import Menu from './overlay/Menu'
import FooterLeft from './overlay/FooterLeft'
import FooterRight from './overlay/FooterRight'
import { state } from './store'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay
      onPointerOver={() => (state.hovered = true)}
      onPointerOut={() => (state.hovered = false)}
      style={{ position: 'absolute', top: '65%', left: '50%', transform: `translate3d(-50%, -50%, 0)` }}
    />
    <Timer style={{ position: 'absolute', top: '45%', left: '50%', transform: `translate3d(-50%, -50%, 0)`, pointerEvents: 'none' }} />
    <Logo style={{ position: 'absolute', top: '2em', left: '2em', pointerEvents: 'none' }} />
    <Menu style={{ position: 'absolute', top: '2em', right: '2em', pointerEvents: 'none' }} />
    <FooterLeft style={{ position: 'absolute', bottom: '2em', left: '2em', pointerEvents: 'none' }} />
    <FooterRight style={{ position: 'absolute', bottom: '2em', right: '2em', pointerEvents: 'none' }} />
  </>
)
