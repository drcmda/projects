import * as THREE from 'three'
import React, { Suspense, useState, useRef } from 'react'
import { Canvas, useFrame, createPortal } from '@react-three/fiber'
import { Stage, Sky, useFBO, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Ramen, Soda, Farm, Heli } from './Models'

function MagicMirror({ children, ...props }) {
  const cam = useRef()
  // useFBO creates a WebGL2 buffer for us, it's a helper from the "drei" library
  const fbo = useFBO()
  // The is a separate scene that we create, React will portal into that
  const [scene] = useState(() => new THREE.Scene())
  // Tie this component into the render-loop
  useFrame((state) => {
    // Our portal has its own camera, but we copy the originals world matrix
    cam.current.matrixWorldInverse.copy(state.camera.matrixWorldInverse)
    // Then we set the render-target to the buffer that we have created
    state.gl.setRenderTarget(fbo)
    // We render the scene into it, using the local camera that is clamped to the planes aspect ratio
    state.gl.render(scene, cam.current)
    // And flip the render-target to the default again
    state.gl.setRenderTarget(null)
  })
  return (
    <>
      <mesh {...props}>
        <planeGeometry args={[2.5, 5]} />
        {/* The "mirror" is just a boring plane, but it receives the buffer texture */}
        <meshBasicMaterial map={fbo.texture} />
      </mesh>
      <PerspectiveCamera manual ref={cam} fov={50} aspect={2.5 / 5} onUpdate={(c) => c.updateProjectionMatrix()} />
      {/* This is React being awesome, we portal this components children into the separate scene above */}
      {createPortal(children, scene)}
    </>
  )
}

function Lights() {
  return (
    <>
      <color attach="background" args={['#f0f0f0']} />
      <ambientLight intensity={1} />
      <pointLight position={[20, 30, 10]} />
      <pointLight position={[-10, -10, -10]} color="blue" />
    </>
  )
}

export default function App() {
  const controls = useRef()
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 4, 8], fov: 50 }}>
      <Lights />
      <Suspense fallback={null}>
        <Stage controls={controls} contactShadow={{ blur: 2, far: 0.2, resolution: 1024 }}>
          <MagicMirror position={[0, 2.5, 0]} rotation={[0, 0, 0]}>
            <Lights />
            <Sky sunPosition={[100, 10, 100]} />
            <Farm scale={10} rotation={[0, 0, 0]} position={[-1, -2, -10]} />
            <Heli scale={3} position={[3, 4, -20]} rotation={[0.5, 0, 0]} />
          </MagicMirror>
          <Ramen scale={4} position={[-2, 0, 2]} />
          <Soda scale={5} position={[1.5, 0, 3]} />
        </Stage>
      </Suspense>
      <OrbitControls ref={controls} />
    </Canvas>
  )
}
