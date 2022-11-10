import { MeshBasicMaterial, DoubleSide } from 'three'
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass'
import { SAH } from 'three-mesh-bvh'
import { GenerateMeshBVHWorker } from '../worker/GenerateMeshBVHWorker'
import { PathTracingRenderer } from '../utils/PathTracingRenderer'
import { mergeMeshes } from '../utils/GeometryPreparationUtils'
import { LambertPathTracingMaterial } from '../materials/LambertPathTracingMaterial'
import { MaterialReducer } from '../utils/MaterialReducer'

import { useEffect, useState, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

export function PathTracer({ children, tiles = 2, environmentIntensity = 3, bounces = 3 }) {
  const gl = useThree((state) => state.gl)
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const defaultScene = useThree((state) => state.scene)
  const controls = useThree((state) => state.controls)
  const scene = useRef()
  const delaySamples = useRef(0)
  const [fsQuad] = useState(
    () => new FullScreenQuad(new MeshBasicMaterial({ transparent: true, encoding: gl.encoding, toneMapped: false }))
  )
  const [ptRenderer] = useState(() => new PathTracingRenderer(gl))
  const [bvhGenerator] = useState(() => new GenerateMeshBVHWorker())

  // Generate BVH tree
  useEffect(() => {
    ptRenderer.camera = camera
    ptRenderer.material = new LambertPathTracingMaterial({ transparent: true, depthWrite: false, encoding: gl.encoding, toneMapped: false })
    ptRenderer.tiles.set(tiles, tiles)
    ptRenderer.material.setDefine('GRADIENT_BG', 1)
    ptRenderer.material.environmentBlur = 0.35
    ptRenderer.material.environmentIntensity = environmentIntensity
    ptRenderer.material.setDefine('BOUNCES', bounces)
    ptRenderer.pausePathTracing = true
    ptRenderer.material.environmentMap = defaultScene.environment

    scene.current.environment = defaultScene.environment
    scene.current.updateMatrixWorld(true)
    new MaterialReducer().process(scene.current)

    const meshes = []
    scene.current.traverse((c) => {
      if (c.isMesh) meshes.push(c)
      if (c.material) {
        c.material.side = DoubleSide
        c.material.depthWrite = true
        c.material.transparent = false
      }
    })

    async function run() {
      const { geometry, materials, textures } = mergeMeshes(meshes, { attributes: ['position', 'normal', 'tangent', 'uv'] })
      const bvh = await bvhGenerator.generate(geometry, { strategy: SAH, maxLeafTris: 1 })
      ptRenderer.material.bvh.updateFrom(bvh)
      ptRenderer.material.normalAttribute.updateFrom(geometry.attributes.normal)
      ptRenderer.material.tangentAttribute.updateFrom(geometry.attributes.tangent)
      ptRenderer.material.uvAttribute.updateFrom(geometry.attributes.uv)
      ptRenderer.material.materialIndexAttribute.updateFrom(geometry.attributes.materialIndex)
      ptRenderer.material.textures.setTextures(gl, 2048, 2048, textures)
      ptRenderer.material.materials.updateFrom(materials, textures)
      ptRenderer.material.setDefine('MATERIAL_LENGTH', materials.length)
      ptRenderer.pausePathTracing = false
      ptRenderer.reset()
    }
    run()
  }, [])

  // React to controls
  useEffect(() => {
    if (controls) {
      controls.addEventListener('change', () => {
        const tiles = ptRenderer.tiles
        if (tiles.x * tiles.y !== 1) delaySamples.current = 1
        ptRenderer.reset()
      })
    }
  }, [controls])

  // React to size changes
  useEffect(() => {
    ptRenderer.target.setSize(size.width * 1, size.height * 1)
    ptRenderer.reset()
  }, [size])

  // Frameloop
  useFrame(() => {
    if (!ptRenderer.pausePathTracing && delaySamples.current === 0) {
      ptRenderer.update()
      if (ptRenderer.samples < 1) gl.render(scene.current, camera)
      gl.autoClear = false
      fsQuad.material.map = ptRenderer.target.texture
      fsQuad.render(gl)
      gl.autoClear = true
    } else {
      if (delaySamples.current > 0) delaySamples.current--
      gl.render(scene.current, camera)
    }
  }, 1)

  return <scene ref={scene}>{children}</scene>
}
