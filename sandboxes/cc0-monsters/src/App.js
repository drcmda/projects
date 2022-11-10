import { Canvas } from '@react-three/fiber'
import { Float, MeshReflectorMaterial, ContactShadows, OrbitControls, Environment } from '@react-three/drei'
import * as FLYING from './monsters/flying'
import * as STANDING from './monsters/standing'
import * as BLOB from './monsters/blob'

export default function App() {
  const flying = Object.values(FLYING)
  const standing = Object.values(STANDING)
  const blob = Object.values(BLOB)
  return (
    <Canvas camera={{ position: [0, -4, 10], fov: 90 }}>
      <color attach="background" args={['#404060']} />
      <fog attach="fog" args={['#404060', 30, 80]} />
      <ambientLight intensity={0.75} />
      <hemisphereLight intensity={4} color="red" groundColor="blue" />
      <group position={[0, -4.5, 0]}>
        {flying.map((El, index) => {
          const row = Math.floor(index / 6) * 4
          return (
            <Float
              position={[index * 3 - row * 4.5 - 6.5, 4, row - 7]}
              floatIntensity={4 + Math.random() * 20}
              rotationIntensity={2 + Math.random() * 4}
              speed={4}
              key={index}>
              <El />
            </Float>
          )
        })}
        {standing.map((El, index) => {
          const row = Math.floor(index / 6) * 4
          return <El position={[index * 3 - row * 4.5 - 6.5, 0, row - 4.5]} key={index} />
        })}
        {blob.map((El, index) => {
          const row = Math.floor(index / 6) * 4
          return <El scale={0.5} position={[index * 2 - row * 3 - 4.5, 0, row - 2.5]} key={index} />
        })}
        <BLOB.Cat play="Dance" scale={30} position={[0, 0, -40]} />
        <ContactShadows frames={1} scale={20} far={5} blur={2} opacity={1} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.5}
            maxDepthThreshold={1.3}
            color="#020408"
            metalness={0.5}
          />
        </mesh>
      </group>
      <OrbitControls autoRotate autoRotateSpeed={0.15} minPolarAngle={Math.PI / 1.625} maxPolarAngle={Math.PI / 1.625} />
      <Environment preset="city" />
    </Canvas>
  )
}
