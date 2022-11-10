import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Hywirl-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Hywirl">
            <skinnedMesh name="Sphere" geometry={nodes.Sphere.geometry} material={materials.Hywirl_Main} skeleton={nodes.Sphere.skeleton} />
            <skinnedMesh name="Sphere_1" geometry={nodes.Sphere_1.geometry} material={materials.Eye_Black} skeleton={nodes.Sphere_1.skeleton} />
            <skinnedMesh name="Sphere_2" geometry={nodes.Sphere_2.geometry} material={materials.Eye_White} skeleton={nodes.Sphere_2.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Hywirl-transformed.glb')
