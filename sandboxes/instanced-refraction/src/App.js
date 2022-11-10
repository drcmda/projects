import * as THREE from 'three'
import { useMemo } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'
import { Physics, RigidBody, InstancedRigidBodies, CuboidCollider } from '@react-three/rapier'
import { RGBELoader } from 'three-stdlib'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { MeshRefractionMaterial } from './MeshRefractionMaterial'

export default function App({ count = 100 }) {
  const { nodes } = useGLTF('/dflat.glb')
  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')
  const positions = Array.from({ length: count }, (_, i) => [
    THREE.MathUtils.randFloatSpread(6),
    5 + i * 0.1,
    THREE.MathUtils.randFloatSpread(6)
  ])
  const rotations = Array.from({ length: count }, (_, i) => [Math.random(), Math.random(), Math.random()])
  const scales = Array.from({ length: count }, (_, index) => {
    const scale = index === 0 ? 2 : 0.2 + Math.random() * 0.4
    return [scale, scale, scale]
  })
  const getRandomColor = (i, r = Math.random()) =>
    (i === 0 || r > 0.3
      ? new THREE.Color('white')
      : r > 0.2
      ? new THREE.Color('#9a0050')
      : r > 0.1
      ? new THREE.Color('#509a00')
      : new THREE.Color('#00509a')
    ).toArray()
  const colorArray = useMemo(() => Float32Array.from(new Array(count).fill().flatMap((_, i) => getRandomColor(i))), [count])

  return (
    <Canvas shadows camera={{ position: [-25, 1, 25], fov: 15 }}>
      <color attach="background" args={['white']} />
      <directionalLight position={[5, 5, 5]} castShadow>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
      </directionalLight>
      <Physics>
        <InstancedRigidBodies positions={positions} rotations={rotations} scales={scales} colliders="hull">
          <instancedMesh castShadow args={[nodes.Diamond_1_0.geometry, undefined, count]}>
            <instancedBufferAttribute attach="geometry-attributes-color" args={[colorArray, 3]} />
            <MeshRefractionMaterial envMap={texture} bounces={2} aberrationStrength={0.02} fresnel={0.1} toneMapped={false} vertexColors />
          </instancedMesh>
        </InstancedRigidBodies>
        <RigidBody position={[0, -11, 0]} type="fixed" colliders="false">
          <CuboidCollider friction={1} restitution={0} args={[100, 10, 100]} />
        </RigidBody>
      </Physics>
      <ContactShadows position={[0, -1, 0]} scale={100} far={1} blur={0.1} />
      <OrbitControls autoRotateSpeed={0.1} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      <EffectComposer>
        <Bloom luminanceThreshold={2} intensity={1} levels={9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
