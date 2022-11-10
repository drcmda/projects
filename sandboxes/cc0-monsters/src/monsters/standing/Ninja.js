import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Walk', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/standing/Ninja-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Ninja">
            <skinnedMesh name="Cube092" geometry={nodes.Cube092.geometry} material={materials.Ninja_Main} skeleton={nodes.Cube092.skeleton} />
            <skinnedMesh name="Cube092_1" geometry={nodes.Cube092_1.geometry} material={materials.Ninja_Secondary} skeleton={nodes.Cube092_1.skeleton} />
            <skinnedMesh name="Cube092_2" geometry={nodes.Cube092_2.geometry} material={materials.Belt} skeleton={nodes.Cube092_2.skeleton} />
            <skinnedMesh name="Cube092_3" geometry={nodes.Cube092_3.geometry} material={materials.Gold} skeleton={nodes.Cube092_3.skeleton} />
            <skinnedMesh name="Cube092_4" geometry={nodes.Cube092_4.geometry} material={materials.Eye_Black} skeleton={nodes.Cube092_4.skeleton} />
            <skinnedMesh name="Cube092_5" geometry={nodes.Cube092_5.geometry} material={materials.Eye_White} skeleton={nodes.Cube092_5.skeleton} />
            <skinnedMesh name="Cube092_6" geometry={nodes.Cube092_6.geometry} material={materials.Birb_Secondary} skeleton={nodes.Cube092_6.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/standing/Ninja-transformed.glb')
