import * as THREE from 'three'
import { useMemo, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PointMaterial } from '@react-three/drei'

function Particles({ count }) {
  const white = new THREE.Color('white')
  const orange = new THREE.Color('orange')
  const [positions, colors] = useMemo(() => {
    const positions = [...new Array(count * 3)].map(() => 5 - Math.random() * 10)
    const colors = [...new Array(count)].flatMap(() => orange.toArray())
    return [new Float32Array(positions), new Float32Array(colors)]
  }, [count])

  const points = useRef(null)
  const hover = useCallback((e) => {
    e.stopPropagation()
    white.toArray(points.current.geometry.attributes.color.array, e.index * 3)
    points.current.geometry.attributes.color.needsUpdate = true
  }, [])

  const unhover = useCallback((e) => {
    orange.toArray(points.current.geometry.attributes.color.array, e.index * 3)
    points.current.geometry.attributes.color.needsUpdate = true
  }, [])

  return (
    <points ref={points} onPointerOver={hover} onPointerOut={unhover}>
      <bufferGeometry>
        <bufferAttribute usage={THREE.DynamicDrawUsage} attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute usage={THREE.DynamicDrawUsage} attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <PointMaterial transparent vertexColors size={10} sizeAttenuation={false} depthWrite={false} />
    </points>
  )
}

export default function App() {
  return (
    <Canvas orthographic camera={{ zoom: 40, position: [100, 100, 100] }} raycaster={{ params: { Points: { threshold: 0.2 } } }}>
      <Particles count={1000} />
      <OrbitControls autoRotate autoRotateSpeed={0.1} />
    </Canvas>
  )
}
