import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, Lightformer, RandomizedLight, Environment, Center, OrbitControls } from '@react-three/drei'
import { Model as Keyboard } from './Keyboard'
import { Accent1 } from './Bg'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [-3.5, 4, 5], fov: 35 }}>
      <ambientLight intensity={1.25} />
      <directionalLight position={[10, 9, -10]} intensity={2} />
      <group position={[0, -0.5, 0]}>
        <Center top rotation={[0.3, 0, 0.3]} position={[0, 0.67, -0.2]}>
          <Keyboard scale={10} rotation={[0.14, 0, 0]} />
        </Center>
        <AccumulativeShadows color="white" temporal frames={100} alphaTest={1} opacity={1.25} scale={35}>
          <RandomizedLight amount={8} radius={4} ambient={0.75} intensity={1} position={[5, 3, -10]} bias={0.001} />
        </AccumulativeShadows>
        <Accent1 position={[0.5, 0, -0.75]} rotation={[0, 1.2, 0]} />
        <Accent1 scale={1.7} position={[2, 0, -1]} rotation={[0, 0, 0]} />
      </group>
      <Environment resolution={256}>
        <color attach="background" args={['black']} />
        <group rotation={[-Math.PI / 2, Math.sin(3.2) * 2, Math.cos(3) * 2]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 10, -15]} scale={10} form="ring" color="white" />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer key={i} form="ring" intensity={2} rotation={[Math.PI / 2, 0, 0]} position={[x, 8, i * 8]} scale={4} />
          ))}
          <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
          <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, -2, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={1} rotation-y={-Math.PI / 2} position={[10, 1, -1]} scale={[50, 2, 1]} />
        </group>
      </Environment>
      <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.95} maxPolarAngle={Math.PI / 2.95} />
    </Canvas>
  )
}
