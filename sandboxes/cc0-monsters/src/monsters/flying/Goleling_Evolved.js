import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Goleling_Evolved-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Goleling_Evolved">
            <skinnedMesh name="Cube020" geometry={nodes.Cube020.geometry} material={materials.Goleling_Main} skeleton={nodes.Cube020.skeleton} />
            <skinnedMesh name="Cube020_1" geometry={nodes.Cube020_1.geometry} material={materials.Goleling_Secondary} skeleton={nodes.Cube020_1.skeleton} />
            <skinnedMesh name="Cube020_2" geometry={nodes.Cube020_2.geometry} material={materials.Goleling_Teeth} skeleton={nodes.Cube020_2.skeleton} />
            <skinnedMesh name="Cube020_3" geometry={nodes.Cube020_3.geometry} material={materials.Gold} skeleton={nodes.Cube020_3.skeleton} />
            <skinnedMesh name="Cube020_4" geometry={nodes.Cube020_4.geometry} material={materials.Eye_Black} skeleton={nodes.Cube020_4.skeleton} />
            <skinnedMesh name="Cube020_5" geometry={nodes.Cube020_5.geometry} material={materials.Eye_White} skeleton={nodes.Cube020_5.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Goleling_Evolved-transformed.glb')
