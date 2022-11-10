import * as THREE from 'three'
import { Canvas, extend, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, Backdrop, useGLTF } from '@react-three/drei'
import { Raytracer } from '@react-three/lgl'
import { RectAreaLight } from 'lgl-tracer'
import { useControls, button, folder } from 'leva'

extend({ RectAreaLight })

export default function App() {
  const { enabled, dpr, ...props } = useControls({
    enabled: true,
    movingDownsampling: true,
    useTileRender: false,
    dpr: { value: 1.5, min: 0.5, max: 2, step: 0.5 },
    samples: { value: 128, min: 8, max: 2048, step: 8 },
    bounces: { value: 4, min: 1, max: 10, step: 1 },
    envMapIntensity: { value: 0.7, min: 0, max: 1 },
    denoise: folder({
      enableDenoise: false,
      enableTemporalDenoise: true,
      enableSpatialDenoise: true,
      denoiseColorBlendFactor: { value: 0.5, min: 0, max: 1 },
      denoiseMomentBlendFactor: { value: 0.5, min: 0, max: 1 },
      denoiseColorFactor: { value: 0.1, min: 0, max: 1 },
      denoisePositionFactor: { value: 0.1, min: 0, max: 1 }
    })
  })
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }} dpr={dpr} camera={{ position: [-1.5, 0.5, 3] }}>
      {enabled ? (
        <Raytracer toneMapping={THREE.ACESFilmicToneMapping} {...props}>
          <Scene />
        </Raytracer>
      ) : (
        <Scene />
      )}
      <OrbitControls zoomSpeed={0.2} makeDefault dampingFactor={0.2} />
      <Environment preset="warehouse" background />
    </Canvas>
  )
}

function Scene() {
  const gl = useThree((state) => state.gl)
  useControls({
    screenshot: button(() => {
      const link = document.createElement('a')
      link.setAttribute('download', 'canvas.png')
      link.setAttribute('href', gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
      link.click()
    })
  })
  return (
    <>
      <Dragon position={[0, -0.5, -0.5]} rotation={[0, 0.5, 0]} />
      <Duck rotation={[0, 0.5, 0]} scale={0.8} position={[-1.6, -0.5, 1]} />
      <Ruby scale={0.8} rotation={[-0.2, -0.1, -0.55]} position={[1, -0.05, 1]} />
      <Backdrop receiveShadow scale={[15, 8, 5]} floor={1.5} position={[0, -0.5, -4]}>
        <meshPhysicalMaterial metalness={0} roughness={0.15} color="#101020" />
      </Backdrop>
      <rectAreaLight args={['white', 20]} width={2} height={2} position={[3, 3, -2]} target={[0, 0, 0]} visible={false} />
    </>
  )
}

function Ruby(props) {
  const { nodes } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ruby/model.gltf')
  return (
    <mesh geometry={nodes.Ruby.geometry} dispose={null} {...props}>
      <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} color="red" transmission={1} thickness={2} roughness={0} />
    </mesh>
  )
}

function Duck(props) {
  const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.character_duck.geometry} material={nodes.character_duck.material} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.character_duckArmLeft.geometry} material={nodes.character_duckArmLeft.material} position={[0.2, 0, -0.63]} />
        <mesh geometry={nodes.character_duckArmRight.geometry} material={nodes.character_duckArmRight.material} position={[-0.2, 0, -0.63]} />
        <group position={[0, 0, -0.7]}>
          <mesh geometry={nodes.Cube1338.geometry} material={nodes.Cube1338.material} />
          <mesh geometry={nodes.Cube1338_1.geometry} material={materials['Yellow.043']} />
          <mesh geometry={nodes.Cube1338_2.geometry} material={materials['Black.027']} />
        </group>
      </mesh>
    </group>
  )
}

function Dragon(props) {
  const { nodes } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/dragon/model.gltf')
  return (
    <mesh castShadow receiveShadow geometry={nodes.dragon.geometry} {...props} dispose={null}>
      <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} color="orange" />
    </mesh>
  )
}
