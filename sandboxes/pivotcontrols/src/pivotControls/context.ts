import * as THREE from 'three'
import * as React from 'react'

export type PivotContext = {
  onDragStart: () => void
  onDrag: (mdW: THREE.Matrix4) => void
  onDragEnd: () => void
  axisColors: [string | number, string | number, string | number]
  hoveredColor: string | number
  opacity: number
  scale: number
  lineWidth: number
  fixed: boolean
  depthTest: boolean
  userData?: { [key: string]: any }
  annotationsClass?: string
}

export const context = React.createContext<PivotContext>(null!)
