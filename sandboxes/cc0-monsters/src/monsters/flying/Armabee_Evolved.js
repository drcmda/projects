import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Armabee_Evolved-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Armabee_Evolved">
            <skinnedMesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.Armabee_Main} skeleton={nodes.Cube001.skeleton} />
            <skinnedMesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials.Armabee_Secondary} skeleton={nodes.Cube001_1.skeleton} />
            <skinnedMesh name="Cube001_2" geometry={nodes.Cube001_2.geometry} material={materials.Tongue} skeleton={nodes.Cube001_2.skeleton} />
            <skinnedMesh name="Cube001_3" geometry={nodes.Cube001_3.geometry} material={materials.Teeth} skeleton={nodes.Cube001_3.skeleton} />
            <skinnedMesh name="Cube001_4" geometry={nodes.Cube001_4.geometry} material={materials.Armabee_Main} skeleton={nodes.Cube001_4.skeleton} />
            <skinnedMesh name="Cube001_5" geometry={nodes.Cube001_5.geometry} material={materials.Eye_White} skeleton={nodes.Cube001_5.skeleton} />
            <skinnedMesh name="Cube001_6" geometry={nodes.Cube001_6.geometry} material={materials.Wings} skeleton={nodes.Cube001_6.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Armabee_Evolved-transformed.glb')
