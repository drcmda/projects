import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/Chicken-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Chicken_Blob">
            <skinnedMesh name="Cube211" geometry={nodes.Cube211.geometry} material={materials.Chicken_Main} skeleton={nodes.Cube211.skeleton} />
            <skinnedMesh name="Cube211_1" geometry={nodes.Cube211_1.geometry} material={materials.Chicken_Red} skeleton={nodes.Cube211_1.skeleton} />
            <skinnedMesh name="Cube211_2" geometry={nodes.Cube211_2.geometry} material={materials.Beak} skeleton={nodes.Cube211_2.skeleton} />
            <skinnedMesh name="Cube211_3" geometry={nodes.Cube211_3.geometry} material={materials.Eye_Black} skeleton={nodes.Cube211_3.skeleton} />
            <skinnedMesh name="Cube211_4" geometry={nodes.Cube211_4.geometry} material={materials.Eye_White} skeleton={nodes.Cube211_4.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/Chicken-transformed.glb')
