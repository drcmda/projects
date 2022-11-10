import { Canvas } from '@react-three/fiber'
import { useGLTF, Bounds, AccumulativeShadows, RandomizedLight, OrbitControls } from '@react-three/drei'
import { Subtraction, Brush } from '@react-three/csg'

export default function App() {
  const { nodes } = useGLTF('/bunny-transformed.glb')
  return (
    <Canvas shadows camera={{ position: [2, 1.5, 40], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Bounds fit clip observe margin={1.75}>
        <mesh castShadow receiveShadow>
          <Subtraction useGroups>
            <Subtraction a useGroups>
              <Brush a scale={1.5} position={[0, -1.04, 0]} geometry={nodes.bunny.geometry}>
                <meshNormalMaterial />
              </Brush>
              <Brush b position={[-1, 1, 1]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="orange" />
              </Brush>
            </Subtraction>
            <Brush b position={[0.5, 1, 0.9]}>
              <sphereGeometry args={[0.65, 32, 32]} />
              <meshStandardMaterial color="hotpink" />
            </Brush>
          </Subtraction>
        </mesh>
      </Bounds>
      <AccumulativeShadows
        temporal
        frames={100}
        color="magenta"
        colorBlend={0.25}
        alphaTest={0.85}
        opacity={1}
        scale={12}
        position={[0, -1, 0]}>
        <RandomizedLight amount={8} radius={10} ambient={0.5} intensity={1} position={[5, 8, -10]} bias={0.001} />
      </AccumulativeShadows>
      <OrbitControls makeDefault />
    </Canvas>
  )
}
