import * as THREE from 'three'
import ReactDOM from 'react-dom'
import { useRef, useState, useLayoutEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import niceColors from 'nice-color-palettes'
import './styles.css'

const length = 125000
const o = new THREE.Object3D()
const c = new THREE.Color()
const colors = Array.from({ length }, () => niceColors[17][Math.floor(Math.random() * 5)])

function Boxes() {
  const ref = useRef()
  const [colorArray] = useState(() => Float32Array.from(Array.from({ length }, (_, i) => c.set(colors[i]).convertSRGBToLinear().toArray()).flat()))
  useLayoutEffect(() => {
    let i = 0
    for (let x = 0; x < 50; x++)
      for (let y = 0; y < 50; y++)
        for (let z = 0; z < 50; z++) {
          const id = i++
          o.position.set(25 - x, 25 - y, 25 - z)
          o.updateMatrix()
          ref.current.setMatrixAt(id, o.matrix)
        }
    ref.current.instanceMatrix.needsUpdate = true
  }, [])
  return (
    <instancedMesh ref={ref} args={[null, null, length]}>
      <boxBufferGeometry args={[0.15, 0.15, 0.15]}>
        <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
      </boxBufferGeometry>
      <meshLambertMaterial vertexColors={THREE.VertexColors} toneMapped={false} />
    </instancedMesh>
  )
}

ReactDOM.render(
  <Canvas camera={{ position: [0, 0, 0.1] }}>
    <ambientLight />
    <directionalLight position={[150, 150, 150]} intensity={0.55} />
    <Boxes />
    <OrbitControls enablePan={false} />
  </Canvas>,
  document.getElementById('root')
)
