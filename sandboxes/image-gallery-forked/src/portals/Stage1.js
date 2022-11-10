import * as THREE from 'three'
import { useEffect } from 'react'
import { useGLTF, useMatcapTexture, MeshWobbleMaterial } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

function Sudo() {
  const { nodes } = useGLTF('/level-react-draco.glb')
  const [spring, api] = useSpring(() => ({ rotation: [Math.PI / 2, 0, 0.29], config: { friction: 40 } }), [])
  useEffect(() => {
    let timeout
    const wander = () => {
      api.start({ rotation: [Math.PI / 2 + THREE.MathUtils.randFloatSpread(2) * 0.3, 0, 0.29 + THREE.MathUtils.randFloatSpread(2) * 0.2] })
      timeout = setTimeout(wander, (1 + Math.random() * 3) * 1000)
    }
    wander()
    return () => clearTimeout(timeout)
  }, [])
  return (
    <>
      <mesh geometry={nodes.Sudo.geometry} material={nodes.Sudo.material} position={[0.68, 0.33, -0.67]} rotation={[Math.PI / 2, 0, 0.29]} />
      <a.mesh geometry={nodes.SudoHead.geometry} material={nodes.SudoHead.material} position={[0.68, 0.33, -0.67]} {...spring} />
    </>
  )
}
function Pyramid() {
  const { nodes } = useGLTF('/level-react-draco.glb')
  const [matcap] = useMatcapTexture('489B7A_A0E7D9_6DC5AC_87DAC7', 1024)
  const [spring, api] = useSpring(() => ({ rotation: [0, 0, 0], config: { mass: 5, tension: 200 } }), [])
  useEffect(() => {
    let timeout
    const rotate = () => {
      api.start({ rotation: [(Math.random() - 0.5) * Math.PI * 3, 0, (Math.random() - 0.5) * Math.PI * 3] })
      timeout = setTimeout(rotate, (0.5 + Math.random() * 2) * 1000)
    }
    rotate()
    return () => void clearTimeout(timeout)
  }, [])
  return (
    <a.mesh geometry={nodes.Pyramid.geometry} position={[-0.8, 1.33, 0.25]} {...spring}>
      <meshMatcapMaterial matcap={matcap} />
    </a.mesh>
  )
}

function Level() {
  const { nodes } = useGLTF('/level-react-draco.glb')
  return <mesh geometry={nodes.Level.geometry} material={nodes.Level.material} position={[-0.38, 0.69, 0.62]} rotation={[Math.PI / 2, -Math.PI / 9, 0]} />
}

function Icon() {
  const { nodes } = useGLTF('/level-react-draco.glb')
  const [matcap] = useMatcapTexture('65A0C7_C3E4F8_A7D5EF_97CAE9', 1024)
  const [springs, api] = useSpring(() => ({ rotation: [0.8, 1.1, -0.4], position: [-0.79, 1.3, 0.62], config: { mass: 2, tension: 200 } }))
  useEffect(() => {
    let timeout
    let floating = false
    const bounce = () => {
      api.start({ rotation: [0.8 - (floating ? 0.8 + Math.PI * 1.8 : 0), 1.1, -0.4], position: [-0.79, floating ? 1.4 : 1.3, 0.62] })
      floating = !floating
      timeout = setTimeout(bounce, 1.5 * 1000)
    }
    bounce()
    return () => clearTimeout(timeout)
  }, [])
  return (
    <a.mesh geometry={nodes.React.geometry} {...springs}>
      <meshMatcapMaterial matcap={matcap} />
    </a.mesh>
  )
}

function Camera() {
  const { nodes, materials } = useGLTF('/level-react-draco.glb')
  const [spring, api] = useSpring(() => ({ 'rotation-z': 0, config: { friction: 40 } }), [])
  useEffect(() => {
    let timeout
    const wander = () => {
      api.start({ 'rotation-z': Math.random() })
      timeout = setTimeout(wander, (1 + Math.random() * 5) * 1000)
    }
    wander()
    return () => clearTimeout(timeout)
  }, [])
  return (
    <a.group position={[-0.58, 0.83, -0.03]} rotation={[Math.PI / 2, 0, 0.47]} {...spring}>
      <mesh geometry={nodes.Camera.geometry} material={nodes.Camera.material} />
      <mesh geometry={nodes.Camera_1.geometry} material={materials.Lens} />
    </a.group>
  )
}

function Cactus() {
  const { nodes, materials } = useGLTF('/level-react-draco.glb')
  return (
    <mesh geometry={nodes.Cactus.geometry} position={[-0.42, 0.51, -0.62]} rotation={[Math.PI / 2, 0, 0]}>
      <MeshWobbleMaterial factor={0.4} map={materials.Cactus.map} />
    </mesh>
  )
}

export default function App() {
  return (
    <group position-y={-0.75} rotation={[0, -Math.PI / 4, 0]} dispose={null}>
      <ambientLight />
      <Level />
      <Sudo />
      <Camera />
      <Cactus />
      <Icon />
      <Pyramid />
    </group>
  )
}
