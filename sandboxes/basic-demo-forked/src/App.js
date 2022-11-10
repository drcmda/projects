import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { MeshReflectorMaterial, OrbitControls } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import Lighting from './Lighting'

function Kitchen2(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/kitchen2-transformed.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.floor.geometry} material={nodes.floor.material} />
      <group position={[14.51, 0.63, -0.36]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.99]}>
        <mesh castShadow receiveShadow geometry={nodes.base_1.geometry} material={nodes.base_1.material} />
        <mesh castShadow receiveShadow geometry={nodes.base_2.geometry} material={materials.floor}>
          <MeshReflectorMaterial
            resolution={1024}
            blur={[400, 50]}
            mirror={0.5}
            mixBlur={0.85}
            color="#aaa"
            map={materials.floor.map}
            normalMap={materials.floor.normalMap}
            normalScale={[20, 20]}
            mixContrast={6}
            mixStrength={1}
            roughness={1}
            toneMapped={false}
          />
        </mesh>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.walls.geometry}
        material={nodes.walls.material}
        material-side={THREE.FrontSide}
      />
      <mesh castShadow receiveShadow geometry={nodes.appliances.geometry} material={nodes.appliances.material} />
    </group>
  )
}

export default function App() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [10, 5, 10], near: 1, far: 1000, fov: 35 }}>
      <Lighting main={false} ao={16} randomize={5} ambient={0.1} position={[10, 6, -10]} />
      {/*<Kitchen floor="#938e84" blur={0.85} contrast={5} mix={2} />*/}
      <Kitchen2 scale={0.2} />
      <OrbitControls />
    </Canvas>
  )
}
