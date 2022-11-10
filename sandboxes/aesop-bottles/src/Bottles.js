import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { material } from './store'

const hoveredCursor =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyNi41IiBmaWxsPSJibGFjayIgc3Ryb2tlPSJibGFjayIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzIgMzJMMzIgNDVIMzNMMzMgMzJINDVWMzFIMzNWMTlIMzJWMzFIMTlWMzJIMzJaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0xLjk2MjMxIDEuOTYyMzFMMTMuNzAzMyA1LjEwODI5TDUuMTA4MjkgMTMuNzAzM0wxLjk2MjMxIDEuOTYyMzFaIiBmaWxsPSJibGFjayIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IndoaXRlIi8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+'
const defaultCursor =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyNi41IiBzdHJva2U9ImJsYWNrIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAzMkw0MS4xOTI0IDQxLjE5MjRMNDEuODk5NSA0MC40ODUzTDMyLjcwNzEgMzEuMjkyOUw0MS4xOTI0IDIyLjgwNzZMNDAuNDg1MyAyMi4xMDA1TDMyIDMwLjU4NThMMjMuNTE0NyAyMi4xMDA1TDIyLjgwNzYgMjIuODA3NkwzMS4yOTI5IDMxLjI5MjlMMjIuMTAwNSA0MC40ODUzTDIyLjgwNzYgNDEuMTkyNEwzMiAzMloiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTUuMzY3MTEgMTIuNzM3M0wyLjY2OTQyIDIuNjY5NDJMMTIuNzM3MyA1LjM2NzExTDUuMzY3MTEgMTIuNzM3M1oiIHN0cm9rZT0iYmxhY2siLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwMCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg=='

function Label({ texture, offset = [-1, -1], repeat = [2, 2], ...props }) {
  const { nodes } = useGLTF('/draco.glb')
  texture.offset.set(...offset)
  texture.repeat.set(...repeat)
  return (
    <group {...props}>
      <mesh geometry={nodes.aesop_GLBC001.geometry} raycast={() => null}>
        <meshStandardMaterial map={texture} roughness={1} />
      </mesh>
    </group>
  )
}

function Bottle({ initial, glas, cap, liquid, children, ...props }) {
  const ref = useRef()
  const { nodes } = useGLTF('/draco.glb')
  const [hovered, set] = useState(false)
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = `url('${hoveredCursor}'), pointer`
      return () => (document.body.style.cursor = `url('${defaultCursor}'), auto`)
    }
  }, [hovered])
  useFrame(() => {
    ref.current.position.z = THREE.MathUtils.lerp(
      ref.current.position.z,
      hovered ? -15 : 0,
      0.075 - Math.abs(initial) / 2000
    )
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, hovered ? -0.5 : 0, 0.075)
  })

  return (
    <group rotation={[Math.PI / 2, 0, 3]} {...props} onPointerOver={(e) => set(true)} onPointerOut={() => set(false)}>
      <group position-z={initial * 5} ref={ref}>
        {children}
        <mesh geometry={nodes[glas].geometry} castShadow>
          <meshPhysicalMaterial
            transmission={0.9}
            roughness={0}
            thickness={20}
            envMapIntensity={0.6}
            color="#3f2510"
            clearcoat={0.5}
            clearcoatRoughness={1}
          />
        </mesh>
        <mesh geometry={nodes[cap].geometry} material={material.cap} material-color="black" material-roughness={0.8} />
      </group>
    </group>
  )
}

export default function Bottles(props) {
  const group = useRef()
  const { nodes } = useGLTF('/draco.glb')
  const [a, b] = useLoader(THREE.TextureLoader, ['/aesop_GFT_d.jpg', '/aesop_PSFC_d.jpg'])
  return (
    <group ref={group} {...props} dispose={null} scale={[0.1, 0.1, 0.1]}>
      <Bottle initial={-30} position={[140, 0, 0]} glas="Untitled018" cap="Untitled018_1" liquid="Untitled018_2">
        <Label texture={b} offset={[-1.05, -0.2]} repeat={[2, 0.8]} scale={[0.7, 0.7, 0.25]} position={[0, 0, -5]} />
      </Bottle>
      <Bottle initial={-40} position={[80, 0, 0]} glas="Untitled078" cap="Untitled078_1" liquid="Untitled078_2">
        <Label texture={b} scale={[0.64, 0.64, 0.64]} position={[0, 0, -2]} />
      </Bottle>
      <Bottle initial={-50} position={[-2, 0, 0]} glas="Untitled064" cap="Untitled064_1" liquid="Untitled064_3">
        <mesh name="straw" geometry={nodes['Untitled064_2'].geometry}>
          <meshStandardMaterial attach="material" color="black" />
        </mesh>
        <Label texture={a} scale={[1.01, 1.01, 1.01]} />
      </Bottle>
      <Bottle initial={-40} position={[-90, 0, 0]} glas="Untitled052" cap="Untitled052_1" liquid="Untitled052_2">
        <Label texture={a} scale={[0.78, 0.78, 0.78]} position={[0, 0, -5]} />
      </Bottle>
      <Bottle initial={-30} position={[-140, 0, 0]} glas="Untitled072" cap="Untitled072_1" liquid="Untitled072_2">
        <Label texture={b} scale={[0.275, 0.275, 0.6]} position={[0, 0, 8]} />
      </Bottle>
      <Bottle initial={-20} position={[-180, 0, 0]} glas="Untitled007" cap="Untitled007_1" liquid="Untitled007_2">
        <Label texture={a} scale={[0.53, 0.53, 0.53]} position={[0, 0, -5]} />
      </Bottle>
    </group>
  )
}
