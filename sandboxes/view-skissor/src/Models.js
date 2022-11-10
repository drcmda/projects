import { useState } from 'react'
import { useGLTF } from '@react-three/drei'

export function Soda({ wireframe, ...props }) {
  const [hovered, spread] = useHover()
  const { nodes } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/soda-bottle/model.gltf')
  return (
    <group {...props} {...spread} dispose={null}>
      <mesh geometry={nodes.Mesh_sodaBottle.geometry}>
        <meshStandardMaterial color={hovered ? 'red' : 'green'} roughness={0} metalness={0.8} envMapIntensity={2} wireframe={wireframe} />
      </mesh>
      <mesh geometry={nodes.Mesh_sodaBottle_1.geometry}>
        <meshStandardMaterial color="black" envMapIntensity={0} wireframe={wireframe} />
      </mesh>
    </group>
  )
}

function useHover() {
  const [hovered, hover] = useState(false)
  return [hovered, { onPointerOver: (e) => (e.stopPropagation(), hover(true)), onPointerOut: () => hover(false) }]
}
