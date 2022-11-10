import * as THREE from 'three'
import { Suspense, startTransition, useMemo, useRef, useState, useEffect, useLayoutEffect } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { FontLoader, TextGeometry } from 'three-stdlib'
import { Stats } from '@react-three/drei'

/*
This demo creates a highly taxing environment for Threejs and concurrent React.
It simulates heavy load by creating hundreds of THREE.TextGeometry instances at runtime (510 to be exact). 
This class, like many others in Threejs, is expensive and takes a while to construct. 
If all 510 instances are created the same time it will cause approximately 1.5 seconds of pure jank (Apple M1).
This must freeze the tab and clog the main thread. But it gets worse, it runs in an interval and will execute every 3 seconds.

Reacts has to schedule that load so that a stable framerate can always be maintained.

There are two modes:

Distributed ("distributed" is true): the app will randomly spread the creation of all instances over a second. This simulates ongoing stress.
At-once ("distributed" is false): all instances will be created at once, which is the worst case scenario.

You can run the vanilla stress test:

async function test() {
  const chars = `!"§$%&/()=?*#<>-_.:,;+0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`
  const font = await new Promise((res) => new FontLoader().load("https://raw.githubusercontent.com/drcmda/scheduler-test/master/public/Inter%20UI_Bold.json", res))
  console.time("test")
  for (let i = 0; i < 510; i++) {
    new TextGeometry(chars[Math.floor(Math.random() * chars.length)], {
      font,
      size: 1,
      height: 0.5,
      curveSegments: 80,
      bevelEnabled: false,
    })
  }
  console.timeEnd("test")
}

test()

// To really drive it home you'd have to repeat it every three seconds ...
// setInterval(test, 3000)
*/

const ROW = 30
const BLOCK_AMOUNT = 510
const SEGMENTS = 80
const chars = `!"§$%&/()=?*#<>-_.:,;+0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`
const material = new THREE.MeshStandardMaterial({ color: '#111' })
const geom = new THREE.PlaneGeometry(1, 1)

// Change the mode here. A refresh of the right side view is recommended to clear out the GC
//                            ↓                  ↓
export default function App({ concurrent = true, distributed = true }) {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 100], fov: 25 }} style={{ background: '#272737' }}>
        <directionalLight position={[30, 30, 0]} intensity={2} />
        <Suspense fallback={null}>
          <Dolly>
            <Blocks concurrent={concurrent} distribute={distributed} />
          </Dolly>
        </Suspense>
        <Torus />
      </Canvas>
      <Stats className="fps" />
    </>
  )
}

function Dolly({ children }) {
  const ref = useRef()
  useFrame((state) => (ref.current.position.z = 5 + Math.sin(state.clock.getElapsedTime() * 5) * 5))
  return <group ref={ref}>{children}</group>
}

function Torus() {
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.x = ref.current.rotation.y += delta))
  return (
    <mesh ref={ref} position={[0, 0, 40]}>
      <torusKnotGeometry args={[6, 1.5, 200, 32]} />
      <meshToonMaterial color="orange" />
    </mesh>
  )
}

// This component creates hundreds of blocks
function Blocks({ concurrent, distribute }) {
  const [changeBlocks, set] = useState(false)
  let { width } = useThree((state) => state.viewport)
  const size = width / ROW
  const left = -width / 2 + size / 2
  const top = (BLOCK_AMOUNT / ROW / 2) * size - size / 2
  useEffect(() => {
    // Re-render blocks every 2 sec
    const handler = setInterval(() => set((state) => !state), 3000)
    return () => clearInterval(handler)
  })
  return new Array(BLOCK_AMOUNT).fill().map((_, i) => {
    const x = (i % ROW) * size
    const y = Math.floor(i / ROW) * -size
    return (
      <Block
        key={i}
        concurrent={concurrent}
        distribute={distribute}
        change={changeBlocks}
        scale={[size, size, size]}
        position={[left + x, top + y, 0]}
      />
    )
  })
}

// Each block creates a text-geometry
function Block({ concurrent, distribute, change, ...props }) {
  const mat = useRef()
  const [char, setChar] = useState()
  const setRandomChar = () => {
    // This is the critical piece of code, here it sets a new char. If we
    // startTransition this action it will de-prioritise this component graph
    // Otherwise it will run immediately, which must freeze the main thread
    const fn = () => setChar(chars[Math.floor(Math.random() * chars.length)])
    if (concurrent) startTransition(fn)
    else fn()
  }
  useEffect(() => {
    // It can either execute somewhat later, which distributes load a little (spread over a second)
    if (distribute) setTimeout(setRandomChar, Math.random() * 1000)
    // Or execute right away, which effectively creates hundreds of textgeometries at once
    else setRandomChar()
  }, [change])

  useFrame((state, delta) => (mat.current.opacity = THREE.MathUtils.lerp(mat.current.opacity, 0, 0.05)))
  useLayoutEffect(() => void (mat.current.opacity = 1), [char])

  return (
    <mesh {...props} geometry={geom}>
      <meshBasicMaterial ref={mat} color="red" transparent />
      {char && <Text size={5}>{char}</Text>}
    </mesh>
  )
}

function Text({ children, vAlign = 'center', hAlign = 'center', size = 1, ...props }) {
  const font = useLoader(FontLoader, '/InterUIBold.json')
  const mesh = useRef()
  useLayoutEffect(() => {
    const size = new THREE.Vector3()
    mesh.current.geometry.computeBoundingBox()
    mesh.current.geometry.boundingBox.getSize(size)
    mesh.current.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
    mesh.current.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
  }, [children])

  const geom = useMemo(() => new TextGeometry(children, { font, size: 1, height: 0.5, curveSegments: SEGMENTS, bevelEnabled: false }), [
    children,
  ])

  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh} geometry={geom} material={material} rotation={[0, -0.5, 0]} />
    </group>
  )
}
