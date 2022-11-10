import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Wave', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/standing/Alien-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Alien">
            <skinnedMesh name="Cube116" geometry={nodes.Cube116.geometry} material={materials.Alien_Main} skeleton={nodes.Cube116.skeleton} />
            <skinnedMesh name="Cube116_1" geometry={nodes.Cube116_1.geometry} material={materials.Alien_Secondary} skeleton={nodes.Cube116_1.skeleton} />
            <skinnedMesh name="Cube116_2" geometry={nodes.Cube116_2.geometry} material={materials.Eye_White} skeleton={nodes.Cube116_2.skeleton} />
            <skinnedMesh name="Cube116_3" geometry={nodes.Cube116_3.geometry} material={materials.Eye_Black} skeleton={nodes.Cube116_3.skeleton} />
            <skinnedMesh name="Cube116_4" geometry={nodes.Cube116_4.geometry} material={materials.Tongue} skeleton={nodes.Cube116_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/standing/Alien-transformed.glb')
