import ReactDOM from 'react-dom'
import { Suspense } from 'react'
import { Logo } from '@pmndrs/branding'
import './styles.css'
import { App } from './App'

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <a href="https://pmnd.rs/" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        pmnd.rs
        <br />
        dev collective
      </a>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>bad —</div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>10/17/2021</div>
    </div>
  )
}

ReactDOM.render(
  <>
    <Suspense fallback={null}>
      <App />
    </Suspense>
    <Overlay />
    <Logo style={{ position: 'absolute', bottom: 40, left: 40, width: 30 }} />
  </>,
  document.getElementById('root')
)
