import { Canvas, extend, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, Backdrop, useGLTF } from '@react-three/drei'
import { Raytracer } from '@react-three/lgl'
import { RectAreaLight } from 'lgl-tracer'
import { useControls, button, folder } from 'leva'

extend({ RectAreaLight })

export default function App() {
  const props = useControls({
    movingDownsampling: true,
    useTileRenderer: false,
    samples: { value: 128, min: 8, max: 2048, step: 8 },
    bounces: { value: 3, min: 1, max: 10, step: 1 },
    envMapIntensity: { value: 0.25, min: 0, max: 1 },
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
    <Canvas gl={{ preserveDrawingBuffer: true }} dpr={1.5} camera={{ position: [0, 0.5, 6], fov: 35 }}>
      <Raytracer {...props}>
        <Scene />
      </Raytracer>
      <OrbitControls makeDefault dampingFactor={0.2} />
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
    <group position={[0, -0.25, 0]}>
      {/*<Rover scale={0.8} position={[0, -0.48, 0]} rotation={[0.01, 0.5, 0]} />*/}
      <Duck position={[0, -0.5, 0]} />
      {/*<Van position={[0,0.175,0]} scale={0.7} rotation={[0,0.5,0]} />*/}
      {/*<Chair position={[0, -0.5, 0]} rotation={[0, 0.5, 0]} />*/}
      {/*<Target position={[0,-0.5,0]} rotation={[0,0.1,0]} />*/}
      <Backdrop receiveShadow scale={[20, 5, 5]} floor={1.5} position={[0, -0.5, -2]}>
        <meshPhysicalMaterial roughness={1} color="#efefef" />
      </Backdrop>
      <rectAreaLight args={['white', 3]} width={5} height={5} position={[-3, 4, 1]} target={[0, 0, 0]} visible={false} />
    </group>
  )
}

function Rover(props) {
  const { scene } = useGLTF('https://raw.githubusercontent.com/gkjohnson/gltf-demo-models/main/nasa-m2020/Perseverance.glb')
  return <primitive object={scene} {...props} />
}

function Target(props) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf')
  return <primitive object={scene} {...props} />
}

function Chair(props) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/chair-wood/model.gltf')
  return <primitive object={scene} {...props} />
}

function Van(props) {
  const { scene } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/citroen-old-van/model.gltf')
  return <primitive object={scene} {...props} />
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
