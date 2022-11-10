import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/Alien-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Alien_Blob">
            <skinnedMesh name="Cube144" geometry={nodes.Cube144.geometry} material={materials.Alien_Main} skeleton={nodes.Cube144.skeleton} />
            <skinnedMesh name="Cube144_1" geometry={nodes.Cube144_1.geometry} material={materials.Alien_Secondary} skeleton={nodes.Cube144_1.skeleton} />
          </group>
          <group name="Alien_Blob001">
            <skinnedMesh name="Cube000" geometry={nodes.Cube000.geometry} material={materials.Eye_Black} skeleton={nodes.Cube000.skeleton} />
            <skinnedMesh name="Cube000_1" geometry={nodes.Cube000_1.geometry} material={materials.Eye_White} skeleton={nodes.Cube000_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/Alien-transformed.glb')
