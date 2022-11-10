import { Canvas } from '@react-three/fiber'
import {
  View,
  Bounds,
  OrthographicCamera,
  CameraShake,
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ArcballControls,
  TransformControls
} from '@react-three/drei'
import useRefs from 'react-use-refs'
import { Soda } from './Models'

export function App() {
  const [ref, view1, view2, view3, view4] = useRefs()
  return (
    <div ref={ref} className="container">
      <div ref={view1} />
      <div ref={view2} />
      <div ref={view3} />
      <div ref={view4} />
      <Canvas onCreated={(state) => state.events.connect(ref.current)} className="canvas">
        <View index={1} track={view1}>
          <color attach="background" args={['#fed200']} />
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <Lights preset="lobby" />
          <Soda scale={3} position={[0, -0.75, 0]} />
          <OrbitControls makeDefault />
        </View>
        <View index={2} track={view2}>
          <color attach="background" args={['#feabda']} />
          <Lights controls={false} preset="city" />
          <OrthographicCamera makeDefault position={[0, 0, 4]} zoom={100} />
          <Bounds fit clip observe>
            <Soda scale={3} position={[0, -0.75, 0]} />
          </Bounds>
          <ArcballControls makeDefault />
        </View>
        <View index={3} track={view3}>
          <color attach="background" args={['#bbfeeb']} />
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <Lights preset="dawn" />
          <Soda scale={3} position={[0, -0.75, 0]} />
          <OrbitControls makeDefault />
          <CameraShake intensity={2} />
        </View>
        <View index={4} track={view4}>
          <color attach="background" args={['#d6edf3']} />
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <Lights preset="warehouse" />
          <OrbitControls makeDefault />
          <TransformControls scale={3} position={[0, -0.75, 0]}>
            <Soda wireframe />
          </TransformControls>
        </View>
      </Canvas>
    </div>
  )
}

function Lights({ preset }) {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[20, 30, 10]} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset={preset} />
    </>
  )
}
