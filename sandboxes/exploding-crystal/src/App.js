import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { MeshReflectorMaterial, Circle, OrbitControls, Environment } from '@react-three/drei'
import Sphere from './Sphere'

function Model(props) {
  return (
    <group {...props}>
      <Sphere />
      <Circle receiveShadow args={[12.75, 36, 36]} rotation-x={-Math.PI / 2} position={[1, 0, 0]}>
        <MeshReflectorMaterial mirror={0} color="#aaa" blur={[400, 50]} mixBlur={3.2} mixContrast={3} metalness={0.8} roughness={0.3} />
      </Circle>
    </group>
  )
}

export default function App() {
  return (
    <Canvas gl={{ alpha: false }} shadows camera={{ position: [0, 0, 20], fov: 15, near: 1, far: 50 }}>
      <color attach="background" args={['#151515']} />
      <fog attach="fog" args={['#151515', 20, 30]} />
      <ambientLight intensity={0.4} />
      <spotLight intensity={10} penumbra={1} angle={0.2} position={[10, 10, 10]} castShadow />
      <Suspense fallback={null}>
        <Model position={[0, -1, 0]} rotation={[-0.4, 0, 0]} />
        <Environment files="adams_place_bridge_1k.hdr" />
      </Suspense>
      <OrbitControls autoRotate enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 3} />
    </Canvas>
  )
}
