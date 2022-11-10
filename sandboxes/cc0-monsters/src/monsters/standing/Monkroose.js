import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'No', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/standing/Monkroose-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Monkroose">
            <skinnedMesh name="Cube110" geometry={nodes.Cube110.geometry} material={materials.Monkroose_Main} skeleton={nodes.Cube110.skeleton} />
            <skinnedMesh name="Cube110_1" geometry={nodes.Cube110_1.geometry} material={materials.Monkroose_Secondary} skeleton={nodes.Cube110_1.skeleton} />
            <skinnedMesh name="Cube110_2" geometry={nodes.Cube110_2.geometry} material={materials.Monkroose_Ears} skeleton={nodes.Cube110_2.skeleton} />
            <skinnedMesh name="Cube110_3" geometry={nodes.Cube110_3.geometry} material={materials.Eye_Black} skeleton={nodes.Cube110_3.skeleton} />
            <skinnedMesh name="Cube110_4" geometry={nodes.Cube110_4.geometry} material={materials.Eye_White} skeleton={nodes.Cube110_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/standing/Monkroose-transformed.glb')
