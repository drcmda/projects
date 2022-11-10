import { Canvas } from '@react-three/fiber'
import { useGLTF, PivotControls, OrbitControls, Bounds, OrthographicCamera, View, Environment, ContactShadows } from '@react-three/drei'
import useRefs from 'react-use-refs'

export default function App() {
  const [ref, view1, view2, view3] = useRefs()
  const handleClick = () => window.open('https://github.com/pmndrs/drei#pivotcontrols', '_blank', 'noopener,noreferrer')
  return (
    <main ref={ref}>
      <section>
        <h1
          style={{
            position: 'relative',
            fontSize: 'clamp(10vw, 8vw, 13vw)',
            fontWeight: 600,
            marginLeft: '5%',
            transform: 'translate3d(-50%,-0.5em,0)'
          }}>
          &lt;
          <br />
          Pivot
          <br />
          Controls
          <br />
          &gt;
        </h1>

        <p style={{ position: 'relative', top: '-16vh' }}>
          Controls for rotating and translating objects. These controls will <strong>turn with the object</strong>.<br />
          <br />
          They are either boundary-box-anchored to the target object they control or global/free floating, giving you a matrix you can
          forward.
        </p>
        <div ref={view1} className="view" style={{ top: '4em' }} />
      </section>

      <section>
        <h1>— Angle control made easy</h1>
        <p>
          This control has HTLM annotations for some transforms and supports [SHIFT] for rounded values while dragging.
          <br />
          <br />
          Translations can be clamped to a range and all parts of the control are configurable.
        </p>
        <div ref={view2} className="view view-2" />
      </section>

      <section className="left">
        <h1>— Simple to use</h1>

        <div className="controls-tag">
          <div className="code">
            &lt;<span>PivotControls</span>&gt;
            <br />
            &nbsp;&nbsp;&lt;<span>mesh</span>/&gt;
            <br />
            &lt;/<span>PivotControls</span>&gt;
          </div>
          <p>Wrap your target object into the PivotControls tag and you are ready to go! 🚀</p>
          <button className="btn" onClick={handleClick}>
            Check documentation
          </button>
        </div>

        <div ref={view3} className="view view-3" />
      </section>

      <Canvas shadows eventSource={ref} className="canvas">
        <Scene track={view1} margin={0.85} polar={Math.PI / 4} camera={[10, 10, 10]}>
          <Chair />
        </Scene>
        <Scene track={view2} margin={1.4} ambience={1}>
          <Hinge />
        </Scene>
        <Scene track={view3} margin={0.65} camera={[10, 0, 0]} azimuth={-Math.PI / 4} polar={Math.PI / 4}>
          <Cup />
        </Scene>
      </Canvas>
    </main>
  )
}

function Scene({ track, children, margin = 1, azimuth = 0, polar = Math.PI / 2, camera = [0, 0, 10], up = [0, 1, 0], ambience = 0.7 }) {
  return (
    <View index={1} track={track}>
      <OrthographicCamera makeDefault position={camera} up={up} zoom={120} />
      <ambientLight intensity={ambience} />
      <spotLight castShadow position={[10, 10, 10]} angle={0.15} shadow-bias={-0.0001} penumbra={1} intensity={1} />
      <Environment preset="city" />
      <Bounds fit clip observe margin={margin}>
        {children}
      </Bounds>
      <OrbitControls
        makeDefault
        enableDamping={false}
        enableZoom={false}
        enableRotate={false}
        minAzimuthAngle={azimuth}
        maxAzimuthAngle={azimuth}
        minPolarAngle={polar}
        maxPolarAngle={polar}
      />
    </View>
  )
}

function Chair(props) {
  const { nodes, materials } = useGLTF('/chair-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <PivotControls
        lineWidth={8}
        disableAxes
        disableSliders
        activeAxes={[true, false, true]}
        offset={[0.045, 0, 0.035]}
        anchor={[0, 0, 0]}
        scale={0.3}>
        <mesh castShadow receiveShadow geometry={nodes.seat.geometry} material={materials['Material.004']} position={[0, 0.34, -0.03]} />
      </PivotControls>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.chair_base.geometry}
        material={materials['Material.003']}
        position={[0, 0.34, -0.03]}
      />

      <ContactShadows scale={1} far={0.5} blur={2} opacity={0.25} />
    </group>
  )
}

function Hinge() {
  const { nodes, materials } = useGLTF('/hinge-transformed.glb')
  return (
    <group dispose={null} scale={0.05}>
      <group position={[-2.42, 10.36, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface22_lambert1_0.geometry}
          material={materials['Material.001']}
          position={[16.76, 6.04, 0.17]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[5.76, 3.75, 5.76]}
        />
      </group>
      <PivotControls
        lineWidth={8}
        disableSliders={true}
        disableAxes={true}
        activeAxes={[true, true, false]}
        rotation={[0, 0, Math.PI / 2]}
        rotationLimits={[undefined, undefined, [0, Math.PI / 4]]}
        offset={[2.5, 4.5, 0]}
        anchor={[-1, -1, 0]}
        scale={10}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface8_lambert1_0.geometry}
          material={materials['Material.002']}
          position={[-17.03, 17.4, 30.49]}
        />
      </PivotControls>
    </group>
  )
}

function Cup() {
  const { nodes, materials } = useGLTF('/coffee-transformed.glb')
  return (
    <>
      <PivotControls
        lineWidth={4}
        activeAxes={[true, true, true]}
        rotation={[0, 0, Math.PI / 2]}
        offset={[0, 0, 0]}
        anchor={[0, 1, 0]}
        scale={0.4}>
        <mesh receiveShadow castShadow geometry={nodes.coffee_cup_top_16oz.geometry} material={materials['13 - Default']} dispose={null} />
      </PivotControls>
      <ContactShadows scale={2} far={1} blur={3} opacity={0.15} />
    </>
  )
}
