import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF, useTexture, Center, Decal, Text3D, OrbitControls } from '@react-three/drei'

export default function App() {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <Scene />
      <axesHelper scale={2} position={[0, 0, 0]} onUpdate={(self) => self.setColors('#ff2080', '#20ff80', '#2080ff')} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  )
}

function Scene({ margin = 0.5 }) {
  const { width, height } = useThree((state) => state.viewport)
  return (
    <>
      <Center bottom right position={[-width / 2 + margin, height / 2 - margin, 0]}>
        <Text3D letterSpacing={-0.06} size={0.5} font="/Inter_Bold.json">
          top left
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
      <Center top left position={[width / 2 - margin, -height / 2 + margin, 0]}>
        <Text3D letterSpacing={-0.06} size={0.5} font="/Inter_Bold.json">
          bottom right
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
      <Center rotation={[-0.5, -0.25, 0]}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={1.5}
          font="/Inter_Bold.json">
          {`hello\nworld`}
          <meshNormalMaterial />
        </Text3D>
        <Center position={[-1.25, 0, 0]}>
          <Cup scale={2} />
        </Center>
      </Center>
    </>
  )
}

function Cup(props) {
  const { nodes, materials } = useGLTF('/coffee-transformed.glb')
  const texture = useTexture('/1200px-Starbucks_Logo_ab_2011.svg.png')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.coffee_cup_top_16oz.geometry} material={materials['13 - Default']}>
        <Decal position={[0, 0.75, 0.3]} rotation={[0, 0, 0]} scale={[0.52, 0.6, 0.6]} map={texture} />
      </mesh>
    </group>
  )
}
