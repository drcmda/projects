import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/Pigeon-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Pigeon_Blob_Eyes">
            <skinnedMesh name="Cube228" geometry={nodes.Cube228.geometry} material={materials.Pigeon_Main} skeleton={nodes.Cube228.skeleton} />
            <skinnedMesh name="Cube228_1" geometry={nodes.Cube228_1.geometry} material={materials.Pigeon_Secondary} skeleton={nodes.Cube228_1.skeleton} />
            <skinnedMesh name="Cube228_2" geometry={nodes.Cube228_2.geometry} material={materials.Eye_White} skeleton={nodes.Cube228_2.skeleton} />
            <skinnedMesh name="Cube228_3" geometry={nodes.Cube228_3.geometry} material={materials.Eye_Black} skeleton={nodes.Cube228_3.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/Pigeon-transformed.glb')
