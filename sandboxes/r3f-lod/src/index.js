import { render } from 'react-dom'
import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Detailed } from '@react-three/drei'
import './styles.css'

function Dolly() {
  useFrame((state) => {
    state.camera.position.z = 50 + Math.sin(state.clock.getElapsedTime()) * 30
    state.camera.updateProjectionMatrix()
  })
  return null
}

function App() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 60] }}>
      <ambientLight />
      <Detailed distances={[0, 30, 60]}>
        <mesh>
          <icosahedronBufferGeometry attach="geometry" args={[10, 3]} />
          <meshBasicMaterial attach="material" color="hotpink" wireframe />
        </mesh>
        <mesh>
          <icosahedronBufferGeometry attach="geometry" args={[10, 2]} />
          <meshBasicMaterial attach="material" color="lightgreen" wireframe />
        </mesh>
        <mesh>
          <icosahedronBufferGeometry attach="geometry" args={[10, 1]} />
          <meshBasicMaterial attach="material" color="lightblue" wireframe />
        </mesh>
      </Detailed>
      <Dolly />
    </Canvas>
  )
}

render(<App />, document.querySelector('#root'))
