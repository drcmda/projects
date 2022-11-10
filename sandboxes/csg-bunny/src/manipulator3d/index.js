import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useThree, dispose } from '@react-three/fiber'
import { Manipulator3D, ManipulatorMesh } from 'manipulator3d'

export function Manipulator({ children, object, scaleFactor = 15, rotationStep = 1, scaleStep = 0.5, onChange, ...props }) {
  const group = useRef()
  const { gl, scene, camera, controls } = useThree()
  const [man] = useState(() => new Manipulator3D(scene, camera, gl, true))

  useEffect(() => {
    if (controls) {
      const originalValue = controls.enabled
      const start = () => (controls.enabled = false)
      const end = () => (controls.enabled = true)
      man.on('dragstart', start)
      man.on('dragend', end)
      return () => {
        controls.enabled = originalValue
        man.off('dragstart', start)
        man.off('dragend', end)
      }
    }
  }, [man, controls])

  useEffect(() => {
    if (onChange) {
      const change = (e, type) =>
        onChange({ type, detail: e.detail, target: group.current.children.length > 1 ? group.current : group.current.children[0] })
      const translate = (e) => change(e, 'translate')
      const rotate = (e) => change(e, 'rotate')
      const scale = (e) => change(e, 'scale')
      man.on('translate', translate)
      man.on('rotate', rotate)
      man.on('scale', scale)
      return () => {
        man.off('translate', translate)
        man.off('rotate', rotate)
        man.off('scale', scale)
      }
    }
  }, [man, onChange])

  useEffect(() => {
    man.data.scaleFactor = scaleFactor
    man.mesh = new ManipulatorMesh(man.data)
    scene.add(man.mesh)
    man.setActive(true)

    if (object) {
      man.attach(object instanceof THREE.Object3D ? object : object.current)
    } else if (group.current instanceof THREE.Object3D) {
      man.attach(group.current)
    }

    if (
      onChange({
        type: 'setup',
        detail: [0, 0, 0],
        target: group.current.children.length > 1 ? group.current : group.current.children[0]
      })
    )
      return () => {
        man.setActive(false)
        man.detach()
        scene.remove(man.mesh)
        dispose(man.mesh)
      }
  }, [])

  useEffect(() => {
    man.setRotationStep(rotationStep)
    man.setScaleStep(scaleStep)
  }, [rotationStep, scaleStep])

  return (
    <group ref={group} {...props}>
      {children}
    </group>
  )
}
