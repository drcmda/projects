import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/GreenBlob-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <skinnedMesh name="Green_Blob" geometry={nodes.Green_Blob.geometry} material={materials.Green_Main} skeleton={nodes.Green_Blob.skeleton} />
          <group name="Green_Blob001">
            <skinnedMesh name="Cube000" geometry={nodes.Cube000.geometry} material={materials.Eye_Black} skeleton={nodes.Cube000.skeleton} />
            <skinnedMesh name="Cube000_1" geometry={nodes.Cube000_1.geometry} material={materials.Eye_White} skeleton={nodes.Cube000_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/GreenBlob-transformed.glb')
