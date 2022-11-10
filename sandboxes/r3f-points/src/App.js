import { MathUtils } from 'three'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Points, Point, PointMaterial, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

const positions = Array.from({ length: 500 }, (i) => [
  MathUtils.randFloatSpread(10),
  MathUtils.randFloatSpread(10),
  MathUtils.randFloatSpread(10),
])

export default function App() {
  const { range } = useControls({ range: { value: positions.length / 2, min: 0, max: positions.length } })
  return (
    <Canvas raycaster={{ params: { Points: { threshold: 0.175 } } }} dpr={[1, 2]} camera={{ position: [0, 0, 10] }}>
      <Points limit={positions.length} range={range}>
        <PointMaterial transparent vertexColors size={15} sizeAttenuation={false} depthWrite={false} />
        {positions.map((position, i) => (
          <PointEvent key={i} position={position} />
        ))}
      </Points>
      <OrbitControls />
    </Canvas>
  )
}

function PointEvent(props) {
  const [hovered, setHover] = useState(false)
  const [clicked, setClick] = useState(false)
  return (
    <Point
      {...props}
      color={clicked ? 'hotpink' : hovered ? 'white' : 'orange'}
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={(e) => setHover(false)}
      onClick={(e) => (e.stopPropagation(), setClick((state) => !state))}
    />
  )
}
