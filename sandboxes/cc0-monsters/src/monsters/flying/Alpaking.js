import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Alpaking-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Alpaking">
            <skinnedMesh name="Sphere052" geometry={nodes.Sphere052.geometry} material={materials.Alpaking_Main} skeleton={nodes.Sphere052.skeleton} />
            <skinnedMesh
              name="Sphere052_1"
              geometry={nodes.Sphere052_1.geometry}
              material={materials.Alpaking_Secondary}
              skeleton={nodes.Sphere052_1.skeleton}
            />
            <skinnedMesh name="Sphere052_2" geometry={nodes.Sphere052_2.geometry} material={materials.Eye_Black} skeleton={nodes.Sphere052_2.skeleton} />
            <skinnedMesh name="Sphere052_3" geometry={nodes.Sphere052_3.geometry} material={materials.Eye_White} skeleton={nodes.Sphere052_3.skeleton} />
            <skinnedMesh name="Sphere052_4" geometry={nodes.Sphere052_4.geometry} material={materials.Wings} skeleton={nodes.Sphere052_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Alpaking-transformed.glb')
