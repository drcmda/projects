import * as THREE from 'three'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Sky, Cloud, CameraShake } from '@react-three/drei'
import { Grass } from './Grass'
import { BlobGeometry } from './BlobGeometry'
import { Butterfly } from './Butterfly'
import { Particles } from './Particles'

const rand = Array.from({ length: 15 }, () => ({
  position: [THREE.MathUtils.randFloat(0.5, 0.7), THREE.MathUtils.randFloat(0.5, 0.7), THREE.MathUtils.randFloat(0.5, 0.7)],
  scale: THREE.MathUtils.randFloat(0.5, 1)
}))

export const App = () => (
  <Canvas dpr={1.5} camera={{ position: [1, -1.25, 1] }}>
    <Suspense fallback={null}>
      <Grass>
        <BlobGeometry />
      </Grass>
      {rand.map((e, i) => (
        <Butterfly key={i} {...e} />
      ))}
      <Clouds />
      <Environment preset="sunset" />
      <Particles amount={333} size={0.01} opacity={0.6} />
      <OrbitControls makeDefault autoRotate autoRotateSpeed={1.5} />
      <CameraShake maxRoll={0.2} maxPitch={0.2} maxYaw={0.2} />
      <Sky />
    </Suspense>
  </Canvas>
)

function Clouds() {
  return (
    <group>
      <Cloud depthTest={false} position={[-10, -6, -10]} speed={0.2} opacity={0.4} />
      <Cloud depthTest={false} position={[10, 6, -15]} speed={0.2} opacity={0.25} />
      <Cloud depthTest={false} position={[0, 10, 0]} speed={0.2} opacity={0.2} />
      <Cloud depthTest={false} position={[0, -10, 0]} speed={0.2} opacity={0.2} />
      <Cloud depthTest={false} position={[-10, -6, 15]} speed={0.2} opacity={0.3} />
      <Cloud depthTest={false} position={[10, 6, 10]} speed={0.2} opacity={0.25} />
    </group>
  )
}
