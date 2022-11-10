import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Edges, PointMaterial } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { LayerMaterial, Displace } from 'lamina'
import { state, useSnapshot } from './store'

const col = new THREE.Color()
const colorPrimary = '#778'
const colorSecondary = '#667'
const blackMaterial = new THREE.MeshBasicMaterial({ color: 'black' })
const blackMaterialT = new THREE.MeshBasicMaterial({ color: 'black', transparent: true })
useGLTF.preload('/bridge4-transformed.glb')

export default function App() {
  return (
    <Canvas
      gl={{ logarithmicDepthBuffer: false, antialias: false }}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
      camera={{ position: [-50, 5, -260], fov: 75, far: 5000 }}>
      <ambientLight intensity={0.5} />
      <Bridge position={[0, 20, 0]} />
      <Stars />
      <Water />
      <mesh position={[0, -20, 0]} scale={3000} rotation={[-Math.PI / 2, 0, 0]} material={blackMaterial}>
        <circleGeometry />
      </mesh>
      <EffectComposer />
      <Rig />
    </Canvas>
  )
}

function Stars() {
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.y += delta / 200))
  return (
    <points ref={ref} scale={4000} rotation={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 12]} />
      <PointMaterial color={colorSecondary} size={2} sizeAttenuation={false} depthWrite={false} />
    </points>
  )
}

function Bridge(props) {
  const ref = useRef()
  const { hovered } = useSnapshot(state)
  const { nodes, materials } = useGLTF('/bridge4-transformed.glb')
  useFrame(() => ref.current.color.lerp(col.set(hovered ? '#df2060' : colorPrimary), 0.025))
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.land.geometry} material={blackMaterialT}>
          <Edges color={colorPrimary} />
        </mesh>
        <mesh geometry={nodes.bridge.geometry} material={blackMaterialT}>
          <Edges>
            <lineBasicMaterial ref={ref} />
          </Edges>
        </mesh>
      </group>
      <mesh position={[0, -18.4, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={nodes.water_2.geometry} material={materials.land} />
    </group>
  )
}

function Water() {
  const ref = useRef()
  const { nodes } = useGLTF('/bridge4-transformed.glb')
  useFrame((state, delta) => (ref.current.offset.x += delta / 50))
  return (
    <>
      <mesh position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={nodes.water_1.geometry} material={blackMaterial} />
      <mesh position={[0, -18.4, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={nodes.water_1.geometry}>
        <LayerMaterial lighting="basic" wireframe color={new THREE.Color(colorSecondary)}>
          <Displace ref={ref} type="cell" scale={40} strength={10} />
        </LayerMaterial>
      </mesh>
    </>
  )
}

function Rig() {
  const { hovered } = useSnapshot(state)
  useFrame((state) => {
    const x = -state.pointer.x * 10
    const y = -state.pointer.y * 2
    state.camera.position.lerp(hovered ? { x: -120 * 0.85 + x, y: 50 + y, z: -280 * 0.85 } : { x: -80 + x, y: 30 + y, z: -280 }, 0.02)
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, hovered ? 100 : 75, 0.02)
    state.camera.updateProjectionMatrix()
    state.camera.lookAt(0, 0, 0)
  })
}
