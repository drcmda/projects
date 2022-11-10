import * as THREE from 'three'
import React, { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, useGLTF } from '@react-three/drei'
import { useRef } from 'react'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, 1.5, 14], fov: 50 }}>
      <fog attach="fog" args={['black', 0, 20]} />
      <pointLight position={[0, 10, -10]} intensity={1} />
      <Suspense
        fallback={
          <Html center className="loader">
            LOADING
          </Html>
        }>
        <Model position={[0, -6, 0]} rotation={[0, -0.2, 0]} />
        <Zoom />
      </Suspense>
    </Canvas>
  )
}

function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/graces-draco.glb')
  useFrame(({ pointer }) => (group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * (Math.PI / 5), 0.005)))
  return (
    <group ref={group} {...props}>
      <mesh castShadow receiveShadow geometry={nodes.Node_3.geometry} rotation={[-Math.PI / 2, 0, 0]} scale={[0.2, 0.224, 0.224]} dispose={null}>
        <meshStandardMaterial roughness={0.9} metalness={0.5} color="#474747" />
      </mesh>
      <Lights />
    </group>
  )
}

function Lights() {
  const groupL = useRef()
  const groupR = useRef()
  const front = useRef()
  useFrame(({ pointer }) => {
    groupL.current.rotation.y = THREE.MathUtils.lerp(groupL.current.rotation.y, -pointer.x * (Math.PI / 2), 0.1)
    groupR.current.rotation.y = THREE.MathUtils.lerp(groupR.current.rotation.y, pointer.x * (Math.PI / 2), 0.1)
    front.current.position.x = THREE.MathUtils.lerp(front.current.position.x, pointer.x * 12, 0.05)
    front.current.position.y = THREE.MathUtils.lerp(front.current.position.y, 7 + pointer.y * 4, 0.05)
  })
  return (
    <>
      <group ref={groupL}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <group ref={groupR}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <spotLight castShadow ref={front} penumbra={0.75} angle={Math.PI / 4} position={[0, 0, 8]} distance={10} intensity={15} shadow-mapSize={[2048, 2048]} />
    </>
  )
}

function Zoom() {
  useFrame((state) => {
    state.camera.position.lerp({ x: 0, y: 0, z: 12 }, 0.005)
    state.camera.lookAt(0, 0, 0)
  })
}
