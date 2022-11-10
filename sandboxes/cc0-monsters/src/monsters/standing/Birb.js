import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Punch', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/standing/Birb-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Birb">
            <skinnedMesh name="Cube183" geometry={nodes.Cube183.geometry} material={materials.Birb_Main} skeleton={nodes.Cube183.skeleton} />
            <skinnedMesh name="Cube183_1" geometry={nodes.Cube183_1.geometry} material={materials.Birb_Secondary} skeleton={nodes.Cube183_1.skeleton} />
            <skinnedMesh name="Cube183_2" geometry={nodes.Cube183_2.geometry} material={materials.Birb_Beak} skeleton={nodes.Cube183_2.skeleton} />
            <skinnedMesh name="Cube183_3" geometry={nodes.Cube183_3.geometry} material={materials.Eye_White} skeleton={nodes.Cube183_3.skeleton} />
            <skinnedMesh name="Cube183_4" geometry={nodes.Cube183_4.geometry} material={materials.Eye_Black} skeleton={nodes.Cube183_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/standing/Birb-transformed.glb')
