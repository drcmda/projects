import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Goleling-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Goleling">
            <skinnedMesh name="Cube009" geometry={nodes.Cube009.geometry} material={materials.Goleling_Main} skeleton={nodes.Cube009.skeleton} />
            <skinnedMesh name="Cube009_1" geometry={nodes.Cube009_1.geometry} material={materials.Goleling_Secondary} skeleton={nodes.Cube009_1.skeleton} />
            <skinnedMesh name="Cube009_2" geometry={nodes.Cube009_2.geometry} material={materials.Eye_Black} skeleton={nodes.Cube009_2.skeleton} />
            <skinnedMesh name="Cube009_3" geometry={nodes.Cube009_3.geometry} material={materials.Eye_White} skeleton={nodes.Cube009_3.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Goleling-transformed.glb')
