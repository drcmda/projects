import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Yes', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/standing/Frog-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Frog">
            <skinnedMesh name="Cube057" geometry={nodes.Cube057.geometry} material={materials.Frog_Main} skeleton={nodes.Cube057.skeleton} />
            <skinnedMesh name="Cube057_1" geometry={nodes.Cube057_1.geometry} material={materials.Frog_Secondary} skeleton={nodes.Cube057_1.skeleton} />
            <skinnedMesh name="Cube057_2" geometry={nodes.Cube057_2.geometry} material={materials.Eye_Black} skeleton={nodes.Cube057_2.skeleton} />
            <skinnedMesh name="Cube057_3" geometry={nodes.Cube057_3.geometry} material={materials.Eye_White} skeleton={nodes.Cube057_3.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/standing/Frog-transformed.glb')
