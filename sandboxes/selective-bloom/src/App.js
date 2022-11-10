import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Selection, Select, EffectComposer, SelectiveBloom } from '@react-three/postprocessing'

function Sphere(props) {
  const [hovered, hover] = useState(null)
  return (
    <Select enabled={hovered}>
      <mesh {...props} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Select>
  )
}

export default function App() {
  return (
    <Canvas gl={{ antialias: false }} orthographic dpr={[1, 2]} camera={{ zoom: 100 }}>
      <color attach="background" args={['#202020']} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Selection>
        <EffectComposer multisampling={0}>
          <SelectiveBloom mipmapBlur radius={0.75} luminanceThreshold={0.2} intensity={2} />
        </EffectComposer>
        <Sphere position={[-1, 0, 0]} />
        <Sphere position={[1, 0, 0]} />
      </Selection>
    </Canvas>
  )
}
