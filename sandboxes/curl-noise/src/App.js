import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Float, ContactShadows, TransformControls } from '@react-three/drei'
import { LayerMaterial, Color, Depth, Fresnel, Noise } from 'lamina'

export default function App() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 22 }}>
      <TransformControls>
        <Float>
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <LayerMaterial>
              <Color color="#603295" />
              <Depth colorA="white" colorB="#0F1C4D" alpha={0.5} mode="normal" near={0} far={2} origin={[1, 1, 1]} />
              <Depth colorA="red" colorB="#0F1C4D" alpha={0.5} mode="add" near={3} far={2} origin={[1, 1, 1]} />
              <Fresnel mode="add" color="orange" intensity={1.5} power={2} bias={0.05} />
              <Noise mapping="world" type="curl" scale={2} colorA="white" colorB="black" mode="softlight" />
              <Noise mapping="local" type="curl" scale={10} colorA="#aaa" colorB="black" mode="softlight" />
              <Noise mapping="local" type="simplex" scale={100} colorA="white" colorB="black" mode="subtract" alpha={0.05} />
            </LayerMaterial>
          </mesh>
          <mesh>
            <circleGeometry args={[2, 16]} />
            <LayerMaterial transparent depthWrite={false} side={THREE.FrontSide} blending={THREE.AdditiveBlending}>
              <Depth colorA="orange" colorB="black" alpha={1} mode="normal" near={-2} far={1.4} origin={[0, 0, 0]} />
              <Noise mapping="local" type="simplex" scale={200} colorA="#fff" colorB="black" mode="multiply" />
            </LayerMaterial>
          </mesh>
        </Float>
      </TransformControls>
      <ContactShadows position={[0, -1.25, 0]} scale={10} far={2} blur={3} />
      <mesh scale={100}>
        <boxGeometry args={[1, 1, 1]} />
        <LayerMaterial side={THREE.BackSide}>
          <Depth colorB="red" colorA="skyblue" alpha={1} mode="normal" near={100} far={200} origin={[100, 100, -100]} />
          <Noise mapping="local" type="white" scale={1000} colorA="white" colorB="black" mode="subtract" alpha={0.1} />
        </LayerMaterial>
      </mesh>
    </Canvas>
  )
}
