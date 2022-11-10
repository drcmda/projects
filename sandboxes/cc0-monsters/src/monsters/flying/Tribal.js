import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Tribal-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Tribal_Flying">
            <skinnedMesh name="Cube000" geometry={nodes.Cube000.geometry} material={materials.Tribal_Main} skeleton={nodes.Cube000.skeleton} />
            <skinnedMesh name="Cube000_1" geometry={nodes.Cube000_1.geometry} material={materials.Tribal_Secondary} skeleton={nodes.Cube000_1.skeleton} />
            <skinnedMesh name="Cube000_2" geometry={nodes.Cube000_2.geometry} material={materials.Tribal_Gold} skeleton={nodes.Cube000_2.skeleton} />
            <skinnedMesh name="Cube000_3" geometry={nodes.Cube000_3.geometry} material={materials.Eye_White} skeleton={nodes.Cube000_3.skeleton} />
            <skinnedMesh name="Cube000_4" geometry={nodes.Cube000_4.geometry} material={materials.Eye_Black} skeleton={nodes.Cube000_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Tribal-transformed.glb')
