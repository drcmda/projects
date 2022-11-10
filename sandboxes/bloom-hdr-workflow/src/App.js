import { useState } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Effects } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import { useControls } from 'leva'

extend({ UnrealBloomPass })

export default function App() {
  const { intensity, radius } = useControls({
    intensity: { value: 1, min: 0, max: 1.5, step: 0.01 },
    radius: { value: 0.4, min: 0, max: 1, step: 0.01 }
  })
  return (
    <Canvas orthographic camera={{ zoom: 100 }}>
      <color attach="background" args={['#111']} />
      <Effects disableGamma>
        {/* threshhold has to be 1, so nothing at all gets bloom by default */}
        <unrealBloomPass threshold={1} strength={intensity} radius={radius} />
      </Effects>
      <Shape color={[4, 0.1, 1]} position={[-2, 0, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
      </Shape>
      <Shape color={[0.5, 1, 4]} position={[0, -0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[1, 1]} />
      </Shape>
      <Shape color={[1, 4, 0.5]} position={[2, 0, 0]}>
        <circleGeometry args={[0.8, 64]} />
      </Shape>
    </Canvas>
  )
}

function Shape({ children, color, ...props }) {
  const [hovered, hover] = useState(true)
  return (
    <mesh {...props} onPointerOver={() => hover(false)} onPointerOut={() => hover(true)}>
      {children}
      {/* Now, in order to get selective bloom we simply crank colors out of
        their natural spectrum. Where colors are normally defined between 0 - 1 we push them
        way out of range, into a higher defintion (HDR). What previously was [1, 1, 1] now could
        for instance be [10, 10, 10]. This requires that toneMapping is off, or it clamps to 1 */}
      <meshBasicMaterial color={hovered ? color : 'white'} toneMapped={false} />
    </mesh>
  )
}
