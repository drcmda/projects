import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  useCursor,
  useTexture,
  Text,
  Decal,
  Environment,
  OrbitControls,
  RenderTexture,
  RandomizedLight,
  PerspectiveCamera,
  AccumulativeShadows
} from '@react-three/drei'

export const App = () => (
  <Canvas shadows camera={{ position: [-5, 5, 10], fov: 15 }}>
    <ambientLight intensity={0.25} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -5, -10]} />
    <group position={[0, -0.75, 0]}>
      <Bun />
      <AccumulativeShadows frames={80} color="black" opacity={1} scale={12} position={[0, 0.04, 0]}>
        <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 5, -10]} bias={0.001} />
      </AccumulativeShadows>
    </group>
    <Environment preset="city" resolution={512} />
    <OrbitControls makeDefault />
  </Canvas>
)

function Bun(props) {
  const textRef = useRef()
  const [pmndrs, react, three] = useTexture(['/pmndrs.png', '/react.png', '/three.png'])
  const { nodes } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/bunny/model.gltf')
  useFrame((state) => (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 5.5))
  return (
    <mesh castShadow receiveShadow geometry={nodes.bunny.geometry} {...props} dispose={null}>
      <meshStandardMaterial color="black" roughness={0} metalness={0.5} />
      <Decal position={[0, 1.2, 0.75]} rotation={0.3} scale={[0.9, 0.25, 1]}>
        <meshStandardMaterial roughness={0.6} transparent polygonOffset polygonOffsetFactor={-10}>
          <RenderTexture attach="map" anisotropy={16}>
            <PerspectiveCamera makeDefault manual aspect={0.9 / 0.25} position={[0, 0, 5]} />
            <color attach="background" args={['#af2040']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            <Text rotation={[0, Math.PI, 0]} ref={textRef} fontSize={4} color="white">
              hello from drei
            </Text>
            <Dodecahedron />
          </RenderTexture>
        </meshStandardMaterial>
      </Decal>
      <Decal position={[-1.0, 1.75, 0.6]} rotation={-0.7} scale={0.25} map={pmndrs} map-anisotropy={16} />
      <Decal position={[-1.1, 0.85, 0.52]} rotation={0.75} scale={0.2} map={three} map-anisotropy={16} />
      <Decal position={[0, 1.3, 0.3]} rotation={0.75} scale={0.3} map={react} map-anisotropy={16} />
    </mesh>
  )
}

function Dodecahedron(props) {
  const meshRef = useRef()
  const texture = useTexture('/react.png')
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useCursor(hovered)
  useFrame((state, delta) => (meshRef.current.rotation.x = meshRef.current.rotation.y += delta))
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={clicked ? 2.25 : 1.75}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      <dodecahedronGeometry args={[0.75]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'goldenrod'} />
      <Decal position={[0, -0.2, 0.5]} scale={0.75} map={texture} map-anisotropy={16} />
    </mesh>
  )
}
