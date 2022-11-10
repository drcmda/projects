import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/Mushnub-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Mushnub_Blob">
            <skinnedMesh name="Cube034" geometry={nodes.Cube034.geometry} material={materials.MushroomKing_Secondary} skeleton={nodes.Cube034.skeleton} />
            <skinnedMesh name="Cube034_1" geometry={nodes.Cube034_1.geometry} material={materials.MushroomKing_Main} skeleton={nodes.Cube034_1.skeleton} />
            <skinnedMesh name="Cube034_2" geometry={nodes.Cube034_2.geometry} material={materials.Eye_Black} skeleton={nodes.Cube034_2.skeleton} />
            <skinnedMesh name="Cube034_3" geometry={nodes.Cube034_3.geometry} material={materials.Eye_White} skeleton={nodes.Cube034_3.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/Mushnub-transformed.glb')
