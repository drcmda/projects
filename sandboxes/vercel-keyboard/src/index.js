import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import Logo from './overlay/Logo'
import Menu from './overlay/Menu'
import FooterLeft from './overlay/FooterLeft'
import FooterRight from './overlay/FooterRight'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Logo style={{ position: 'absolute', top: 40, left: 40 }} />
    <Menu style={{ position: 'absolute', top: 40, right: 40 }} />
    <FooterLeft style={{ position: 'absolute', bottom: 40, left: 40 }} />
    <FooterRight style={{ position: 'absolute', bottom: 40, right: 40 }} />
  </>
)
