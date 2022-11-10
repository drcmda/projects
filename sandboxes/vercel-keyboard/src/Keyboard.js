import { useLayoutEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, meshBounds } from '@react-three/drei'
import { easing } from 'maath'

function Key({ name }) {
  const ref = useRef()
  const [hovered, hover] = useState(null)
  const { nodes, materials } = useGLTF('/vercel-keyboard-web-transformed.glb')

  useFrame((state, dt) => {
    easing.damp3(ref.current.position, [0, hovered ? -0.0025 : 0, 0], hovered ? 0.025 : 0.1, dt)
  })

  return (
    <mesh
      castShadow
      ref={ref}
      raycast={meshBounds}
      onPointerOver={(e) => (e.stopPropagation(), hover(true))}
      onPointerOut={() => hover(false)}
      geometry={nodes[name].geometry}
      material={materials.caps}
    />
  )
}

export function Model(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/vercel-keyboard-web-transformed.glb')

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.position.y = 0.025 + Math.sin(t / 1.5) / 100
    ref.current.rotation.x = Math.cos(t / 2) / 10
    ref.current.rotation.z = Math.sin(t / 4) / 20
  })

  useLayoutEffect(() => {
    materials.caps.map.anisotropy = 16
    materials.caps.roughness = 0.1
    materials.caps.metalness = 0.1
    materials.Accent.roughness = 0.15
    materials.Accent.metalness = 0.9
    materials['Material.010'].roughness = 0.1
    materials['Material.010'].metalness = 0.1
  }, [])

  return (
    <group {...props} dispose={null}>
      <group ref={ref}>
        <Key name="0" />
        <Key name="1" />
        <Key name="2" />
        <Key name="3" />
        <Key name="4" />
        <Key name="5" />
        <Key name="6" />
        <Key name="7" />
        <Key name="8" />
        <Key name="9" />
        <Key name="a" />
        <Key name="altl" />
        <Key name="altr" />
        <Key name="b" />
        <Key name="backspace" />
        <Key name="bracketclose" />
        <Key name="bracketopen" />
        <Key name="c" />
        <Key name="caps" />
        <Key name="comma" />
        <Key name="control" />
        <Key name="d" />
        <Key name="down" />
        <Key name="e" />
        <Key name="end" />
        <Key name="enter" />
        <Key name="esc" />
        <Key name="f" />
        <Key name="fn" />
        <Key name="g" />
        <Key name="gt" />
        <Key name="h" />
        <Key name="home" />
        <Key name="i" />
        <Key name="j" />
        <Key name="k" />
        <Key name="l" />
        <Key name="left" />
        <Key name="m" />
        <Key name="minus" />
        <Key name="n" />
        <Key name="o" />
        <Key name="p" />
        <Key name="pgdn" />
        <Key name="pgup" />
        <Key name="plus" />
        <Key name="q" />
        <Key name="question" />
        <Key name="r" />
        <Key name="right" />
        <Key name="s" />
        <Key name="semicolon" />
        <Key name="shiftl" />
        <Key name="shiftr" />
        <Key name="slash" />
        <Key name="space" />
        <Key name="st" />
        <Key name="super" />
        <Key name="t" />
        <Key name="tab" />
        <Key name="u" />
        <Key name="up" />
        <Key name="v" />
        <Key name="w" />
        <Key name="x" />
        <Key name="y" />
        <Key name="z" />
        <mesh castShadow geometry={nodes.Accent006.geometry} material={materials.Accent} />
        <mesh castShadow geometry={nodes.Body001.geometry} material={materials['Material.010']} />
        <mesh geometry={nodes.Foot.geometry} material={materials['FloorCorkboard.002']} />
      </group>
    </group>
  )
}

useGLTF.preload('/vercel-keyboard-web-transformed.glb')
