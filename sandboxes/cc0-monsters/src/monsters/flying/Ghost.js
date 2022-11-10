import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Ghost-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Ghost">
            <skinnedMesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.Ghost_Main} skeleton={nodes.Cube001.skeleton} />
            <skinnedMesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials.Eye_Black} skeleton={nodes.Cube001_1.skeleton} />
            <skinnedMesh name="Cube001_2" geometry={nodes.Cube001_2.geometry} material={materials.Eye_White} skeleton={nodes.Cube001_2.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Ghost-transformed.glb')
