import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Flying_Idle', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Ghost_Skull-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Ghost_Skull">
            <skinnedMesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.Ghost_Secondary} skeleton={nodes.Cube001.skeleton} />
            <skinnedMesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials.Ghost_Main} skeleton={nodes.Cube001_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Ghost_Skull-transformed.glb')
