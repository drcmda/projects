import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MarchingCubes, MarchingCube, Environment, Sky, Bounds } from '@react-three/drei'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'

const vec = new THREE.Vector3()

function MetaBall({ color, ...props }) {
  const api = useRef()
  useFrame((state, delta) => {
    api.current.applyImpulse(
      vec
        .copy(api.current.translation())
        .normalize()
        .multiplyScalar(delta * -0.05),
    )
  })
  return (
    <RigidBody ref={api} colliders={false} linearDamping={4} angularDamping={0.95} {...props}>
      <MarchingCube strength={0.35} subtract={6} color={color} />
      <BallCollider args={[0.1]} type="dynamic" />
    </RigidBody>
  )
}

function Pointer() {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    const { width, height } = viewport.getCurrentViewport()
    vec.set(mouse.x * (width / 2), mouse.y * (height / 2), 0)
    ref.current.setNextKinematicTranslation(vec)
  })
  return (
    <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
      <MarchingCube strength={0.5} subtract={10} color="white" />
      <BallCollider args={[0.1]} type="dynamic" />
    </RigidBody>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 25 }}>
      <ambientLight intensity={1} />
      <directionalLight intensity={1} />
      <directionalLight intensity={10} position={[-10, -10, -10]} color="purple" />
      <Physics gravity={[0, 2, 0]}>
        <MarchingCubes resolution={64} maxPolyCount={20000} enableUvs={false} enableColors>
          <meshStandardMaterial vertexColors roughness={0} />
          <MetaBall color="red" position={[1, 1, 0.5]} />
          <MetaBall color="blue" position={[-1, -1, -0.5]} />
          <MetaBall color="green" position={[2, 2, 0.5]} />
          <MetaBall color="orange" position={[-2, -2, -0.5]} />
          <MetaBall color="hotpink" position={[3, 3, 0.5]} />
          <MetaBall color="aquamarine" position={[-3, -3, -0.5]} />
          <Pointer />
        </MarchingCubes>
      </Physics>
      <Sky />
      <Environment files="adamsbridge.hdr" />
      {/* Zoom to fit a 1/1/1 box to match the marching cubes */}
      <Bounds fit clip observe margin={1}>
        <mesh visible={false}>
          <boxGeometry />
        </mesh>
      </Bounds>
    </Canvas>
  )
}
