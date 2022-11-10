import { MathUtils } from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Subtraction, Brush } from '@react-three/csg'
import { Physics, RigidBody, CuboidCollider, InstancedRigidBodies } from '@react-three/rapier'
import { LayerMaterial, Depth } from 'lamina'
import { BoxBlendGeometry, HeartGeometry } from './geometries'

export default function App() {
  return (
    <Canvas orthographic camera={{ position: [0, 10, 100], zoom: 100, near: 0.01 }}>
      <hemisphereLight intensity={1} groundColor="white" />
      <directionalLight position={[10, 15, 10]} intensity={1} />
      <World />
      <ContactShadows resolution={1024} position={[0, -1.01, 0]} scale={100} blur={0.1} far={2} opacity={0.5} />
      <Environment preset="city" />
      <OrbitControls />
    </Canvas>
  )
}

function World({ count = 1000 }) {
  const positions = Array.from({ length: count }, (_, index) => [MathUtils.randFloatSpread(4), 5 + Math.random() * 200, MathUtils.randFloatSpread(4)])
  const rotations = Array.from({ length: count }, (_, index) => [Math.random(), Math.random(), Math.random()])
  const scales = Array.from({ length: count }, (_, index) => {
    const scale = (2 + Math.random() * 8) / 10
    return [scale, scale, scale]
  })
  return (
    <Physics>
      <InstancedRigidBodies positions={positions} rotations={rotations} scales={scales} colliders="cuboid">
        <instancedMesh args={[undefined, undefined, count]}>
          <Subtraction>
            <Brush a rotation={[0, Math.PI / 2, 0]}>
              <BoxBlendGeometry depth={0.4} radius={0.1} />
            </Brush>
            <Brush b>
              <HeartGeometry radius={0.5} depth={2} />
            </Brush>
          </Subtraction>
          <LayerMaterial lighting="lambert" color="white" toneMapped={true}>
            <Depth colorA="#2A8AFF" colorB="white" alpha={1} mode="multiply" near={0.4} far={0.6} origin={[0, 0.45, 0.45]} />
            <Depth colorA="indianred" colorB="white" alpha={1} mode="multiply" near={0.3} far={0.4} origin={[0, -0.4, -0.4]} />
          </LayerMaterial>
        </instancedMesh>
      </InstancedRigidBodies>
      <RigidBody position={[0, -2, 0]} type="fixed" colliders="false">
        <CuboidCollider friction={1} restitution={0.5} args={[1000, 1, 1000]} />
      </RigidBody>
    </Physics>
  )
}
