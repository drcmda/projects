import { memo, useRef } from 'react'
import { RGBELoader } from 'three-stdlib'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Instances, Instance, AccumulativeShadows, RandomizedLight, OrbitControls, Text3D, Center, useFBO } from '@react-three/drei'
import { MeshRefractionMaterial } from './shaders/MeshRefractionMaterial'

export default ({ PI = Math.PI }) => (
  <Canvas shadows camera={{ fov: 30, position: [5, 17, 17] }}>
    <color attach="background" args={['#f2f2f5']} />
    <fog attach="fog" args={['#f2f2f5', 35, 60]} />
    <group position={[0, -1, 0]}>
      <Text makeDefault position={[0, 0, 2.25]} camera={[0, 17.5, 17.5]}>
        19
      </Text>
      <Text position={[0, 0, -2.25]} camera={[0, 17.5, 17.5]}>
        75
      </Text>
      <Grid />
      <Shadows />
    </group>
    <OrbitControls autoRotate autoRotateSpeed={0.1} enablePan={false} enableZoom={false} dampingFactor={0.05} minPolarAngle={PI / 3} maxPolarAngle={PI / 3} />
  </Canvas>
)

const Grid = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => (
  <Instances>
    <planeGeometry args={[lineWidth, height]} />
    <meshBasicMaterial color="#999" />
    {Array.from({ length: number }, (_, y) =>
      Array.from({ length: number }, (_, x) => (
        <group position={[x * 2 - Math.floor(number / 2) * 2, -0.01, y * 2 - Math.floor(number / 2) * 2]}>
          <Instance rotation={[-Math.PI / 2, 0, 0]} />
          <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </group>
      ))
    )}
    <gridHelper args={[100, 100, '#bbb', '#bbb']} position={[0, -0.01, 0]} />
  </Instances>
)

function Text({ children, camera, makeDefault, font = '/Inter_Bold.json', ...props }) {
  const ref = useRef()
  const fbo = useFBO(1024)
  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/decor_shop_1k.hdr')
  let oldBg
  useFrame((state) => {
    ref.current.visible = false
    state.gl.setRenderTarget(fbo)
    oldBg = state.scene.background
    state.scene.background = texture
    state.gl.render(state.scene, state.camera)
    state.scene.background = oldBg
    state.gl.setRenderTarget(null)
    ref.current.visible = true
  })
  return (
    <Center ref={ref} top {...props}>
      <Text3D castShadow bevelEnabled font={font} scale={5} height={0.25} bevelSize={0.01} bevelSegments={10} curveSegments={128} bevelThickness={0.01}>
        {children}
        <MeshRefractionMaterial uSceneTex={fbo.texture} uRefractPower={1.0} uRefractNormal={0.85} uTransparent={0.35} uSat={1.03} uIntensity={2} />
      </Text3D>
    </Center>
  )
}

const Shadows = memo(() => (
  <AccumulativeShadows temporal frames={100} color="lightblue" colorBlend={1} toneMapped={true} alphaTest={0.9} opacity={1} scale={15} position={[0, 0, 0]}>
    <RandomizedLight amount={8} radius={15} ambient={0.5} intensity={1} position={[-5, 10, 0]} bias={0.001} />
  </AccumulativeShadows>
))
