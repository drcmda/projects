import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/Fish-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Fish_Blob">
            <skinnedMesh name="Sphere039" geometry={nodes.Sphere039.geometry} material={materials.Fish_Main} skeleton={nodes.Sphere039.skeleton} />
            <skinnedMesh name="Sphere039_1" geometry={nodes.Sphere039_1.geometry} material={materials.Fish_Secondary} skeleton={nodes.Sphere039_1.skeleton} />
            <skinnedMesh name="Sphere039_2" geometry={nodes.Sphere039_2.geometry} material={materials.Fish_Flaps} skeleton={nodes.Sphere039_2.skeleton} />
            <skinnedMesh name="Sphere039_3" geometry={nodes.Sphere039_3.geometry} material={materials.Tongue} skeleton={nodes.Sphere039_3.skeleton} />
          </group>
          <group name="Fish_Blob001">
            <skinnedMesh name="Sphere000" geometry={nodes.Sphere000.geometry} material={materials.Eye_Black} skeleton={nodes.Sphere000.skeleton} />
            <skinnedMesh name="Sphere000_1" geometry={nodes.Sphere000_1.geometry} material={materials.Eye_White} skeleton={nodes.Sphere000_1.skeleton} />
          </group>
          <skinnedMesh name="Fish_Blob002" geometry={nodes.Fish_Blob002.geometry} material={materials.Eye_White} skeleton={nodes.Fish_Blob002.skeleton} />
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/Fish-transformed.glb')
