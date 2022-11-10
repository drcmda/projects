import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Float } from '@react-three/drei'
import { useControls } from 'leva'

function Rig() {
  const controls = useThree((state) => state.controls)
  const { azimuth, polar } = useControls({
    azimuth: { value: 0, min: 0, max: Math.PI },
    polar: { value: Math.PI / 2, min: 0, max: Math.PI / 2 }
  })
  useFrame(() => {
    controls?.setAzimuthalAngle(azimuth)
    controls?.setPolarAngle(polar)
  })
  return null
}

function Knot(props) {
  return (
    <mesh {...props}>
      <torusKnotGeometry args={[0.4, 0.05, 256, 24, 1, 3]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 30 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <group position={[0, -0.8, 0]}>
        <Float>
          <Knot position={[0, 1, 0]} />
        </Float>
        <ContactShadows scale={4.5} blur={4} />
      </group>
      <OrbitControls makeDefault enabled={false} />
      <Rig />
    </Canvas>
  )
}
