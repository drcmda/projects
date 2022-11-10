import * as THREE from "three"
import React, { createContext, useRef, useContext } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import state from "./store"

const offsetContext = createContext(0)

function Block({ children, offset, factor, ...props }) {
  const { offset: parentOffset, sectionWidth } = useBlock()
  const ref = useRef()
  offset = offset !== undefined ? offset : parentOffset
  useFrame(() => {
    const curY = ref.current.position.x
    const curTop = state.top.current
    ref.current.position.x = THREE.MathUtils.lerp(curY, (-curTop / state.zoom) * factor, 0.1)
  })
  return (
    <offsetContext.Provider value={offset}>
      <group {...props} position={[sectionWidth * offset * factor, 0, 0]}>
        <group ref={ref}>{children}</group>
      </group>
    </offsetContext.Provider>
  )
}

function useBlock() {
  const { sections, pages, zoom } = state
  const { size } = useThree()
  const offset = useContext(offsetContext)
  const viewportWidth = size.width
  const canvasWidth = size.width / zoom
  const mobile = size.width < 700
  const contentMaxWidth = canvasWidth * (mobile ? 0.7 : 0.5)
  const sectionWidth = canvasWidth * ((pages - 1) / (sections - 1))
  const offsetFactor = (offset + 1.0) / sections
  return {
    offset,
    viewportWidth,
    contentMaxWidth,
    sectionWidth,
    offsetFactor
  }
}

export { Block, useBlock }
