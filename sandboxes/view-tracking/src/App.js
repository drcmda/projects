import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { View, Preload, OrbitControls, PerspectiveCamera, CameraShake, TransformControls, Environment } from '@react-three/drei'
import useRefs from 'react-use-refs'
import { Soda, Apple, Duck, Candy, Flash } from './Models'

export function App() {
  const [ref, view1, view2, view3, view4, view5] = useRefs()
  return (
    <div ref={ref} className="container">
      <div className="text">
        Work on version 8 has begun 3 Sep 2021.
        <div ref={view1} className="translateX" style={{ margin: '0.2em', width: 400, height: 200, display: 'inline-block' }} />
        This is perhaps the biggest update to Fiber yet.
        <div ref={view2} className="scale" style={{ margin: '0.2em', width: 600, height: 300, display: 'inline-block' }} />
        We've tried our best to keep breaking-changes to a minimum,
        <div ref={view3} className="translateY" style={{ margin: '0.2em', width: 400, height: 200, display: 'inline-block' }} />
        they mostly affect rarely used api's like attach.
        <div ref={view4} className="scale" style={{ margin: '0.2em', width: 400, height: 200, display: 'inline-block' }} />
        This release brings a ton of performance related fixes,
        <div ref={view5} className="translateX" style={{ margin: '0.2em', width: 400, height: 200, display: 'inline-block' }} />
        but also includes some new and ground-breaking features.
      </div>
      <Canvas eventSource={ref} className="canvas">
        <Suspense fallback={null}>
          <View track={view1}>
            <color attach="background" args={['lightpink']} />
            <Scene />
            <TransformControls>
              <Soda scale={6} position={[0, -1.6, 0]} />
            </TransformControls>
            <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
            <OrbitControls makeDefault />
          </View>
          <View track={view2}>
            <color attach="background" args={['lightblue']} />
            <Scene />
            <TransformControls position={[0, -1, 0]}>
              <Apple scale={14} />
            </TransformControls>
            <OrbitControls makeDefault />
            <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
          </View>
          <View track={view3}>
            <color attach="background" args={['lightgreen']} />
            <Scene />
            <Duck scale={2} position={[0, -1.6, 0]} />
            <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
            <CameraShake intensity={2} />
          </View>
          <View track={view4}>
            <color attach="background" args={['peachpuff']} />
            <Scene />
            <Candy scale={3} />
            <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
          </View>
          <View track={view5}>
            <color attach="background" args={['orange']} />
            <Scene />
            <Flash scale={3} />
            <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
          </View>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset="dawn" />
    </>
  )
}
