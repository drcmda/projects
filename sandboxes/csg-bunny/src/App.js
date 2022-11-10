import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows, OrbitControls, PivotControls } from '@react-three/drei'
import { Subtraction, Brush } from '@react-three/csg'
import { useControls } from 'leva'
import { Manipulator } from './manipulator3d'

function RotatingBrush(props) {
  const mesh = useRef()
  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += delta
    mesh.current.needsUpdate = true
  })
  return (
    <Brush ref={mesh} {...props}>
      <boxGeometry args={[1, 1, 1]} />
    </Brush>
  )
}

export default function App() {
  const { nodes } = useGLTF('/bunny-transformed.glb')
  const { wireframe } = useControls({ wireframe: false })
  return (
    <Canvas camera={{ position: [8, 0, 2.5], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <mesh>
        <Subtraction>
          <Subtraction a>
            <Brush a scale={1.5} position={[0, -1.04, 0]} geometry={nodes.bunny.geometry} />
            <Manipulator position={[0.5, -0.75, 1]} scaleFactor={20} rotationStep={4} onChange={(e) => (e.target.needsUpdate = true)}>
              <Brush b>
                <sphereGeometry />
              </Brush>
            </Manipulator>
          </Subtraction>
          <RotatingBrush b position={[-1, 1, 1]} />
        </Subtraction>
        <meshNormalMaterial wireframe={wireframe} />
      </mesh>
      <ContactShadows frames={1} position={[0, -1, 0]} blur={6} opacity={1} far={3} />
      <ContactShadows frames={1} position={[0, -1, 0]} blur={1} opacity={0.25} far={1} color="blue" />
      <OrbitControls makeDefault />
    </Canvas>
  )
}
