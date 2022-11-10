import { Canvas } from '@react-three/fiber'
import { useGLTF, GizmoHelper, GizmoViewcube, GizmoViewport, OrbitControls, Center, softShadows, PivotControls } from '@react-three/drei'

softShadows()

export default function App() {
  return (
    <Canvas shadows raycaster={{ params: { Line: { threshold: 0.15 } } }} camera={{ position: [-10, 10, 10], fov: 20 }}>
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[2.5, 5, 5]} intensity={1.5} shadow-mapSize={[1024, 1024]}>
        <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 1, 50]} />
      </directionalLight>

      <mesh scale={20} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry />
        <shadowMaterial transparent opacity={0.5} />
      </mesh>

      <PivotControls rotation={[0, -Math.PI / 2, 0]} anchor={[1, -1, -1]} scale={75} depthTest={false} fixed lineWidth={2}>
        <mesh castShadow receiveShadow position={[-1, 0.5, 1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      </PivotControls>

      <PivotControls activeAxes={[true, true, false]} depthTest={false} anchor={[0, 0, 0]} scale={0.75}>
        <Center top position={[1.5, 0, 0]}>
          <mesh castShadow receiveShadow>
            <dodecahedronGeometry args={[0.5]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </Center>
      </PivotControls>

      <PivotControls anchor={[1, 1, 1]} rotation={[Math.PI, -Math.PI / 2, 0]} scale={0.75}>
        <Center top scale={1.5} position={[-0.5, 0, -1]}>
          <Cup />
        </Center>
      </PivotControls>

      <GizmoHelper alignment="top-right" margin={[100, 100]}>
        <group scale={0.85}>
          <GizmoViewcube />
        </group>
        <group scale={1.75} position={[-30, -30, -30]}>
          <GizmoViewport labelColor="white" axisHeadScale={0.525} hideNegativeAxes />
        </group>
      </GizmoHelper>
      <OrbitControls makeDefault />
    </Canvas>
  )
}

function Cup(props) {
  const { nodes, materials } = useGLTF('/coffee-transformed.glb')
  return (
    <mesh
      receiveShadow
      castShadow
      geometry={nodes.coffee_cup_top_16oz.geometry}
      material={materials['13 - Default']}
      {...props}
      dispose={null}
    />
  )
}
