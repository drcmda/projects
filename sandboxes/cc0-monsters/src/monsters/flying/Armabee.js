import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Fast_Flying', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/flying/Armabee-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Armabee">
            <skinnedMesh name="Sphere018" geometry={nodes.Sphere018.geometry} material={materials.Armabee_Main} skeleton={nodes.Sphere018.skeleton} />
            <skinnedMesh
              name="Sphere018_1"
              geometry={nodes.Sphere018_1.geometry}
              material={materials.Armabee_Secondary}
              skeleton={nodes.Sphere018_1.skeleton}
            />
            <skinnedMesh name="Sphere018_2" geometry={nodes.Sphere018_2.geometry} material={materials.Armabee_Main} skeleton={nodes.Sphere018_2.skeleton} />
            <skinnedMesh name="Sphere018_3" geometry={nodes.Sphere018_3.geometry} material={materials.Eye_White} skeleton={nodes.Sphere018_3.skeleton} />
            <skinnedMesh name="Sphere018_4" geometry={nodes.Sphere018_4.geometry} material={materials.Wings} skeleton={nodes.Sphere018_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/flying/Armabee-transformed.glb')
