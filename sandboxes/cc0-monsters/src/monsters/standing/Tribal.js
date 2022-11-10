import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Weapon', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/standing/Tribal-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Tribal">
            <skinnedMesh name="Cube102" geometry={nodes.Cube102.geometry} material={materials.Tribal_Main} skeleton={nodes.Cube102.skeleton} />
            <skinnedMesh name="Cube102_1" geometry={nodes.Cube102_1.geometry} material={materials.Tribal_Secondary} skeleton={nodes.Cube102_1.skeleton} />
            <skinnedMesh name="Cube102_2" geometry={nodes.Cube102_2.geometry} material={materials.Tribal_Gold} skeleton={nodes.Cube102_2.skeleton} />
            <skinnedMesh name="Cube102_3" geometry={nodes.Cube102_3.geometry} material={materials.Eye_White} skeleton={nodes.Cube102_3.skeleton} />
            <skinnedMesh name="Cube102_4" geometry={nodes.Cube102_4.geometry} material={materials.Eye_Black} skeleton={nodes.Cube102_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/standing/Tribal-transformed.glb')
