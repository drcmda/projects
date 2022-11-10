import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, Environment, Sphere } from '@react-three/drei'
import { InstancedRigidBodies, Physics, RigidBody } from '@react-three/rapier'
import { EffectComposer, SSAO } from '@react-three/postprocessing'
import { easing } from 'maath'

function Scene({ count = 15, vec = new THREE.Vector3(), rfs = THREE.MathUtils.randFloatSpread }) {
  const api = useRef()
  const texture = useTexture('/cross.jpg')
  useFrame((state, delta) => {
    api.current.forEach((body) => {
      body.applyImpulse(
        vec
          .copy(body.translation())
          .normalize()
          .multiplyScalar(-400 * delta),
      )
    })
  })
  return (
    <InstancedRigidBodies
      ref={api}
      colliders="ball"
      linearDamping={0.65}
      angularDamping={0.95}
      positions={Array.from({ length: count }, () => [rfs(10), rfs(10), rfs(10)])}>
      <instancedMesh castShadow receiveShadow args={[undefined, undefined, count]}>
        <meshStandardMaterial color="#207040" map={texture} roughness={0} envMapIntensity={0.2} />
        <sphereGeometry />
      </instancedMesh>
    </InstancedRigidBodies>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }, delta) => {
    easing.damp3(vec, [(mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0], 0.1, delta, Infinity)
    ref.current.setNextKinematicTranslation(vec)
  })
  return (
    <RigidBody type="kinematicPosition" colliders="ball" ref={ref}>
      <Sphere receiveShadow castShadow args={[1]}>
        <meshStandardMaterial color="hotpink" roughness={0} envMapIntensity={0.2} />
      </Sphere>
    </RigidBody>
  )
}

function Effects(props) {
  return (
    <EffectComposer {...props}>
      <SSAO radius={0.2} intensity={20} color="blue" />
    </EffectComposer>
  )
}

export default function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}
      onCreated={(state) => {
        state.scene.backgroundBlurriness = 0.4
      }}>
      <ambientLight intensity={1} />
      <spotLight intensity={0.5} angle={0.2} penumbra={1} position={[30, 30, 30]} castShadow shadow-mapSize={[512, 512]} />
      <directionalLight intensity={10} position={[-10, -10, -10]} color="purple" />
      <Physics gravity={[0, 2, 0]}>
        <Scene />
        <Pointer />
      </Physics>
      <Environment files="adamsbridge.hdr" background blur={0.7} />
      <Effects />
    </Canvas>
  )
}
