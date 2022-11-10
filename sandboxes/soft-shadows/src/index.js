import ReactDOM from "react-dom"
import React, { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { softShadows } from "@react-three/drei"
import "./styles.css"

// Inject soft shadow shader
softShadows()

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)
function Sphere({ position = [0, 0, 0], ...props }) {
  const ref = useRef()
  const factor = useMemo(() => 0.5 + Math.random(), [])
  useFrame((state) => {
    const t = easeInOutCubic((1 + Math.sin(state.clock.getElapsedTime() * factor)) / 2)
    ref.current.position.y = position[1] + t * 4
    ref.current.scale.y = 1 + t * 3
  })
  return (
    <mesh ref={ref} position={position} {...props} castShadow receiveShadow>
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
      <meshStandardMaterial attach="material" color="lightblue" roughness={0} metalness={0.1} />
    </mesh>
  )
}

function Spheres({ number = 20 }) {
  const ref = useRef()
  const positions = useMemo(() => [...new Array(number)].map(() => [3 - Math.random() * 6, Math.random() * 4, 3 - Math.random() * 6]), [])
  useFrame((state) => (ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() / 2) * Math.PI))
  return (
    <group ref={ref}>
      {positions.map((pos, index) => (
        <Sphere key={index} position={pos} />
      ))}
    </group>
  )
}

ReactDOM.render(
  <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
    <fog attach="fog" args={["white", 0, 40]} />
    <ambientLight intensity={0.4} />
    <directionalLight
      castShadow
      position={[2.5, 8, 5]}
      intensity={1.5}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />
    <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
    <pointLight position={[0, -10, 0]} intensity={1.5} />
    <group position={[0, -3.5, 0]}>
      <mesh receiveShadow castShadow>
        <boxBufferGeometry attach="geometry" args={[4, 1, 1]} />
        <meshStandardMaterial attach="material" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" transparent opacity={0.4} />
      </mesh>
      <Spheres />
    </group>
  </Canvas>,
  document.getElementById("root")
)
