// Images by https://twitter.com/u29dc, https://www.instagram.com/u29dc

import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, useTexture } from '@react-three/drei'
import { easing } from 'maath'

function Image({ url, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const texture = useTexture(url)

  useFrame((state, delta) => {
    easing.damp(ref.current.material, 'distort', hovered ? 0.5 : 0, 0.25, delta)
    easing.damp(ref.current.material, 'speed', hovered ? 4 : 0, 0.25, delta)
    easing.dampE(ref.current.rotation, clicked ? [0, 0, Math.PI / 2] : [0, 0, 0], 0.25, delta)
    easing.damp3(ref.current.scale, clicked ? 15 : 10, 0.25, delta)
    easing.dampC(ref.current.material.color, clicked ? '#ef2060' : 'white', 0.25, delta)
  })

  return (
    <mesh
      ref={ref}
      onClick={(e) => (e.stopPropagation(), click(!clicked))}
      onPointerOver={(e) => (e.stopPropagation(), hover(true))}
      onPointerOut={(e) => (e.stopPropagation(), hover(false))}
      {...props}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <MeshDistortMaterial map={texture} speed={4} toneMapped={false} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 12] }}>
      <ambientLight intensity={1} />
      <Image url="/306193054_486681529675214_5757132203495923409_n.jpg" position={[-4, -2, -2]} />
      <Image url="/304992042_3196422820580994_4185592086010769559_n.jpg" position={[4, 2, 0]} />
    </Canvas>
  )
}
