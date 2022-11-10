import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/Mushnub_Evolved-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Mushnub_Evolved">
            <skinnedMesh name="Cube035" geometry={nodes.Cube035.geometry} material={materials.MushroomKing_Secondary} skeleton={nodes.Cube035.skeleton} />
            <skinnedMesh name="Cube035_1" geometry={nodes.Cube035_1.geometry} material={materials.MushroomKing_Main} skeleton={nodes.Cube035_1.skeleton} />
            <skinnedMesh name="Cube035_2" geometry={nodes.Cube035_2.geometry} material={materials.Tongue} skeleton={nodes.Cube035_2.skeleton} />
            <skinnedMesh name="Cube035_3" geometry={nodes.Cube035_3.geometry} material={materials.Spikes} skeleton={nodes.Cube035_3.skeleton} />
          </group>
          <group name="Mushnub_Evolved001">
            <skinnedMesh name="Cube000" geometry={nodes.Cube000.geometry} material={materials.Eye_Black} skeleton={nodes.Cube000.skeleton} />
            <skinnedMesh name="Cube000_1" geometry={nodes.Cube000_1.geometry} material={materials.Eye_White} skeleton={nodes.Cube000_1.skeleton} />
          </group>
          <group name="Mushnub_Evolved002">
            <skinnedMesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.Tongue} skeleton={nodes.Cube001.skeleton} />
            <skinnedMesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials.Teeth} skeleton={nodes.Cube001_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/Mushnub_Evolved-transformed.glb')
