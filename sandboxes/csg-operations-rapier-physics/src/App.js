import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Environment, Float } from '@react-three/drei'
import { Subtraction, Brush } from '@react-three/csg'
import { Physics, Debug, RigidBody, CuboidCollider } from '@react-three/rapier'
import { LayerMaterial, Depth } from 'lamina'
import { useControls } from 'leva'
import { BoxBlendGeometry, HeartGeometry } from './geometries'

export function App() {
  const { debug } = useControls({ debug: false })
  return (
    <Canvas shadows orthographic camera={{ position: [0, 1.5, 10], zoom: 180 }}>
      <hemisphereLight intensity={0.4} groundColor="white" />
      <directionalLight position={[10, -15, -10]} intensity={0.5} />
      <spotLight position={[5, 10, -15]} intensity={1} angle={0.1} penumbra={1} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.000001} />
      <Physics colliders={false}>
        {debug && <Debug />}
        <RigidBody type="dynamic" colliders="hull">
          <WhiteShape position={[-1, 15, 2.5]} />
        </RigidBody>
        <RigidBody position={[0, -3, 0]} type="fixed" colliders="false">
          <CuboidCollider friction={2} restitution={0.5} args={[100, 2, 100]} />
        </RigidBody>
      </Physics>
      <Float rotationIntensity={0} speed={3} rotation={[0, -Math.PI / 2, 0]}>
        <WhiteShape />
        <BlueShape />
      </Float>
      <OrbitControls />
      <ContactShadows resolution={1024} scale={20} position={[0, -1.02, 0]} blur={0.75} opacity={0.5} far={1.05} color="#1A5AaF" />
      <Environment preset="warehouse" />
    </Canvas>
  )
}

function BlueShape(props) {
  const heart = useRef()
  const { pause } = useControls({ pause: false })
  useFrame((state, delta) => {
    heart.current.scale.setScalar(0.5 + (1 + Math.sin(state.clock.getElapsedTime()) / 2))
    heart.current.rotation.x += 0.025
    if (!pause) heart.current.needsUpdate = true
  })
  return (
    <mesh castShadow receiveShadow {...props}>
      <Subtraction>
        <Subtraction a>
          <Brush a rotation={[0, Math.PI / 2, 0]} position={[-0.35, 0.4, 0.4]}>
            <BoxBlendGeometry depth={0.75} />
          </Brush>
          <Brush b ref={heart} position={[-0.35, 0.8, 0.8]}>
            <HeartGeometry radius={0.5} depth={3} />
          </Brush>
        </Subtraction>
        <Brush b rotation={[0, 0, Math.PI / 2]} position={[-0.4, 0.4, 0.4]}>
          <cylinderGeometry args={[0.2, 0.2, 3, 32, 1]} />
        </Brush>
      </Subtraction>
      <meshStandardMaterial color="#2A8AFF" />
    </mesh>
  )
}

function WhiteShape(props) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <Subtraction>
        <Brush a rotation={[0, -Math.PI / 2, 0]}>
          <BoxBlendGeometry depth={0.75} />
        </Brush>
        <Brush b position={[0.0, 0.4, 0.4]} rotation={[0, -Math.PI / 2, 0]}>
          <BoxBlendGeometry />
        </Brush>
      </Subtraction>
      <LayerMaterial lighting="standard" color="white" toneMapped={true}>
        <Depth colorA="#2A8AFF" colorB="white" alpha={1} mode="multiply" near={0.0} far={0.6} origin={[0, 0, 0]} />
        <Depth colorA="#2A8AFF" colorB="white" alpha={1.0} mode="multiply" near={0.0} far={0.6} origin={[0, -0.25, -0.1]} />
      </LayerMaterial>
    </mesh>
  )
}
