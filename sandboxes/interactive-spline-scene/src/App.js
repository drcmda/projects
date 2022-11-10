import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrthographicCamera, Clone, Float as FloatImpl } from '@react-three/drei'
import useSpline from '@splinetool/r3f-spline'

export const App = () => (
  <Canvas shadows flat linear>
    <directionalLight castShadow intensity={0.3} position={[-138.33, 294.6, 300]} shadow-mapSize={[512, 512]}>
      <orthographicCamera attach="shadow-camera" args={[-677, 677, 677, -677, -10000, 10000]} />
    </directionalLight>
    <OrthographicCamera makeDefault={true} zoom={0.8} far={100000} near={-100000} position={[0, 0, 1000]} />
    <hemisphereLight intensity={0.75} color="#eaeaea" position={[0, 1, 0]} />
    <Scene position={[0, -50, 0]} />
  </Canvas>
)

function Scene({ ...props }) {
  const hand = useRef()
  const icon = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const { nodes } = useSpline('/insta.splinecode')
  useFrame((state) => {
    icon.current.scale.x = icon.current.scale.y = THREE.MathUtils.lerp(icon.current.scale.x, hovered ? 1.2 : 1, 0.1)
    hand.current.position.lerp(
      { x: 200 + (state.pointer.x * state.viewport.width) / 2, y: -130 + (state.pointer.y * state.viewport.height) / 2, z: 0 },
      0.25,
    )
    hand.current.rotation.x = THREE.MathUtils.lerp(hand.current.rotation.x, clicked && hovered ? -0.5 : 0, 0.1)
    state.camera.position.lerp({ x: -state.pointer.x * 400, y: -state.pointer.y * 200, z: 1000 }, 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return (
    <group {...props} dispose={null}>
      <Float object={nodes['Bg-stuff']} />
      <Float object={nodes['Emoji-4']} />
      <Float object={nodes['Emoji-2']} />
      <Float object={nodes['Emoji-1']} />
      <Float object={nodes['Icon-text-2']} />
      <Float object={nodes['Icon-like']} />
      <Float object={nodes['Icon-star']} />
      <Float object={nodes['Icon-play']} />
      <Float object={nodes['Icon-text-1']} />
      <group>
        <Clone ref={hand} object={nodes['hand-r']} />
      </group>
      <Clone object={nodes['Bubble-BG']} scale={1.25} />
      <FloatImpl floatIntensity={100} rotationIntensity={2} speed={1}>
        <Clone object={nodes['hand-l']} />
        <Clone object={nodes['Bubble-LOGO']} position={[-20, 0, -20]} scale={[1, 1, 0.5]} />
        <Clone
          ref={icon}
          object={nodes['Ins']}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onPointerDown={() => click(true)}
          onPointerUp={() => click(false)}
        />
        <Clone object={nodes['phone']} />
      </FloatImpl>
    </group>
  )
}

const Float = ({ object, ...props }) => (
  <FloatImpl floatIntensity={500} rotationIntensity={1.5} speed={1.5}>
    <Clone object={object} {...props} />
  </FloatImpl>
)
