import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/Orc-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Orc_Blob">
            <skinnedMesh name="Sphere016" geometry={nodes.Sphere016.geometry} material={materials.Orc_Main} skeleton={nodes.Sphere016.skeleton} />
            <skinnedMesh name="Sphere016_1" geometry={nodes.Sphere016_1.geometry} material={materials.Orc_Mouth} skeleton={nodes.Sphere016_1.skeleton} />
            <skinnedMesh name="Sphere016_2" geometry={nodes.Sphere016_2.geometry} material={materials.Orc_Hair} skeleton={nodes.Sphere016_2.skeleton} />
            <skinnedMesh name="Sphere016_3" geometry={nodes.Sphere016_3.geometry} material={materials.Eye_Black} skeleton={nodes.Sphere016_3.skeleton} />
            <skinnedMesh name="Sphere016_4" geometry={nodes.Sphere016_4.geometry} material={materials.Eye_White} skeleton={nodes.Sphere016_4.skeleton} />
            <skinnedMesh name="Sphere016_5" geometry={nodes.Sphere016_5.geometry} material={materials.Gold} skeleton={nodes.Sphere016_5.skeleton} />
            <skinnedMesh name="Sphere016_6" geometry={nodes.Sphere016_6.geometry} material={materials.Tongue} skeleton={nodes.Sphere016_6.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/Orc-transformed.glb')
