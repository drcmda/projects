import * as THREE from 'three'
import React, { Suspense, useRef } from 'react'
import { OrbitControls, AdaptiveDpr, AdaptiveEvents, useGLTF, useHelper } from '@react-three/drei/native'

// Auto-generated by: https://github.com/pmndrs/gltfjsx
function Model(props) {
  const { nodes, materials } = useGLTF('/scene.glb')
  return (
    <group {...props} dispose={null} onClick={() => console.log('click')}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0, 0, 2]}>
          <mesh castShadow receiveShadow material={materials.material_0} geometry={nodes.mesh_0.geometry} />
          <mesh castShadow receiveShadow material={materials.material_0} geometry={nodes.mesh_1.geometry} />
          <mesh castShadow receiveShadow material={materials.material_0} geometry={nodes.mesh_2.geometry} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene.glb')

function Lights() {
  const light = useRef()
  useHelper(light, THREE.SpotLightHelper, 'cyan')
  return <spotLight ref={light} intensity={0.2} position={[10, 10, 5]} shadow-mapSize-width={64} shadow-mapSize-height={64} castShadow shadow-bias={-0.001} />
}

export default function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <Lights />
      <OrbitControls enableDamping={false} regress />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  )
}
