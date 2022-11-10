import { createRoot } from 'react-dom/client'
import { Footer } from '@pmndrs/branding'
import './styles.css'
import App from './App'

createRoot(document.querySelector('#root')).render(
  <>
    <App />
    <Footer date="22. June" year="2021" />
  </>
)
