import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Dragon-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Dragon_Fly">
            <skinnedMesh name="Cube222" geometry={nodes.Cube222.geometry} material={materials.Dragon_Main} skeleton={nodes.Cube222.skeleton} />
            <skinnedMesh name="Cube222_1" geometry={nodes.Cube222_1.geometry} material={materials.Dragon_Secondary} skeleton={nodes.Cube222_1.skeleton} />
            <skinnedMesh name="Cube222_2" geometry={nodes.Cube222_2.geometry} material={materials.Dragon_Horn} skeleton={nodes.Cube222_2.skeleton} />
            <skinnedMesh name="Cube222_3" geometry={nodes.Cube222_3.geometry} material={materials.Eye_Black} skeleton={nodes.Cube222_3.skeleton} />
            <skinnedMesh name="Cube222_4" geometry={nodes.Cube222_4.geometry} material={materials.Dragon_Horn} skeleton={nodes.Cube222_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Dragon-transformed.glb')
