import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import glsl from 'babel-plugin-glsl/macro'

class PortalMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color('hotpink') },
        uColorEnd: { value: new THREE.Color('white') }
      },
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }
      `,
      fragmentShader: glsl`
      #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
      uniform float uTime;
      uniform vec3 uColorStart;
      uniform vec3 uColorEnd;
      varying vec2 vUv;
      void main() {
        vec2 displacedUv = vUv + cnoise3(vec3(vUv * 7.0, uTime * 0.1));
        float strength = cnoise3(vec3(displacedUv * 5.0, uTime * 0.2));
        float outerGlow = distance(vUv, vec2(0.5)) * 4.0 - 1.4;
        strength += outerGlow;
        strength += step(-0.2, strength) * 0.8;
        strength = clamp(strength, 0.0, 1.0);
        vec3 color = mix(uColorStart, uColorEnd, strength);
        gl_FragColor = vec4(color, 1.0);
      }
      `
    })
  }

  get time() {
    return this.uniforms.uTime.value
  }

  set time(v) {
    this.uniforms.uTime.value = v
  }

  get colorStart() {
    return this.uniforms.uColorStart.value
  }

  get colorEnd() {
    return this.uniforms.uColorEnd.value
  }
}

class FireflyMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 150 }
      },
      vertexShader: `
      uniform float uPixelRatio;
      uniform float uSize;
      uniform float uTime;
      attribute float aScale;    
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;
        modelPosition.z += cos(uTime + modelPosition.x * 100.0) * aScale * 0.2;
        modelPosition.x += cos(uTime + modelPosition.x * 100.0) * aScale * 0.2;
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPostion = projectionMatrix * viewPosition;    
        gl_Position = projectionPostion;
        gl_PointSize = uSize * aScale * uPixelRatio;
        gl_PointSize *= (1.0 / - viewPosition.z);
      }`,
      fragmentShader: `
      void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float strength = 0.05 / distanceToCenter - 0.1;
        gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
      }`
    })
  }

  get time() {
    return this.uniforms.uTime.value
  }

  set time(v) {
    this.uniforms.uTime.value = v
  }
}

extend({ FireflyMaterial, PortalMaterial })

function Fireflies({ count = 40 }) {
  const shader = useRef()
  const [positionArray, scaleArray] = useMemo(() => {
    const positionArray = new Float32Array(count * 3)
    const scaleArray = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      new THREE.Vector3((Math.random() - 0.5) * 4, Math.random() * 1.5, (Math.random() - 0.5) * 4).toArray(positionArray, i * 3)
      scaleArray[i] = Math.random()
    }
    return [positionArray, scaleArray]
  }, [count])
  useFrame((state, delta) => (shader.current.time += delta / 2))
  return (
    <points key={count}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positionArray} itemSize={3} />
        <bufferAttribute attach="attributes-aScale" count={count} array={scaleArray} itemSize={1} />
      </bufferGeometry>
      <fireflyMaterial ref={shader} transparent depthWrite={false} />
    </points>
  )
}

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Bruno Simon <https://threejs-journey.com>
*/
function Model(props) {
  const portalMaterial = useRef()
  const bakedTexture = useTexture('/baked-02.jpeg')
  const { nodes } = useGLTF('/portal-2.glb')
  useFrame((state, delta) => (portalMaterial.current.time += delta))
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.portalCircle.geometry} position={[0, 0.78, 1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <portalMaterial ref={portalMaterial} blending={THREE.AdditiveBlending} colorStart="pink" colorEnd="white" />
      </mesh>
      <mesh geometry={nodes.lampLightL.geometry} material-color="#f0bf94" position={[0.89, 1.07, -0.14]} scale={[0.07, 0.11, 0.07]} />
      <mesh geometry={nodes.lampLightR.geometry} material-color="#f0bf94" position={[-0.98, 1.07, -0.14]} scale={[-0.07, 0.11, 0.07]} />
      <mesh geometry={nodes.baked.geometry} position={[0.9, 0.34, -1.47]} rotation={[0, 0.14, 0]}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
    </group>
  )
}

export default function App() {
  return (
    <group position={[0, 0, -2]} rotation={[Math.PI / 10, Math.PI * 0.8, 0]}>
      <Fireflies count={50} />
      <Model />
    </group>
  )
}