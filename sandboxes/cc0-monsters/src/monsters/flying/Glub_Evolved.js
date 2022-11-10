import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Glub_Evolved-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Glub_Evolved">
            <skinnedMesh name="Sphere043" geometry={nodes.Sphere043.geometry} material={materials.Eye_Black} skeleton={nodes.Sphere043.skeleton} />
            <skinnedMesh name="Sphere043_1" geometry={nodes.Sphere043_1.geometry} material={materials.Eye_White} skeleton={nodes.Sphere043_1.skeleton} />
            <skinnedMesh name="Sphere043_2" geometry={nodes.Sphere043_2.geometry} material={materials.Glub_Main} skeleton={nodes.Sphere043_2.skeleton} />
            <skinnedMesh name="Sphere043_3" geometry={nodes.Sphere043_3.geometry} material={materials.Wings} skeleton={nodes.Sphere043_3.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Glub_Evolved-transformed.glb')
