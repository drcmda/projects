import * as THREE from 'three'
import { useMemo } from 'react'
import { Canvas, useThree, extend } from '@react-three/fiber'
import { useGLTF, OrbitControls, Center, Effects } from '@react-three/drei'
import { RenderPixelatedPass } from 'three-stdlib'

extend({ RenderPixelatedPass })

function Suzi(props) {
  const { nodes, materials } = useGLTF(
    'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/suzanne-low-poly/model.gltf',
  )
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Suzanne.geometry} material={materials['default']} />
    </group>
  )
}

useGLTF.preload('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/suzanne-low-poly/model.gltf')

function Scene() {
  const { size, scene, camera } = useThree()
  const resolution = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
  return (
    <>
      <Center>
        <Suzi scale={2} />
      </Center>
      <Effects>
        <renderPixelatedPass args={[resolution, 8, scene, camera]} />
      </Effects>
    </>
  )
}

export default function App() {
  return (
    <Canvas gl={{ antialias: false }}>
      <color attach="background" args={['#f0f0f0']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 5]} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} />
      <Scene />
      <OrbitControls />
    </Canvas>
  )
}
