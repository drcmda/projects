import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
import { EffectComposer, Selection, Select, Outline } from "@react-three/postprocessing"

export default function App() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 35 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Selection>
          <EffectComposer autoClear={false}>
            <Outline blur hiddenEdgeColor="white" edgeStrength={100} />
          </EffectComposer>
          <Shoe />
        </Selection>
        <Environment preset="city" />
        <ContactShadows frames={1} position={[0, -0.8, 0]} opacity={0.5} scale={10} blur={1} far={0.8} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

function Shoe() {
  const { nodes, materials } = useGLTF("shoe-draco.glb")
  return (
    <group rotation={[0, 0, -0.25]} dispose={null}>
      <Select enabled>
        <Select>
          <mesh receiveShadow castShadow geometry={nodes.shoe.geometry} material={materials.laces} material-color="#252525" />
        </Select>
        <mesh receiveShadow castShadow geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color="#252525" />
        <mesh receiveShadow castShadow geometry={nodes.shoe_2.geometry} material={materials.caps} material-color="#252525" />
        <mesh receiveShadow castShadow geometry={nodes.shoe_3.geometry} material={materials.inner} material-color="#252525" />
        <Select enabled>
          <mesh receiveShadow castShadow geometry={nodes.shoe_6.geometry} material={materials.band} material-color="#252525" />
          <mesh receiveShadow castShadow geometry={nodes.shoe_7.geometry} material={materials.patch} material-color="#666" />
        </Select>
        <mesh receiveShadow castShadow geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color="#666" />
        <Select enabled>
          <mesh receiveShadow castShadow geometry={nodes.shoe_4.geometry} material={materials.sole} material-color="#252525" />
        </Select>
      </Select>
    </group>
  )
}
