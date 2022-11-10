import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Dragon_Evolved-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Dragon">
            <skinnedMesh name="Cube221" geometry={nodes.Cube221.geometry} material={materials.Dragon_Main} skeleton={nodes.Cube221.skeleton} />
            <skinnedMesh name="Cube221_1" geometry={nodes.Cube221_1.geometry} material={materials.Dragon_Secondary} skeleton={nodes.Cube221_1.skeleton} />
            <skinnedMesh name="Cube221_2" geometry={nodes.Cube221_2.geometry} material={materials.Dragon_Horn} skeleton={nodes.Cube221_2.skeleton} />
            <skinnedMesh name="Cube221_3" geometry={nodes.Cube221_3.geometry} material={materials.Eye_Black} skeleton={nodes.Cube221_3.skeleton} />
            <skinnedMesh name="Cube221_4" geometry={nodes.Cube221_4.geometry} material={materials.Dragon_Horn} skeleton={nodes.Cube221_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Dragon_Evolved-transformed.glb')
