import { useGLTF, Center } from '@react-three/drei'

export function Accent1(props) {
  const { nodes, materials } = useGLTF('/vk_bg_cyl-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <Center top position={[-2.5, 0, 1]} rotation={[0, 0.4, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube028.geometry} material={materials['Material.002']} rotation={[Math.PI / 2, 0, 0]} />
      </Center>
      <Center top rotation={[0.045, -0.4, -0]} position={[-2.5, 0.03, 2]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube007.geometry} material={materials['Material.005']} rotation={[Math.PI / 2, 0, 0]} />
      </Center>
      <Center top rotation={[0, 2.3, -0]} position={[2, 0, 1]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube007.geometry} material={materials['Material.005']} rotation={[Math.PI / 2, 0, 0]} />
      </Center>
      <Center top rotation={[0, Math.PI / 1.6, 0]} position={[2, 0, -2.5]}>
        <mesh
          scale={4}
          castShadow
          geometry={nodes.Cylinder011.geometry}
          material={materials.Accent}
          material-roughness={0.1}
          material-metalness={0.5}
          rotation={[-Math.PI / 2, Math.PI, 0]}
        />
      </Center>
      <Center top rotation={[-0.025, 0, 0]} position={[2, 0.05, -4]}>
        <mesh
          scale={4}
          castShadow
          geometry={nodes.Cylinder011.geometry}
          material={materials.Accent}
          material-roughness={0.1}
          material-metalness={0.5}
          rotation={[-Math.PI / 2, Math.PI, 0]}
        />
      </Center>
    </group>
  )
}

useGLTF.preload('/vk_bg_cyl-transformed.glb')
