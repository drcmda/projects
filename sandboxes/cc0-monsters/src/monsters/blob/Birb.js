import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/Birb-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Birb_Blob">
            <skinnedMesh name="Cube172" geometry={nodes.Cube172.geometry} material={materials.Birb_Main} skeleton={nodes.Cube172.skeleton} />
            <skinnedMesh name="Cube172_1" geometry={nodes.Cube172_1.geometry} material={materials.Birb_Beak} skeleton={nodes.Cube172_1.skeleton} />
            <skinnedMesh name="Cube172_2" geometry={nodes.Cube172_2.geometry} material={materials.Birb_Secondary} skeleton={nodes.Cube172_2.skeleton} />
            <skinnedMesh name="Cube172_3" geometry={nodes.Cube172_3.geometry} material={materials.Eye_White} skeleton={nodes.Cube172_3.skeleton} />
            <skinnedMesh name="Cube172_4" geometry={nodes.Cube172_4.geometry} material={materials.Eye_Black} skeleton={nodes.Cube172_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/Birb-transformed.glb')
