import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import './styles.css'
import { App } from './App'

createRoot(document.getElementById('root')).render(
  <>
    <Suspense fallback={null}>
      <App />
    </Suspense>
    <div style={{ position: 'absolute', top: 40, left: 40 }}>
      <a href="https://github.com/pmndrs/lamina">turborepo draft #1</a> —
    </div>
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        gap: 35,
        alignItems: 'center',
        padding: 40
      }}>
      <svg style={{ width: 35 }} viewBox="0 0 1155 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="black" />
      </svg>

      <div
        style={{
          position: 'relative',
          flex: 1,
          marginLeft: 35,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 35,
          justifyContent: 'space-between'
        }}>
        <div />
        <div>13/04/2022</div>
      </div>
    </div>
  </>
)
