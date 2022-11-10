import * as THREE from 'three'
import React from 'react'
import { render, extend, events } from '@react-three/fiber'
import './styles.css'
import App from './App'

extend(THREE)

window.addEventListener('resize', () =>
  render(<App />, document.querySelector('canvas'), {
    events,
    // Shortcut for PCFSoftShadows
    shadows: true,
    // Pixelration, no lower than 1, no higher than 2, prefer 2 if available
    dpr: [1, 2],
    // Set lower bound on regress, this one's set to a low value for a more drastic effect
    // This will optionally get multiplied with pixelratio, buffers, etc when the system is in regress
    // 0.5 would be more subtle, essentially half of the defaults (pixelratio would drop to 1 from 2)
    performance: { min: 0.2 },
    // Render only on demand (when something changes, on movement, etc)
    frameloop: 'demand',
    camera: { position: [0, 0, 30], fov: 50 },
    size: { width: window.innerWidth, height: window.innerHeight },
  }),
)

window.dispatchEvent(new Event('resize'))
