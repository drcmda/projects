import { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Clone, Sky, OrthographicCamera, MeshWobbleMaterial } from '@react-three/drei'
import useRefs from 'react-use-refs'
import useSpline from '@splinetool/r3f-spline'

export default function App() {
  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [-25, 5, 125], near: 0.01 }}>
      <hemisphereLight intensity={0.25} />
      <spotLight castShadow angle={0.6} penumbra={1} position={[-200, 200, -100]} intensity={0.5} shadow-bias={-0.000001} shadow-mapSize={[1024, 1024]} />
      <Suspense fallback={null}>
        <Island scale={0.1} />
      </Suspense>
      <Sky />
    </Canvas>
  )
}

export function Island({ ...props }) {
  const [train, birds, clouds] = useRefs()
  const { nodes } = useSpline('https://prod.spline.design/nfsRxoHSokqcHuQL/scene.spline')
  useFrame((state, delta) => {
    birds.current.rotation.y += delta * 2
    clouds.current.rotation.y -= delta / 2
    train.current.rotation.z += delta
    state.camera.lookAt(Math.sin(state.clock.elapsedTime / 2) * 50, -Math.cos(state.clock.elapsedTime / 2) * 50, -Math.atan(state.clock.elapsedTime) * 50)
  })
  return (
    <group {...props} dispose={null}>
      <Clone ref={birds} position={[300, 600, 500]} castShadow receiveShadow object={nodes.Birds} />
      <Clone castShadow receiveShadow object={nodes.Bush} />
      <Clone castShadow receiveShadow object={nodes.Fence} />
      <Clone castShadow receiveShadow object={nodes.House} />
      <Clone castShadow receiveShadow object={nodes['House Door']} />
      <Clone castShadow receiveShadow object={nodes['Light Post']} />
      <Clone castShadow receiveShadow object={nodes['Light Post Door']} />
      <Clone castShadow receiveShadow object={nodes.Steps} />
      <Clone castShadow receiveShadow object={nodes.Stones} />
      <Clone castShadow receiveShadow object={[nodes['Trees 1'], nodes['Trees 3'], nodes['Trees 4'], nodes['Trees 5'], nodes['Trees 6'], nodes['Tress 2']]} />
      <Clone ref={clouds} object={[nodes.Cloud]} inject={<meshBasicMaterial color="white" />} />
      <Clone castShadow receiveShadow object={[nodes.Cylinder, nodes['Cylinder 2'], nodes['Cylinder 3']]} />
      <Clone castShadow receiveShadow object={nodes['Island Grass']} />
      <Clone castShadow receiveShadow object={nodes['Island Rock Base']} />
      <Clone
        castShadow
        receiveShadow
        object={nodes.Ocean}
        inject={<MeshWobbleMaterial transparent opacity={0.65} roughness={0.3} speed={10} factor={0.1} color="lightblue" />}
      />
      <Clone castShadow receiveShadow object={nodes.Plane} />
      <Clone ref={train} castShadow receiveShadow object={nodes.Train}>
        <OrthographicCamera makeDefault position={[-2000, -800, 800]} zoom={0.5} near={100} far={5000} />
      </Clone>
      <Clone castShadow receiveShadow object={[nodes['Train Rail 1'], nodes['Train Rail 2']]} />
      <Clone castShadow receiveShadow object={nodes['Train Rail Base']} />
    </group>
  )
}
