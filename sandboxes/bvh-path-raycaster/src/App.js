import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { PathTracer } from './packages/three-gpu-pathtracing/react/PathTracer'

function Rover() {
  const { scene } = useGLTF('https://github.com/gkjohnson/3d-demo-data/raw/main/models/nasa-m2020/Perseverance.glb')
  return <primitive object={scene} />
}

export default function App() {
  return (
    <Canvas camera={{ position: [1.5, 2, 3] }} onCreated={(state) => state.gl.setClearColor('white')}>
      <PathTracer tiles={2} environmentIntensity={4} bounces={3}>
        <Environment preset="city" />
        <group position={[0, -0.5, 0]}>
          <Rover />
          <mesh rotation-x={-Math.PI / 2} scale={1000}>
            <planeGeometry />
            <meshBasicMaterial toneMapped={false} />
          </mesh>
        </group>
      </PathTracer>
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} zoomSpeed={0.4} dampingFactor={0.2} enableDamping />
    </Canvas>
  )
}
