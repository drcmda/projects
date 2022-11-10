import * as THREE from 'three'
import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Bounds, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { useControls } from 'leva'

const lerp = (target, prop, value, speed = 0.075) => (target[prop] = THREE.MathUtils.lerp(target[prop], value, speed))

function Faucet({ name }) {
  const ref = useRef()
  const { nodes } = useGLTF('/faucet-transformed.glb')
  const [hovered, hover] = useState(false)
  // Filter out all meshes belonging to a particular faucet
  const meshes = Object.values(nodes).filter((node) => node.isMesh && node.name.startsWith(name))
  // Set emissiveIntensity to a high value like 3 on hover
  useEffect(() => void (hovered && ref.current.children.forEach((mesh) => (mesh.material.emissiveIntensity = 3))), [hovered])
  // Lerp it down to 0 constantly in the render loop
  useFrame(() => ref.current.children.forEach((mesh) => lerp(mesh.material, 'emissiveIntensity', 0)))
  return (
    <group ref={ref} onPointerOver={(e) => hover(true)} onPointerOut={(e) => hover(false)}>
      {meshes.map(({ uuid, geometry, material }) => (
        <mesh castShadow receiveShadow key={uuid} geometry={geometry}>
          <meshStandardMaterial
            color={material.color}
            roughness={material.roughness}
            metalness={material.metalness}
            // Emissive color, any color goes
            emissive="white"
            // Intensity must be 0 initially
            emissiveIntensity={0}
          />
        </mesh>
      ))}
    </group>
  )
}

function Faucets(props) {
  // This component splits a GLTF up into parts that will have their own pointer events
  return (
    <group {...props}>
      {[1, 2, 3, 4, 5, 6, 7].map((id) => (
        <Faucet key={id} name={`pipa${id}`} />
      ))}
    </group>
  )
}

export default function App() {
  const { temporal, radius, ambient, color } = useControls({
    temporal: { value: true },
    color: { value: '#0c575f' },
    radius: { value: 3, min: 0, max: 10 },
    ambient: { value: 0.6, min: 0, max: 1 }
  })
  return (
    <Canvas shadows camera={{ position: [-12.5, 2.5, 10], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <Bounds fit clip observe margin={0.4}>
        <Faucets scale={0.01} rotation={[0, -Math.PI / 2, 0]} position={[0, 0.001, 0]} />
        {/* Fake object to stretch bounds a bit */}
        <mesh visible={false} position={[-1.1, 0, 0]}>
          <sphereGeometry args={[0.1]} />
        </mesh>
      </Bounds>
      <AccumulativeShadows resolution={1024} frames={100} temporal={temporal} color={color} alphaTest={0.85} opacity={1.65} scale={6}>
        <RandomizedLight radius={radius} ambient={ambient} position={[10, 5, -15]} bias={0.001} size={1} mapSize={1024} />
      </AccumulativeShadows>
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr" background blur={0.7} />
    </Canvas>
  )
}
