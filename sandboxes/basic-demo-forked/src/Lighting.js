import * as THREE from 'three'
import { Sky, Environment, BakeShadows } from '@react-three/drei'

function Light({ position, intensity, size }) {
  return (
    <directionalLight
      castShadow
      position={position}
      intensity={intensity}
      shadow-mapSize={size}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
      shadow-bias={-0.00001}
    />
  )
}

export default function Lighting({ sky, ambient = 0.4, environment, main, ao = 4, position, randomize = 1.5 }) {
  return (
    <>
      <fog attach="fog" args={['#f5f5f5', 30, 80]} />
      <color attach="background" args={['#f5f5f5']} />
      <ambientLight intensity={ambient} />
      {main && <Light position={position} intensity={1} size={[2048, 2048]} />}
      {ao &&
        Array.from({ length: ao }, (_, i) => (
          <Light
            key={i}
            position={[
              position[0] + THREE.MathUtils.randFloatSpread(randomize),
              position[1] + THREE.MathUtils.randFloatSpread(randomize),
              position[2] + THREE.MathUtils.randFloatSpread(randomize)
            ]}
            intensity={0.2}
            size={[1024, 1024]}
          />
        ))}
      <BakeShadows key={Date.now()} />
      {environment && environment !== 'none' && <Environment preset={environment} />}
      {sky && <Sky />}
    </>
  )
}
