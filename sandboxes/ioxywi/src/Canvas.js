import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment } from '@react-three/drei'
import { easing } from 'maath'
import { state, useStore } from './store'

export default function App({ position = [0, 0, 2.5], fov = 25 }) {
  return (
    <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
        <Backdrop />
        <Shirt position={[0, 0.06, 0]} />
      </CameraRig>
    </Canvas>
  )
}

function Backdrop() {
  const shadows = useRef()
  useFrame((_, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  const { intro } = useStore()
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}

function Shirt(props) {
  const { color, decal } = useStore()
  const pmndrs = useTexture(`/${decal}.png`)
  const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')
  useFrame((_, delta) => easing.dampC(materials.lambert1.color, color, 0.25, delta))
  return (
    <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} {...props} dispose={null}>
      <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={pmndrs} map-anisotropy={16} />
    </mesh>
  )
}

useGLTF.preload('/shirt_baked_collapsed.glb')
;['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)
