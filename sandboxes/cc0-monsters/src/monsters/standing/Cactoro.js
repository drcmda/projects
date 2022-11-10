import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Jump', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/standing/Cactoro-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Cactoro">
            <skinnedMesh name="Cube120" geometry={nodes.Cube120.geometry} material={materials.Cactoro_Main} skeleton={nodes.Cube120.skeleton} />
            <skinnedMesh name="Cube120_1" geometry={nodes.Cube120_1.geometry} material={materials.Cactoro_Secondary} skeleton={nodes.Cube120_1.skeleton} />
            <skinnedMesh name="Cube120_2" geometry={nodes.Cube120_2.geometry} material={materials.Cactoro_Red} skeleton={nodes.Cube120_2.skeleton} />
            <skinnedMesh name="Cube120_3" geometry={nodes.Cube120_3.geometry} material={materials.Eye_Black} skeleton={nodes.Cube120_3.skeleton} />
            <skinnedMesh name="Cube120_4" geometry={nodes.Cube120_4.geometry} material={materials.Eye_White} skeleton={nodes.Cube120_4.skeleton} />
            <skinnedMesh name="Cube120_5" geometry={nodes.Cube120_5.geometry} material={materials.Cactoro_Main} skeleton={nodes.Cube120_5.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/standing/Cactoro-transformed.glb')
