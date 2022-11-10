import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Jump_Land', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/standing/Bunny-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Bunny">
            <skinnedMesh name="Cube074" geometry={nodes.Cube074.geometry} material={materials.Bunny_Main} skeleton={nodes.Cube074.skeleton} />
            <skinnedMesh name="Cube074_1" geometry={nodes.Cube074_1.geometry} material={materials.Bunny_Secondary} skeleton={nodes.Cube074_1.skeleton} />
            <skinnedMesh name="Cube074_2" geometry={nodes.Cube074_2.geometry} material={materials.Eye_Black} skeleton={nodes.Cube074_2.skeleton} />
            <skinnedMesh name="Cube074_3" geometry={nodes.Cube074_3.geometry} material={materials.Eye_White} skeleton={nodes.Cube074_3.skeleton} />
          </group>
          <group name="Carrot">
            <skinnedMesh name="Cube077" geometry={nodes.Cube077.geometry} material={materials['Material.024']} skeleton={nodes.Cube077.skeleton} />
            <skinnedMesh name="Cube077_1" geometry={nodes.Cube077_1.geometry} material={materials['Material.011']} skeleton={nodes.Cube077_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/standing/Bunny-transformed.glb')
