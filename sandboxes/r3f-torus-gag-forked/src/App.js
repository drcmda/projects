import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

export default function App() {
  return (
    <Canvas gl={{ localClippingEnabled: true }} camera={{ position: [0, 0, 5], fov: 40, near: 0.1, far: 1000 }}>
      <color attach="background" args={['black']} />
      <ambientLight />
      <pointLight color="white" position={[10, 20, 1]} />
      <Scene />
      <OrbitControls />
    </Canvas>
  )
}
