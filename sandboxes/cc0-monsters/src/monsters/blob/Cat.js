import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/Cat-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Cat_Blob">
            <skinnedMesh name="Cube187" geometry={nodes.Cube187.geometry} material={materials.Cat_Main} skeleton={nodes.Cube187.skeleton} />
            <skinnedMesh name="Cube187_1" geometry={nodes.Cube187_1.geometry} material={materials.Cat_Secondary} skeleton={nodes.Cube187_1.skeleton} />
            <skinnedMesh name="Cube187_2" geometry={nodes.Cube187_2.geometry} material={materials.Ears} skeleton={nodes.Cube187_2.skeleton} />
            <skinnedMesh name="Cube187_3" geometry={nodes.Cube187_3.geometry} material={materials.Eye_Black} skeleton={nodes.Cube187_3.skeleton} />
            <skinnedMesh name="Cube187_4" geometry={nodes.Cube187_4.geometry} material={materials.Eye_White} skeleton={nodes.Cube187_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/Cat-transformed.glb')
