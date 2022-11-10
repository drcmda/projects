import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Alpaking_Evolved-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Alpaking_Evolved">
            <skinnedMesh name="Sphere001" geometry={nodes.Sphere001.geometry} material={materials.Alpaking_Main} skeleton={nodes.Sphere001.skeleton} />
            <skinnedMesh
              name="Sphere001_1"
              geometry={nodes.Sphere001_1.geometry}
              material={materials.Alpaking_Secondary}
              skeleton={nodes.Sphere001_1.skeleton}
            />
            <skinnedMesh name="Sphere001_2" geometry={nodes.Sphere001_2.geometry} material={materials.Eye_Black} skeleton={nodes.Sphere001_2.skeleton} />
            <skinnedMesh name="Sphere001_3" geometry={nodes.Sphere001_3.geometry} material={materials.Eye_White} skeleton={nodes.Sphere001_3.skeleton} />
            <skinnedMesh name="Sphere001_4" geometry={nodes.Sphere001_4.geometry} material={materials.Wings} skeleton={nodes.Sphere001_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Alpaking_Evolved-transformed.glb')
