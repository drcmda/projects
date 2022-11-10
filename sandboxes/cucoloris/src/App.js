import * as THREE from 'three'
import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  CubeCamera,
  Environment,
  useBoxProjectedEnv,
  MeshReflectorMaterial,
  OrbitControls,
  Sky,
  useTexture,
  useHelper,
} from '@react-three/drei'

export const App = () => (
  <Canvas dpr={[1, 1.5]} shadows camera={{ position: [4, 5, 13], fov: 100 }}>
    <Sky />
    <hemisphereLight intensity={1.5} />
    <Suspense fallback={null}>
      <Bathroom position={[0, -2, 0]} />
      <Lights />
      <Environment preset="apartment" />
    </Suspense>
    <OrbitControls
      minPolarAngle={Math.PI / 2.5}
      maxPolarAngle={Math.PI / 2}
      minAzimuthAngle={0.1}
      maxAzimuthAngle={Math.PI / 4}
      zoomSpeed={0.25}
    />
  </Canvas>
)

function Bathroom({ ...props }) {
  const projection = useBoxProjectedEnv([0, 2.3, 6], [500, 100, 20])
  const projection2 = useBoxProjectedEnv([0, 1, 0], [100, 100, 20])
  const group = useRef()
  const { nodes, materials } = useGLTF('/bathroom-packed.glb')
  console.log(materials)
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-1.73, -0.02, -1.58]} scale={0.001}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_0.geometry}
          material={materials.base}
          material-side={THREE.FrontSide}
          material-envMapIntensity={1}
          material-aoMapIntensity={0}
        />
        <mesh geometry={nodes.mesh_0_1.geometry} material={materials.lamps} />
        <mesh geometry={nodes.mesh_0_2.geometry} material={materials.chrome} material-color="#777" />
      </group>
      <mesh castShadow receiveShadow scale={10} position={[4.5, 0.1, 5.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={20}
          depthScale={1}
          mirror={0.25}
          minDepthThreshold={0.78}
          color="#151515"
          metalness={0.6}
          roughness={1}
        />
        <CubeCamera frames={2} rotation={[Math.PI / 2, 0, 0]} position={[-0.499, -0.415, 0.512]} near={0.1}>
          {(texture) => (
            <mesh rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[0.257, 0.636, 1]} position={[-0.1, 0, 0]}>
              <planeGeometry />
              <meshStandardMaterial roughness={0} metalness={1} color="white" envMap={texture} {...projection} />
            </mesh>
          )}
        </CubeCamera>

        <CubeCamera frames={2} rotation={[Math.PI / 2, 0, 0]} position={[0.415, 0.215, 0.21]} near={0.1}>
          {(texture) => (
            <mesh rotation={[-Math.PI / 2, -Math.PI / 2.06, 0]} position={[0, 0.1, 0]} scale={[0.62, 0.23, 1]}>
              <planeGeometry />
              <meshStandardMaterial roughness={0} metalness={1} color="white" envMap={texture} {...projection2} />
            </mesh>
          )}
        </CubeCamera>
      </mesh>
    </group>
  )
}

function Lights() {
  const texture = useTexture('/cookiedesign.png')
  return (
    <Spotlight
      offset={0.2}
      repeat={1}
      scale={10}
      cucoloris={texture}
      alphaTest={0.5}
      penumbra={1}
      distance={60}
      angle={0.35}
      position={[10, 15, -35]}
      intensity={10}
      shadow-mapSize={[256, 256]}
      shadow-bias={-0.001}
      color="white"
    />
  )
}

function Spotlight({ debug, alphaTest = 0.1, scale = 1, repeat = 1, offset = 0.2, cucoloris, ...props }) {
  const spotlight = useRef()
  const mesh = useRef()

  useHelper(debug && spotlight, THREE.SpotLightHelper, 'white')

  const pos = new THREE.Vector3()
  const dir = new THREE.Vector3()
  function getPointInBetween(A, B, percentage) {
    dir.copy(B).sub(A)
    var len = dir.length()
    dir.normalize().multiplyScalar(len * percentage)
    return pos.copy(A).add(dir)
  }

  useFrame((state, delta) => {
    mesh.current.position.copy(getPointInBetween(spotlight.current.position, spotlight.current.target.position, offset))
    mesh.current.lookAt(spotlight.current.target.position)
  })

  const [video] = useState(() =>
    Object.assign(document.createElement('video'), {
      src: '/leaves.mp4',
      crossOrigin: 'Anonymous',
      loop: true,
      muted: true,
    }),
  )
  useEffect(() => {
    video.play()
    video.playbackRate = 0.6
  }, [video])

  return (
    <>
      <spotLight castShadow ref={spotlight} {...props} />
      <group ref={mesh}>
        <mesh castShadow scale={scale}>
          <planeGeometry />
          <meshBasicMaterial
            color="black"
            alphaMap={cucoloris}
            alphaMap-wrapS={THREE.RepeatWrapping}
            alphaMap-wrapT={THREE.RepeatWrapping}
            alphaMap-repeat={repeat}
            alphaTest={alphaTest}
            side={THREE.DoubleSide}
            transparent
            opacity={debug ? 1 : 0}>
            <videoTexture attach="alphaMap" args={[video]} encoding={THREE.sRGBEncoding} />
          </meshBasicMaterial>
        </mesh>
      </group>
    </>
  )
}
