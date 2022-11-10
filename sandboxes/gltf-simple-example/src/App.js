import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls } from '@react-three/drei'

function Dog(props) {
  const { scene } = useGLTF('/dog.glb')
  return <primitive object={scene} {...props} />
}

function Zoom() {
  useFrame((state, delta) => {
    state.camera.zoom += delta / 100
    state.camera.updateProjectionMatrix()
  })
}

export default function App() {
  return (
    <Canvas camera={{ position: [2.5, 2.5, -2.5], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <Dog position={[-0.1, -0.2, 0]} rotation={[0, Math.PI / 2, 0]} scale={0.2} />
      <Environment preset="city" />
      <OrbitControls minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
      <Zoom />
    </Canvas>
  )
}
