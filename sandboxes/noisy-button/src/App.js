import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import './NoiseMaterial'

function NoisyPlane(props) {
  const ref = useRef()
  useFrame((state) => (ref.current.material.time = Math.sin((2 * Math.PI * state.clock.elapsedTime) / 10)))
  return (
    <mesh ref={ref} {...props}>
      <planeGeometry args={[12, 12]} />
      <noiseMaterial />
    </mesh>
  )
}

function Button() {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [pressed, press] = useState(false)
  useCursor(hovered)
  useFrame(() => (ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, pressed ? 0.4 : 1, 0.1)))
  return (
    <group
      ref={ref}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      onPointerDown={() => press(true)}
      onPointerUp={() => press(false)}>
      <NoisyPlane rotation={[-Math.PI / 2, 0, 0]} position={[0, 3, 0]} />
      <NoisyPlane rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.5, 0]} />
      <NoisyPlane rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

export default function App() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [-10, 10, 10] }}>
      <Button />
    </Canvas>
  )
}
