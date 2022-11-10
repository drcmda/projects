import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Run', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/standing/Orc-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Orc">
            <skinnedMesh name="Cube026" geometry={nodes.Cube026.geometry} material={materials.Orc_Main} skeleton={nodes.Cube026.skeleton} />
            <skinnedMesh name="Cube026_1" geometry={nodes.Cube026_1.geometry} material={materials.Orc_Secondary} skeleton={nodes.Cube026_1.skeleton} />
            <skinnedMesh name="Cube026_2" geometry={nodes.Cube026_2.geometry} material={materials.Belt} skeleton={nodes.Cube026_2.skeleton} />
            <skinnedMesh name="Cube026_3" geometry={nodes.Cube026_3.geometry} material={materials.Orc_Mouth} skeleton={nodes.Cube026_3.skeleton} />
            <skinnedMesh name="Cube026_4" geometry={nodes.Cube026_4.geometry} material={materials.Tongue} skeleton={nodes.Cube026_4.skeleton} />
            <skinnedMesh name="Cube026_5" geometry={nodes.Cube026_5.geometry} material={materials.Gold} skeleton={nodes.Cube026_5.skeleton} />
            <skinnedMesh name="Cube026_6" geometry={nodes.Cube026_6.geometry} material={materials.Orc_Hair} skeleton={nodes.Cube026_6.skeleton} />
            <skinnedMesh name="Cube026_7" geometry={nodes.Cube026_7.geometry} material={materials.Eye_Black} skeleton={nodes.Cube026_7.skeleton} />
            <skinnedMesh name="Cube026_8" geometry={nodes.Cube026_8.geometry} material={materials.Eye_White} skeleton={nodes.Cube026_8.skeleton} />
          </group>
          <group name="Orc_Weapon">
            <skinnedMesh name="Cylinder008" geometry={nodes.Cylinder008.geometry} material={materials.Wood} skeleton={nodes.Cylinder008.skeleton} />
            <skinnedMesh name="Cylinder008_1" geometry={nodes.Cylinder008_1.geometry} material={materials.Eye_White} skeleton={nodes.Cylinder008_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/standing/Orc-transformed.glb')
