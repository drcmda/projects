import * as THREE from 'three'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows, Environment, MeshReflectorMaterial } from '@react-three/drei'

function Zoom() {
  const vec = new THREE.Vector3()
  return useFrame((state) => {
    state.camera.position.lerp(vec.set(-50 + state.mouse.x * 10, (1 + state.mouse.y) * 15, 100), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
}

function Bottle({ color, ...props }) {
  const { nodes } = useGLTF('/bottle-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 7.9, 0]} rotation={[Math.PI / 2, 0, 2.88]} scale={0.1}>
        <mesh castShadow receiveShadow geometry={nodes.Untitled064_1.geometry}>
          <meshStandardMaterial color="#d0d0d0" roughness={0} />
        </mesh>
        <mesh scale={0.7} position={[0, 0, -25]} geometry={nodes.Untitled064_2.geometry}>
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh geometry={nodes.Untitled064_3.geometry}>
          <meshPhysicalMaterial transmission={1} roughness={0} thickness={250} envMapIntensity={1} color={color} />
        </mesh>
        <mesh scale={0.99} castShadow receiveShadow geometry={nodes.Untitled064.geometry}>
          <meshPhysicalMaterial transparent opacity={0.1} roughness={0} envMapIntensity={1} color={color} side={THREE.BackSide} />
        </mesh>
        <mesh scale={1} geometry={nodes.Untitled064.geometry}>
          <meshPhysicalMaterial transparent opacity={0.15} roughness={0} envMapIntensity={10} color="black" side={THREE.FrontSide} />
        </mesh>
      </group>
    </group>
  )
}

function Sphere({ color = '#e0e0e0', ...props }) {
  return (
    <mesh receiveShadow castShadow {...props}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Spheres() {
  const group = useRef()
  useFrame(() => {
    group.current.children[0].position.x = THREE.MathUtils.lerp(group.current.children[0].position.x, -18, 0.02)
    group.current.children[1].position.x = THREE.MathUtils.lerp(group.current.children[1].position.x, -5, 0.01)
    group.current.children[2].position.x = THREE.MathUtils.lerp(group.current.children[2].position.x, 12, 0.03)
    group.current.children[3].position.x = THREE.MathUtils.lerp(group.current.children[3].position.x, 10, 0.04)
    group.current.children[4].position.x = THREE.MathUtils.lerp(group.current.children[4].position.x, 30, 0.04)
  })
  return (
    <group ref={group}>
      <Sphere position={[-40, 1, 10]} />
      <Sphere position={[-20, 10, -20]} scale={10} />
      <Sphere position={[40, 4, -5]} scale={4} />
      <Sphere position={[30, 0.75, 10]} scale={0.75} />
      <Sphere position={[100, 17.5, -17]} scale={17.5} />
    </group>
  )
}

export default function App() {
  return (
    <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 0, 100], fov: 20 }}>
      <fog attach="fog" args={['#d0d0d0', 120, 150]} />
      <ambientLight intensity={0.75} />
      <color attach="background" args={['#d0d0d0']} />
      <spotLight penumbra={1} angle={0.5} castShadow position={[40, 80, 0]} intensity={1} shadow-mapSize={[256, 256]} />
      <Suspense fallback={null}>
        <group position={[0, -12, 0]}>
          <Bottle color="#2080ff" position={[-5, 0, 0]} />
          <Bottle color="#ff40f0" scale={0.8} position={[5, 0, 0]} rotation={[0, Math.PI * 0.75, 0]} />
          <Spheres />
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={512}
              mixBlur={1}
              mixStrength={1}
              mixContrast={2}
              roughness={1}
              depthScale={2}
              minDepthThreshold={0.9}
              maxDepthThreshold={1.9}
              color="#cfcfcf"
            />
          </mesh>
          <ContactShadows frames={500} scale={100} position={[0, 0.1, 0]} opacity={0.2} blur={2} far={12} />
        </group>
        <Environment preset="apartment" />
        <Zoom />
      </Suspense>
    </Canvas>
  )
}
