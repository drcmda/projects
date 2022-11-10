import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Preload } from '@react-three/drei'
import { Hall } from './models/Hall'
import { Darth } from './models/Darth'
import { Jedi } from './models/Jedi'
import { Probe } from './models/Probe'
import { Effects } from './Effects'

export default function App() {
  return (
    <Canvas dpr={1.5} gl={{ logarithmicDepthBuffer: true, antialias: false, stencil: false, depth: false }} camera={{ position: [0.01, 0, 0], fov: 80 }}>
      <ambientLight intensity={0.6} />
      <spotLight
        angle={0.12}
        penumbra={0.1}
        position={[10, 0, -10]}
        intensity={40}
        onUpdate={(self) => {
          self.target.position.set(-10, 0, 0)
          self.target.updateMatrixWorld()
        }}
      />
      <Hall position={[0, 0.03, 0]} />
      <Darth position={[-3, -0.39, 0.2]} rotation={[0, 2, 0]} scale={0.006} />
      <Float>
        <Probe position={[-1.75, 0.25, -0.85]} scale={0.025} rotation={[0, Math.PI / 2, 0]} />
      </Float>
      <Jedi position={[5, -0.37, -0.5]} rotation={[0, -1.75, 0]} scale={0.016} />
      <Effects />
      <Rig from={-Math.PI / 2} to={Math.PI / 2.66} />
      <Preload all />
    </Canvas>
  )
}

function Rig({
  from = -Math.PI / 2,
  to = Math.PI / 2,
  sqfn = (t, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) => (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}) {
  const controls = useRef()
  const [active, setActive] = useState(false)
  useFrame((state) => {
    const t = (1 + sqfn(state.clock.getElapsedTime() / 2)) / 2
    const x = t * (Math.abs(from) + Math.abs(to))
    if (!active) controls.current.setAzimuthalAngle(to - x)
  })
  return <OrbitControls ref={controls} onStart={() => setActive(true)} onEnd={() => setActive(false)} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
}
