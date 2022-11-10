import * as THREE from "three"
import React, { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree, createPortal } from "@react-three/fiber"
import { ScrollControls, useScroll, Text, Loader, Line, Shadow, useTexture, meshBounds } from "@react-three/drei"
import { useDrag } from "react-use-gesture"
import Plane from "./components/Plane"
import Effects from "./components/Effects"
import { Block, useBlock } from "./blocks"
import state from "./store"

function HeadsUpDisplay({ children }) {
  const [scene] = useState(() => new THREE.Scene())
  const { gl, camera } = useThree()
  useFrame(() => ((gl.autoClear = false), gl.clearDepth(), gl.render(scene, camera)), 2)
  return createPortal(children, scene)
}

function Marker() {
  const ref = useRef()
  const [active, setActive] = useState(false)
  const [hovered, set] = useState(false)
  const { sectionWidth } = useBlock()
  useEffect(() => void (document.body.style.cursor = hovered ? "grab" : "auto"), [hovered])
  useFrame(({ camera }) => {
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, (state.top.current / state.zoom / sectionWidth / state.pages) * -Math.PI * 2, 0.1)
    const s = THREE.MathUtils.lerp(ref.current.scale.x, active || hovered ? 2 : 0.75, 0.1)
    ref.current.scale.set(s, s, s)
    camera.zoom = THREE.MathUtils.lerp(camera.zoom, active || hovered ? 40 : state.zoom, 0.1)
    camera.updateProjectionMatrix()
  })
  const bind = useDrag(({ movement: [x], first, last }) => (setActive(!last), (state.ref.scrollLeft = x * 2 * state.pages)), {
    initial: () => [(state.ref.scrollLeft * 0.5) / state.pages]
  })
  return (
    <group ref={ref} position={[0, 0, 2]}>
      <Rect {...bind()} onPointerOver={(e) => (e.stopPropagation(), set(true))} onPointerOut={() => set(false)} />
    </group>
  )
}

function Rect({ scale, ...props }) {
  return (
    <group scale={scale}>
      <Line points={[-0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0, -0.5, 0.5, 0]} color="white" linewidth={1} position={[0, 0, 0]} />
      <mesh {...props} raycast={meshBounds}>
        <planeGeometry />
        <meshBasicMaterial transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

function Dot() {
  const [hovered, set] = useState(false)
  const { offset, sectionWidth } = useBlock()
  useEffect(() => void (document.body.style.cursor = hovered ? "pointer" : "auto"), [hovered])
  return <Rect scale={0.15} onPointerOver={() => set(true)} onPointerOut={() => set(false)} onClick={() => (state.ref.scrollLeft = offset * sectionWidth * state.zoom)} />
}

function Map() {
  return new Array(6).fill().map((img, index) => (
    <Block key={index} factor={1 / state.sections / 2} offset={index}>
      <Dot />
    </Block>
  ))
}

function Image({ img, index }) {
  const ref = useRef()
  const { contentMaxWidth: w, viewportWidth, offsetFactor } = useBlock()
  useFrame(() => {
    const scrollOffset = state.top.current / (viewportWidth * state.pages - viewportWidth) + 1 / state.pages / 2
    const scale = 1 - (offsetFactor - scrollOffset) * (offsetFactor > scrollOffset ? 1 : -1)
    ref.current.scale.setScalar(scale)
  })
  return (
    <group ref={ref}>
      <Plane map={img} args={[1, 1, 32, 32]} shift={100} aspect={1.5} scale={[w, w / 1.5, 1]} frustumCulled={false} />
      <Text anchorX="left" position={[-w / 2, -w / 1.5 / 2 - 0.25, 0]} scale={1.5} color="white">
        0{index}
      </Text>
      <Shadow scale={[w * 1.2, 1, 1]} rotation={[0.75, 0, 0]} position={[0, -w / 2, 0]} />
    </group>
  )
}

function Content() {
  const images = useTexture(["/01.jpg", "/ph1.jpg", "/00.jpg", "/03.jpg", "/04.jpg", "/05.jpg"])
  return images.map((img, index) => (
    <Block key={index} factor={1} offset={index}>
      <Image key={index} index={index} img={img} />
    </Block>
  ))
}

export default function App() {
  const scrollArea = useRef()
  const onScroll = (e) => (state.top.current = e.target.scrollLeft)
  useEffect(() => void onScroll({ target: (state.ref = scrollArea.current) }), [])
  return (
    <>
      <Canvas
        orthographic
        dpr={[1, 1.5]}
        mode="concurrent"
        camera={{ zoom: 1, position: [0, 0, 500] }}
        raycaster={{
          computeOffsets: ({ offsetX, offsetY }) => ({
            offsetX: offsetX - scrollArea.current.scrollLeft,
            offsetY
          })
        }}
        onCreated={(state) => state.events.connect(scrollArea.current)}>
        <Effects>
          <Suspense fallback={null}>
            <Content />
            <HeadsUpDisplay>
              <Map />
              <Marker />
            </HeadsUpDisplay>
          </Suspense>
        </Effects>
      </Canvas>
      <div class="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: "100vh", width: `${state.pages * 100}vw` }} />
      </div>
      <Loader />
    </>
  )
}
