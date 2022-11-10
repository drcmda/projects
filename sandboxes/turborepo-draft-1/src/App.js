import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, CameraShake, useGLTF, MeshReflectorMaterial } from '@react-three/drei'
import { LayerMaterial, Depth, Fresnel } from 'lamina'
import { useControls } from 'leva'

export const App = () => (
  <Canvas dpr={[1, 2]} camera={{ position: [-10, 10, 12], fov: 10 }}>
    <ambientLight />
    <Ring />
    <CameraShake maxYaw={0.01} maxPitch={0.01} maxRoll={0.01} yawFrequency={0.1} pitchFrequency={0.1} rollFrequency={0.1} />
    <mesh rotation-x={-Math.PI / 2} scale={15} position={[0, -0.25, 0]}>
      <planeGeometry />
      <MeshReflectorMaterial blur={[1000, 125]} resolution={1024} mixBlur={1} mixStrength={8} color="#222" metalness={0} roughness={1} />
    </mesh>
    <OrbitControls makeDefault />
  </Canvas>
)

function Ring(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/turberepo-transformed.glb')
  const { gradient } = useControls({ gradient: { value: 0.7, min: 0, max: 1 } })
  console.log(materials)
  let x = 0,
    y = 0
  useFrame((state) => {
    x = THREE.MathUtils.lerp(x, state.pointer.x / 4, 0.05)
    y = THREE.MathUtils.lerp(y, state.pointer.y / 4, 0.05)
    const sin = x + Math.sin(state.clock.elapsedTime / 2)
    const cos = y + Math.cos(state.clock.elapsedTime / 2)
    ref.current.material.layers[0].origin.set(cos / 2, 0, 0)
    ref.current.material.layers[1].origin.set(cos, sin, cos)
    ref.current.material.layers[2].origin.set(sin, cos, sin)
    ref.current.material.layers[3].origin.set(cos, sin, cos)
  })

  return (
    <mesh ref={ref} {...props} geometry={nodes.Cylinder.geometry}>
      <LayerMaterial lighting="basic" aoMap={materials['Material.001'].aoMap} aoMapIntensity={1} toneMapped={false}>
        <Depth colorA="#ff0080" colorB="black" alpha={1} mode="normal" near={0.5 * gradient} far={0.5} origin={[0, 0, 0]} />
        <Depth colorA="blue" colorB="#f7b955" alpha={1} mode="add" near={2 * gradient} far={2} origin={[0, 1, 1]} />
        <Depth colorA="green" colorB="#f7b955" alpha={1} mode="add" near={3 * gradient} far={3} origin={[0, 1, -1]} />
        <Depth colorA="white" colorB="red" alpha={1} mode="overlay" near={1.5 * gradient} far={1.5} origin={[1, -1, -1]} />
        <Fresnel mode="add" color="white" intensity={0.5} power={1.5} bias={0.05} />
      </LayerMaterial>
    </mesh>
  )
}
