import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/Dog-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Dog_Blob">
            <skinnedMesh name="Cube015" geometry={nodes.Cube015.geometry} material={materials.Dog_Main} skeleton={nodes.Cube015.skeleton} />
            <skinnedMesh name="Cube015_1" geometry={nodes.Cube015_1.geometry} material={materials.Dog_Secondary} skeleton={nodes.Cube015_1.skeleton} />
            <skinnedMesh name="Cube015_2" geometry={nodes.Cube015_2.geometry} material={materials.Eye_Black} skeleton={nodes.Cube015_2.skeleton} />
            <skinnedMesh name="Cube015_3" geometry={nodes.Cube015_3.geometry} material={materials.Eye_White} skeleton={nodes.Cube015_3.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/Dog-transformed.glb')
