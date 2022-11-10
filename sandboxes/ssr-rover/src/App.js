import * as THREE from 'three'
import { useState, useEffect, useLayoutEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useAspect, useGLTF, useAnimations, OrbitControls } from '@react-three/drei'
import { Effects } from './Effects'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 28 }}>
      <color attach="background" args={['#151520']} />
      <directionalLight position={[-2.5, 4, 5]} castShadow intensity={1} shadow-bias={-0.00001} shadow-mapSize={[1024, 1024]} />
      <group position={[0, -0.75, 0]}>
        <Rover position={[0, 0, 1.5]} scale={0.75} rotation={[0, 0.85, 0]} />
        <mesh receiveShadow rotation-x={-Math.PI / 2} scale={100} position={[0, 0, 0]}>
          <planeGeometry />
          <meshStandardMaterial color="black" envMapIntensity={0.5} roughness={0} metalness={0} />
        </mesh>
      </group>
      <Video />
      <Sophia scale={0.01} rotation={[0, Math.PI, 0]} position={[-0.5, -0.75, 3]} />
      <Effects />
      <OrbitControls />
    </Canvas>
  )
}

function Video() {
  const scale = useAspect(1920, 1080, 1)
  // Video texture by: https://www.pexels.com/@rostislav/
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), { src: '/8de3b1a89f862dacc0f7.mp4', crossOrigin: 'Anonymous', loop: true, muted: true })
  )
  useEffect(() => void video.play(), [video])
  return (
    <mesh scale={scale}>
      <planeGeometry />
      <meshBasicMaterial toneMapped={true} side={THREE.DoubleSide}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </mesh>
  )
}

function Rover(props) {
  const { scene } = useGLTF('/Perseverance.glb')
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.material.roughness = 0
        obj.material.metalness = 0.5
        obj.castShadow = obj.receiveShadow = true
      }
    })
  }, [])
  return <primitive object={scene} {...props} />
}

function Sophia({ ...props }) {
  const { scene, materials, animations } = useGLTF('/sophia-v1-transformed.glb')
  const { actions } = useAnimations(animations, scene)
  useLayoutEffect(() => {
    materials['rp_sophia_animated_003_mat'].roughness = 1
    materials['rp_sophia_animated_003_mat'].metalness = 1
    materials['rp_sophia_animated_003_mat'].color.set('#444')
    actions['Take 001'].play()
    scene.traverse((obj) => {
      if (obj.isMesh) obj.castShadow = obj.receiveShadow = true
    })
  }, [])
  return <primitive object={scene} {...props} />
}
