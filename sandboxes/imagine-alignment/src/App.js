import { Canvas } from '@react-three/fiber'
import { useGLTF, useTexture, OrbitControls, AccumulativeShadows, RandomizedLight, Decal } from '@react-three/drei'
import { useControls } from 'leva'

export const App = () => (
  <Canvas shadows orthographic camera={{ position: [-50, 50, 100], zoom: 140 }}>
    <ambientLight intensity={0.5} />
    <directionalLight intensity={0.5} position={[10, 10, 10]} />
    <Cup scale={2} position={[0, -1, 0]} />
    <AccumulativeShadows temporal frames={100} alphaTest={0.95} opacity={1} scale={25} position={[0, -1, 0]}>
      <RandomizedLight amount={8} radius={10} ambient={0.7} intensity={1} position={[10, 10, -5]} bias={0.01} size={10} />
    </AccumulativeShadows>
    <OrbitControls />
  </Canvas>
)

function Cup(props) {
  const { debug, image, x, y, rotation, scale } = useControls({
    debug: true,
    image: { image: '/1200px-Starbucks_Logo_ab_2011.svg.png' },
    x: { value: 0, min: -1, max: 1 },
    y: { value: 0, min: -1, max: 1 },
    rotation: { value: 0, min: 0, max: Math.PI * 2 },
    scale: { value: 1, min: 0, max: 2 }
  })
  const { nodes, materials } = useGLTF('/coffee-transformed.glb')
  const texture = useTexture(image)
  return (
    <mesh castShadow geometry={nodes.coffee_cup_top_16oz.geometry} material={materials['13 - Default']} {...props} material-aoMapIntensity={1} dispose={null}>
      <Decal debug={debug} position={[0 + x, 0.75 + y, 0.3]} rotation={[0, 0, rotation]} scale={[0.52 * scale, 0.6 * scale, 0.6 * scale]} map={texture} />
    </mesh>
  )
}
