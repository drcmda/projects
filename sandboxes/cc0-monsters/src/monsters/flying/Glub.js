import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Glub-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Glub">
            <skinnedMesh name="Sphere051" geometry={nodes.Sphere051.geometry} material={materials.Eye_Black} skeleton={nodes.Sphere051.skeleton} />
            <skinnedMesh name="Sphere051_1" geometry={nodes.Sphere051_1.geometry} material={materials.Eye_White} skeleton={nodes.Sphere051_1.skeleton} />
            <skinnedMesh name="Sphere051_2" geometry={nodes.Sphere051_2.geometry} material={materials.Glub_Main} skeleton={nodes.Sphere051_2.skeleton} />
            <skinnedMesh name="Sphere051_3" geometry={nodes.Sphere051_3.geometry} material={materials.Wings} skeleton={nodes.Sphere051_3.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Glub-transformed.glb')
