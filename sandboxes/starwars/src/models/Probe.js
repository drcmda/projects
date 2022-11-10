/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: nick.dob (https://sketchfab.com/nick.dob)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/drk-1-probe-droid-ce96ea38dfb54199be3b8f8ecef7a6b8
title: DRK-1 Probe Droid
*/

import * as THREE from 'three'
import { useRef, useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function Probe({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/probe-transformed.glb')
  useLayoutEffect(() => {
    Object.values(materials).forEach((material) => (material.roughness = 0))
    Object.assign(materials.light, {
      color: new THREE.Color('#ff2060'),
      emissive: new THREE.Color(1000, 0, 0),
      emissiveIntensity: 1000000,
      toneMapped: false
    })
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.42, 0.04, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes['ball_low_Material_#26_0'].geometry} material={materials.Material_26} />
      </group>
      <group position={[-0.42, 0.04, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes['cam_low_Material_#26_0_1'].geometry} material={materials.Material_26} />
        <mesh geometry={nodes['cam_low_Material_#26_0_2'].geometry} material={materials.light} />
      </group>
      <group position={[-0.42, 0.04, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes['d_low_Material_#26_0'].geometry} material={materials.Material_26} />
      </group>
      <group position={[-0.21, -0.03, 7.81]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes['inner_low_Material_#26_0'].geometry} material={materials.Material_26} />
      </group>
      <group position={[-0.42, 0.04, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes['Object018_Material_#26_0'].geometry} material={materials.light} />
      </group>
      <group position={[-0.42, 0.04, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes['shell_low_Material_#26_0'].geometry} material={materials.Material_26} />
      </group>
    </group>
  )
}

useGLTF.preload('/probe-transformed.glb')
