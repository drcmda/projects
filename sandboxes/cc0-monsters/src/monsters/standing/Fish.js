import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'HitReact', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/standing/Fish-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Fish">
            <skinnedMesh name="Sphere026" geometry={nodes.Sphere026.geometry} material={materials.Fish_Main} skeleton={nodes.Sphere026.skeleton} />
            <skinnedMesh name="Sphere026_1" geometry={nodes.Sphere026_1.geometry} material={materials.Fish_Secondary} skeleton={nodes.Sphere026_1.skeleton} />
            <skinnedMesh name="Sphere026_2" geometry={nodes.Sphere026_2.geometry} material={materials.Eye_Black} skeleton={nodes.Sphere026_2.skeleton} />
            <skinnedMesh name="Sphere026_3" geometry={nodes.Sphere026_3.geometry} material={materials.Eye_White} skeleton={nodes.Sphere026_3.skeleton} />
            <skinnedMesh name="Sphere026_4" geometry={nodes.Sphere026_4.geometry} material={materials.Mouth} skeleton={nodes.Sphere026_4.skeleton} />
            <skinnedMesh name="Sphere026_5" geometry={nodes.Sphere026_5.geometry} material={materials.Fish_Flaps} skeleton={nodes.Sphere026_5.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/standing/Fish-transformed.glb')
