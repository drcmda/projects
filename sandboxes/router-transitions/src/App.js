import * as THREE from "three"
import { Suspense, Children, useLayoutEffect, useMemo, useRef } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { ContactShadows, Loader, useTexture, useGLTF, Shadow } from "@react-three/drei"
import { useTransition } from "@react-spring/core"
import { a } from "@react-spring/three"
import { useLocation, Switch, Route } from "wouter"
import DistortionMaterial from "./DistortionMaterial"
import { Container, Jumbo, Nav, Box, Line, Cover } from "./Styles"

const torus = new THREE.TorusBufferGeometry(4, 1.2, 128, 128)
const torusknot = new THREE.TorusKnotBufferGeometry(3, 0.8, 256, 16)
const material1 = new DistortionMaterial()
const material2 = new DistortionMaterial()
const material3 = new DistortionMaterial()
const jumbo = {
  "/": ["The sun", "is its father."],
  "/knot": ["The moon", "its mother."],
  "/bomb": ["The wind", "hath carried it", "in its belly."],
}

function Shape({ geometry, material, args, textures, opacity, color, shadowScale = [9, 1.5, 1], ...props }) {
  const ref = useRef()
  const { mouse, clock } = useThree()
  const [ao, normal, height, roughness] = textures
  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])
  useFrame(() => {
    if (ref.current) {
      rEuler.set((-mouse.y * Math.PI) / 10, (mouse.x * Math.PI) / 6, 0)
      ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
      ref.current.material.time = clock.getElapsedTime() * 3
    }
  })
  return (
    <group {...props}>
      <a.mesh
        ref={ref}
        args={args}
        geometry={geometry}
        material={material}
        material-color="white"
        material-aoMap={ao}
        material-normalMap={normal}
        material-displacementMap={height}
        material-roughnessMap={roughness}
        material-opacity={opacity}
      />
    </group>
  )
}

function Shapes({ transition }) {
  const { nodes } = useGLTF("/bomb-gp.glb")
  const textures = useTexture(["/ao.jpg", "/normal.jpg", "/height.png", "/roughness.jpg"])
  useLayoutEffect(() => {
    textures.forEach((texture) => ((texture.wrapT = texture.wrapS = THREE.RepeatWrapping), texture.repeat.set(4, 4)))
  }, [textures])
  return transition(({ opacity, ...props }, location) => (
    <a.group {...props}>
      <Switch location={location}>
        <Route path="/">
          <Shape geometry={torus} material={material1} textures={textures} opacity={opacity} />
        </Route>
        <Route path="/knot">
          <Shape geometry={torusknot} material={material2} textures={textures} opacity={opacity} />
        </Route>
        <Route path="/bomb">
          <Shape
            geometry={nodes.Little_Boy_Little_Boy_Material_0.geometry}
            material={material3}
            textures={textures}
            scale={[0.7, 0.7, 0.7]}
            rotation={[0, 0.5, 0]}
            shadowScale={[17, 2.5, 1]}
            opacity={opacity}
          />
        </Route>
      </Switch>
    </a.group>
  ))
}

function Text({ children, opacity }) {
  return (
    <Box style={{ opacity }}>
      {Children.toArray(children).map((text, index) => (
        <Line key={index} style={{ transform: opacity.to((t) => `translate3d(0,${index * -50 + (1 - t) * ((1 + index) * 40)}px,0)`) }}>
          <div>{text}</div>
          <Cover style={{ transform: opacity.to((t) => `translate3d(0,${t * 100}%,0) rotateZ(-10deg)`) }} />
        </Line>
      ))}
    </Box>
  )
}

export default function App() {
  // Current route
  const [location] = useLocation()
  // Animated shape props
  const transition = useTransition(location, {
    from: { position: [0, 0, -20], rotation: [0, Math.PI, 0], scale: [0, 0, 0], opacity: 0 },
    enter: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1], opacity: 1 },
    leave: { position: [0, 0, -10], rotation: [0, -Math.PI, 0], scale: [0, 0, 0], opacity: 0 },
    config: () => (n) => n === "opacity" && { friction: 60 },
  })
  return (
    <>
      <Container>
        <Jumbo>
          {transition((style, location) => (
            <Text open={true} t={style.t} opacity={style.opacity} children={jumbo[location]} />
          ))}
        </Jumbo>
      </Container>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <spotLight position={[0, 30, 40]} />
        <spotLight position={[-50, 30, 40]} />
        <Suspense fallback={null}>
          <Shapes transition={transition} />
          <ContactShadows scale={25} position={[0, -7.5, 0]} blur={5} opacity={1} />
        </Suspense>
      </Canvas>
      <Nav />
      <Loader />
    </>
  )
}
