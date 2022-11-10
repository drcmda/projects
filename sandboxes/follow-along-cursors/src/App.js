import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, OrbitControls, ContactShadows } from '@react-three/drei'
import tunnel from 'tunnel-rat'
import { easing } from 'maath'

// Dig a tunnel
const dom = tunnel()

export default function App() {
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ position: [-5, 5, 5], fov: 50 }}>
        <Cursor speed={0.05}>
          <Sphere color="orange" position={[-1, 0, 0]} scale={0.25} />
          <Sphere color="aquamarine" position={[0, 0, 0]} scale={0.25} />
          <Sphere color="tomato" position={[1, 0, 0]} scale={0.25} />
        </Cursor>
        <ContactShadows scale={10} far={2} blur={2.5} position={[0, -0.5, 0]} opacity={0.6} />
        <OrbitControls />
      </Canvas>
      {/* This is the tunnels "Out", contents will appear here (we're in react-dom, not r3f) */}
      <dom.Out />
    </>
  )
}

function Sphere({ color, ...props }) {
  return (
    <mesh {...props}>
      <sphereGeometry />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  )
}

function Cursor({ children, speed = 0.1, eps = 0.001, col = new THREE.Color(), vec = new THREE.Vector2() }) {
  const outer = useRef()
  const [hovered, hover] = useState()
  const [pos] = useState(() => new THREE.Vector2())
  const color = hovered ? '#' + col.copy(hovered.material.color).convertLinearToSRGB().getHexString() : '#777'

  useCursor(hovered)
  useFrame((state, delta) => {
    if (
      easing.damp3(
        pos,
        [state.size.width / 2 + (state.mouse.x * state.size.width) / 2, state.size.height / 2 - (state.mouse.y * state.size.height) / 2],
        0.15,
        delta
      )
    ) {
      outer.current.style.transform = `translate3d(${pos.x - 40}px,${pos.y - 40}px,0)`
    }
  })

  return (
    <group onPointerOver={(e) => (e.stopPropagation(), hover(e.object))} onPointerOut={(e) => hover(null)}>
      {children}
      {/* Everything we'll put into the tunnels "In" will be projected
          outwards to the tunnels "Out". That means we can write dom nodes
          from within r3f, with full access to canvas state! */}
      <dom.In>
        <div ref={outer} class="cursor-outer">
          <div
            class="cursor-inner"
            style={{
              transform: `scale(${hovered ? 1 : 0.25})`,
              borderWidth: hovered ? '10px' : '40px',
              borderColor: color
            }}
          />
          <div class="cursor-text" style={{ background: color, opacity: hovered ? 1 : 0 }}>
            {color}
          </div>
        </div>
      </dom.In>
    </group>
  )
}
