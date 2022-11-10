import * as THREE from 'three'
import React, { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { a, useSpring } from '@react-spring/three'
import { useHelper, OrbitControls } from '@react-three/drei'

function Lights() {
  const ref = useRef()
  useHelper(ref, THREE.PointLightHelper, 1, 'red')
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={ref} position={[2, 2, 1]} />
    </>
  )
}

export default function Box() {
  const [active, setActive] = useState(0)
  // create a common spring that will be used later to interpolate other values
  const { spring } = useSpring({
    spring: Number(active),
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  })
  // interpolate spring values
  const scale = spring.to([0, 1], [1, 2])
  const rotation = spring.to([0, 1], [0, Math.PI])
  const color = spring.to([0, 1], ['#6246ea', '#e45858'])
  return (
    <Canvas camera={{ position: [0, 5, 6] }}>
      <Lights />
      <a.mesh rotation-y={rotation} scale-x={scale} scale-z={scale} onClick={() => setActive(!active)}>
        <boxBufferGeometry />
        <a.meshStandardMaterial color={color} />
      </a.mesh>
      <OrbitControls />
    </Canvas>
  )
}
