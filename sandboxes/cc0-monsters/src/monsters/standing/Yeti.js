import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Wave', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/standing/Yeti-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Yeti">
            <skinnedMesh name="Cube059" geometry={nodes.Cube059.geometry} material={materials.Yeti_Main} skeleton={nodes.Cube059.skeleton} />
            <skinnedMesh name="Cube059_1" geometry={nodes.Cube059_1.geometry} material={materials.Yeti_Secondary} skeleton={nodes.Cube059_1.skeleton} />
            <skinnedMesh name="Cube059_2" geometry={nodes.Cube059_2.geometry} material={materials.Eye_Black} skeleton={nodes.Cube059_2.skeleton} />
            <skinnedMesh name="Cube059_3" geometry={nodes.Cube059_3.geometry} material={materials.Eye_White} skeleton={nodes.Cube059_3.skeleton} />
            <skinnedMesh name="Cube059_4" geometry={nodes.Cube059_4.geometry} material={materials.Yeti_Teeth} skeleton={nodes.Cube059_4.skeleton} />
            <skinnedMesh name="Cube059_5" geometry={nodes.Cube059_5.geometry} material={materials.Tongue} skeleton={nodes.Cube059_5.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/standing/Yeti-transformed.glb')
