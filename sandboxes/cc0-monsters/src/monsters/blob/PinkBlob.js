import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/PinkBlob-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Pink_Blob">
            <skinnedMesh name="Cube010" geometry={nodes.Cube010.geometry} material={materials.Pink_Main} skeleton={nodes.Cube010.skeleton} />
            <skinnedMesh name="Cube010_1" geometry={nodes.Cube010_1.geometry} material={materials.Pink_Secondary} skeleton={nodes.Cube010_1.skeleton} />
          </group>
          <group name="Pink_Blob001">
            <skinnedMesh name="Cube000" geometry={nodes.Cube000.geometry} material={materials.Eye_Black} skeleton={nodes.Cube000.skeleton} />
            <skinnedMesh name="Cube000_1" geometry={nodes.Cube000_1.geometry} material={materials.Eye_White} skeleton={nodes.Cube000_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/PinkBlob-transformed.glb')
