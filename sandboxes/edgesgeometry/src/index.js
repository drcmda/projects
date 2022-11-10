import { createRoot } from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Stage, OrbitControls, Edges } from "@react-three/drei"
import "./styles.css"

function Model() {
  const { nodes } = useGLTF("/headless.glb")
  return (
    <group dispose={null}>
      <mesh geometry={nodes.Cube.geometry}>
        <meshStandardMaterial transparent />
        <Edges />
      </mesh>
    </group>
  )
}

createRoot(document.getElementById("root")).render(
  <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3], fov: 50 }}>
    <Stage contactShadow={{ resolution: 1024, scale: 10 }}>
      <Model />
    </Stage>
    <OrbitControls makeDefault dampingFactor={0.3} />
  </Canvas>
)
