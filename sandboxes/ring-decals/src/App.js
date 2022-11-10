import { Canvas } from '@react-three/fiber'
import { Environment, Decal, RenderTexture, Text, AccumulativeShadows, RandomizedLight, PerspectiveCamera, OrbitControls } from '@react-three/drei'

export const App = () => (
  <Canvas shadows camera={{ position: [-10, 10, 15], fov: 25 }}>
    <Ring text="Abba" color="#b09040" position={[-0.5, 0.228, 0]} rotation={[Math.PI / 2, 0.228, -Math.PI / 4]} />
    <Ring text="Aima" color="#b09040" scale={0.92} position={[1, -0.02, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]} />
    <AccumulativeShadows frames={100} color="goldenrod" alphaTest={0.95} colorBlend={0.5} opacity={1} scale={10} position={[0, -0.22, 0]}>
      <RandomizedLight amount={8} radius={7} ambient={0.75} intensity={1} position={[5, 5, -7.5]} bias={0.01} />
    </AccumulativeShadows>
    <directionalLight intensity={20} position={[5, 5, -7.5]} bias={0.01} />
    <OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} autoRotate autoRotateSpeed={-0.075} />
    <Environment preset="apartment" />
  </Canvas>
)

const Ring = ({ text, color, ...props }) => (
  <group {...props}>
    <mesh castShadow scale={[1, 1, 3]}>
      <torusGeometry args={[1, 0.075, 32, 64]} />
      <meshStandardMaterial color={color} metalness={1} roughness={0.2} />
      <Decal position={[0, -0.68, 0]} rotation={0} scale={[1.5, 0.15, 0.53]}>
        <meshStandardMaterial roughness={0} transparent polygonOffset polygonOffsetFactor={-10}>
          <RenderTexture attach="map" anisotropy={16}>
            <PerspectiveCamera makeDefault manual aspect={2.5 / 1} position={[0, 0, 5]} />
            <Text font="/HomemadeApple-Regular.ttf" fontSize={1.75} letterSpacing={-0.05} color="yellow">
              {text}
            </Text>
          </RenderTexture>
        </meshStandardMaterial>
      </Decal>
    </mesh>
  </group>
)
