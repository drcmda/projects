// Source by Marcin Ignac: https://twitter.com/marcinignac/status/1288418586709630976

import * as THREE from 'three'
import React, { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { softShadows, BakeShadows, RoundedBox, Environment, TransformControls, useCursor } from '@react-three/drei'

// Soft shadows are expensive, uncomment and refresh when it's too slow
softShadows()

function Button({ v = new THREE.Vector3(), c = new THREE.Color() }) {
  const material = useRef()
  const [active, setActive] = useState(false)
  const [zoom, set] = useState(true)
  useCursor(active)
  useFrame((state) => {
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, 0.05)
    state.camera.position.lerp(v.set(zoom ? 25 : 10, zoom ? 1 : 5, zoom ? 0 : 10), 0.05)
    state.camera.lookAt(0, 0, 0)
    state.camera.updateProjectionMatrix()
  })
  return (
    <mesh receiveShadow castShadow onClick={() => set(!zoom)} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshStandardMaterial ref={material} color="blue" clearcoat={1} clearcoatRoughness={0} roughness={0} envMapIntensity={2} />
    </mesh>
  )
}

function Plane({ color, ...props }) {
  return (
    <RoundedBox receiveShadow castShadow smoothness={10} radius={0.015} {...props}>
      <meshStandardMaterial color={color} envMapIntensity={0.5} />
    </RoundedBox>
  )
}

export default function App() {
  return (
    <Canvas shadows camera={{ position: [20, 15, 50], fov: 42 }}>
      <color attach="background" args={['#a2b9e7']} />
      <directionalLight position={[0, 8, 5]} castShadow intensity={1} shadow-camera-far={70} />
      <Suspense fallback={null}>
        <group position={[0, -0.9, -3]}>
          <Plane color="hotpink" rotation-x={-Math.PI / 2} position-z={2} scale={[4, 40, 0.2]} />
          <Plane color="#f4ae00" rotation-x={-Math.PI / 2} position-y={1} scale={[4.2, 0.2, 4]} />
          <Plane color="#436fbd" rotation-x={-Math.PI / 2} position={[-1.7, 1, 3.5]} scale={[0.5, 4, 4]} />
          <Plane color="#d7dfff" rotation-x={-Math.PI / 2} position={[0, 4.5, 3]} scale={[2, 0.03, 4]} />
        </group>
        <Button />
        <Environment files="https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/hdris/lebombo/lebombo_1k.hdr" />
        <BakeShadows />
      </Suspense>
    </Canvas>
  )
}
