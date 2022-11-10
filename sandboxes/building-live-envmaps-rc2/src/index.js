import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import { Footer } from '@pmndrs/branding'
import './styles.css'
import { App } from './App'

createRoot(document.getElementById('root')).render(
  <Suspense fallback={null}>
    <App />
    <Overlay />
  </Suspense>
)

function Overlay() {
  return (
    <>
      <Footer
        date="06. March"
        year="2022"
        link1={<a href="https://github.com/pmndrs/drei">pmndrs/drei</a>}
        link2={<a href="https://codesandbox.io/s/building-live-envmaps-lwo219">s/lwo219</a>}
      />
      <div style={{ color: '#808080', position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>neutral —</div>
    </>
  )
}
