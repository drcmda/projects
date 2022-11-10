import { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Effects, BakeShadows, OrbitControls, OrthographicCamera, Clone, ContactShadows } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import useSpline from '@splinetool/r3f-spline'

extend({ UnrealBloomPass })

function Clock({ ...props }) {
  const { nodes } = useSpline('https://prod.spline.design/txBw1wYb02xG-ZMo/scene.splinecode')
  return (
    <group {...props} dispose={null}>
      <Clone
        object={[nodes.Rectangle, nodes.screen, nodes['button_side 2'], nodes.button_left, nodes.button_right, nodes.border, nodes.clock]}
      />
      <Clone object={[nodes.button, nodes[' sun (light)']]} inject={<meshBasicMaterial color={[0.5, 1, 5]} toneMapped={false} />} />
      <Clone object={[nodes['hour (light)']]} inject={<meshBasicMaterial color={[0.5, 1, 2.3525]} toneMapped={false} />} />
    </group>
  )
}

export default function App() {
  return (
    <Canvas gl={{ antialias: false }} shadows>
      <color attach="background" args={['#e3e3e3']} />
      <hemisphereLight intensity={0.0} color="#eaeaea" position={[0, 1, 0]} />
      <directionalLight castShadow intensity={1} shadow-mapSize={[1024, 1024]} position={[20, 30, 30]}>
        <orthographicCamera attach="shadow-camera" args={[-120, 120, 120, -120, 1, 120]} />
      </directionalLight>
      <Suspense fallback={null}>
        <Clock scale={0.1} />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -17.51, 0]} scale={100}>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial transparent opacity={0.25} />
        </mesh>
        <ContactShadows frames={1} scale={100} blur={3} position={[0, -17.5, 0]} far={20} />
        <Effects disableGamma>
          <unrealBloomPass threshold={1} strength={0.5} radius={0.7} />
        </Effects>
        <BakeShadows />
      </Suspense>
      <OrthographicCamera makeDefault far={1000} near={0.1} position={[-56, 45, 69]} zoom={6} rotation={[-0.58, -0.6, -0.35]} />
      <OrbitControls />
    </Canvas>
  )
}
