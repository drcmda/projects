import { useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import {
  useGLTF,
  MeshRefractionMaterial,
  CubeCamera,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  OrbitControls
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { RGBELoader } from 'three-stdlib'

function Diamond(props) {
  const ref = useRef()
  const { nodes } = useGLTF('/dflat.glb')
  // Use a custom envmap/scene-backdrop for the diamond material
  // This way we can have a clear BG while cube-cam can still film other objects
  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')
  // Optional config
  const config = useControls({
    bounces: { value: 4, min: 0, max: 8, step: 1 },
    aberrationStrength: { value: 0.01, min: 0, max: 0.1, step: 0.01 },
    ior: { value: 2.4, min: 0, max: 10 },
    fresnel: { value: 1, min: 0, max: 1 },
    color: 'white',
    fastChroma: false
  })
  return (
    <CubeCamera resolution={256} frames={1} envMap={texture}>
      {(texture) => (
        <mesh castShadow ref={ref} geometry={nodes.Diamond_1_0.geometry} {...props}>
          <MeshRefractionMaterial envMap={texture} {...config} toneMapped={false} />
        </mesh>
      )}
    </CubeCamera>
  )
}

export default function App() {
  return (
    <Canvas shadows camera={{ position: [-5, 0.5, 5], fov: 45 }}>
      <color attach="background" args={['white']} />
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 5, -10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Diamond rotation={[0, 0, 0.715]} position={[0, -0.175, 0]} />
      <mesh castShadow receiveShadow position={[-2, 0, -1]} scale={0.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh castShadow receiveShadow position={[1.75, 0.25, 1]} scale={0.75}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <AccumulativeShadows
        temporal
        frames={100}
        color="orange"
        colorBlend={2}
        toneMapped={true}
        alphaTest={0.8}
        opacity={1}
        scale={12}
        position={[0, -0.5, 0]}>
        <RandomizedLight amount={8} radius={10} ambient={0.5} intensity={1} position={[5, 5, -10]} bias={0.001} />
      </AccumulativeShadows>
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr" />
      <OrbitControls makeDefault autoRotate autoRotateSpeed={0.1} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      <EffectComposer>
        <Bloom luminanceThreshold={2} intensity={1} levels={9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
