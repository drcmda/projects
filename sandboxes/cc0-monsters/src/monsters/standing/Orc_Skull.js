import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Duck', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/standing/Orc_Skull-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Orc_Skull">
            <skinnedMesh name="Cube038" geometry={nodes.Cube038.geometry} material={materials.Orc_Main} skeleton={nodes.Cube038.skeleton} />
            <skinnedMesh name="Cube038_1" geometry={nodes.Cube038_1.geometry} material={materials['Belt.001']} skeleton={nodes.Cube038_1.skeleton} />
            <skinnedMesh name="Cube038_2" geometry={nodes.Cube038_2.geometry} material={materials.Orc_Mouth} skeleton={nodes.Cube038_2.skeleton} />
            <skinnedMesh name="Cube038_3" geometry={nodes.Cube038_3.geometry} material={materials.Orc_Secondary} skeleton={nodes.Cube038_3.skeleton} />
            <skinnedMesh name="Cube038_4" geometry={nodes.Cube038_4.geometry} material={materials.Metal} skeleton={nodes.Cube038_4.skeleton} />
            <skinnedMesh name="Cube038_5" geometry={nodes.Cube038_5.geometry} material={materials.MushroomKing_Main} skeleton={nodes.Cube038_5.skeleton} />
          </group>
          <group name="Orc_Weapon">
            <skinnedMesh name="Cylinder004" geometry={nodes.Cylinder004.geometry} material={materials.Wood} skeleton={nodes.Cylinder004.skeleton} />
            <skinnedMesh name="Cylinder004_1" geometry={nodes.Cylinder004_1.geometry} material={materials.Metal} skeleton={nodes.Cylinder004_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/standing/Orc_Skull-transformed.glb')
