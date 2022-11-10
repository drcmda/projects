import * as THREE from 'three'
import { useState, useRef, createRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane, TorusKnot } from '@react-three/drei'

const getClippedMat = (planes) => ({
  color: 0xffc107,
  metalness: 0.1,
  roughness: 0.75,
  clippingPlanes: planes,
  clipShadows: true,
  shadowSide: THREE.DoubleSide,
})

const getPlaneMat = (plane) => ({
  color: 0xe91e63,
  metalness: 0.1,
  roughness: 0.75,
  clippingPlanes: plane,
  stencilWrite: true,
  stencilRef: 0,
  stencilFunc: THREE.NotEqualStencilFunc,
  stencilFail: THREE.ReplaceStencilOp,
  stencilZFail: THREE.ReplaceStencilOp,
  stencilZPass: THREE.ReplaceStencilOp,
})

function PlaneStencilGroup({ geometry, plane, renderOrder }) {
  const mat = {
    depthWrite: false,
    depthTest: false,
    colorWrite: false,
    stencilWrite: true,
    stencilFunc: THREE.AlwaysStencilFunc,
  }
  const matBack = {
    ...mat,
    side: THREE.BackSide,
    clippingPlanes: [plane],
    stencilFail: THREE.IncrementWrapStencilOp,
    stencilZFail: THREE.IncrementWrapStencilOp,
    stencilZPass: THREE.IncrementWrapStencilOp,
  }
  const matFront = {
    ...mat,
    side: THREE.FrontSide,
    clippingPlanes: [plane],
    stencilFail: THREE.DecrementWrapStencilOp,
    stencilZFail: THREE.DecrementWrapStencilOp,
    stencilZPass: THREE.DecrementWrapStencilOp,
  }

  return (
    <group>
      <mesh geometry={geometry} renderOrder={renderOrder}>
        <meshBasicMaterial {...matFront} />
      </mesh>
      <mesh geometry={geometry} renderOrder={renderOrder}>
        <meshBasicMaterial {...matBack} />
      </mesh>
    </group>
  )
}

export default function Scene({ args = [1, 0.2, 220, 60] }) {
  const ref = useRef()
  const [planes] = useState(() => [[-1, 0, 0], [1,0,0], [0,-1,0], [0,1,0], [0,0,-1], [0,0,1]].map(v => new THREE.Plane(new THREE.Vector3(...v), 1))) // prettier-ignore
  const [planeObjects] = useState(() => [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()])
  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
    planes.forEach((plane, i) => {
      const po = planeObjects[i].current
      plane.coplanarPoint(po.position)
      po.lookAt(po.position.x - plane.normal.x, po.position.y - plane.normal.y, po.position.z - plane.normal.z)
    })
  })
  return (
    <group>
      <group ref={ref}>
        <TorusKnot args={args} renderOrder={6}>
          <meshStandardMaterial {...getClippedMat(planes)} />
        </TorusKnot>
        {planes.map((plane, i) => (
          <PlaneStencilGroup geometry={new THREE.TorusKnotBufferGeometry(...args)} plane={plane} renderOrder={i + 1} />
        ))}
      </group>
      {planes.map((p, i) => (
        <planeHelper key={`0${i}`} args={[p, 2, 0xffffff]} />
      ))}
      {planeObjects.map((planeRef, index) => (
        <Plane key={`0${index}`} ref={planeRef} args={[4, 4]} renderOrder={index + 1.1} onAfterRender={(gl) => gl.clearStencil()}>
          <meshStandardMaterial {...getPlaneMat(planes.filter((_, i) => i !== index))} />
        </Plane>
      ))}
    </group>
  )
}
