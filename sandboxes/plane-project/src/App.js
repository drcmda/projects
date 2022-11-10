import { MathUtils, Vector3, Color } from 'three'
import { useCallback, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Grid, useDrag } from './Grid'

function Cube({ position = [0.5, 0.5, -0.5], c = new Color(), round = Math.round, clamp = MathUtils.clamp, ...props }) {
  const ref = useRef()
  const pos = useRef(new Vector3(...position))
  const onDrag = useCallback(({ x, z }) => pos.current.set(round(clamp(x, -5, 4)) + 0.5, position[1], round(clamp(z, -5, 4)) + 0.5), [])
  const [events, active, hovered] = useDrag(onDrag)
  useEffect(() => void (document.body.style.cursor = active ? 'grabbing' : hovered ? 'grab' : 'auto'), [active, hovered])
  useFrame(() => {
    ref.current.position.lerp(pos.current, 0.1)
    ref.current.material.color.lerp(c.set(active ? 'white' : hovered ? 'lightblue' : 'orange'), 0.1)
  })
  return (
    <mesh ref={ref} castShadow receiveShadow {...events} {...props}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas shadows orthographic dpr={[1, 2]} camera={{ position: [5, 5, 5], zoom: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, -10]} castShadow shadow-mapSize={[1024, 1024]} />
      <Grid scale={10}>
        <Cube position={[0.5, 1, -0.5]} scale={[1, 2, 1]} />
        <Cube position={[2 + 0.5, 0.5, 2 - 0.5]} />
        <Cube position={[-2 + 0.5, 1.5, 2 + 0.5]} scale={[1, 3, 1]} />
      </Grid>
      <OrbitControls makeDefault />
    </Canvas>
  )
}
