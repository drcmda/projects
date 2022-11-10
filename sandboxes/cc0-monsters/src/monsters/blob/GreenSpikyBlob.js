import { useAnimatedGLTF } from '../useAnimatedGLTF'

export function Model({ play = 'Dance', ...props }) {
  const { ref, nodes, materials } = useAnimatedGLTF('/blob/GreenSpikyBlob-transformed.glb', play)
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="GreenSpiky_Blob">
            <skinnedMesh name="Sphere000" geometry={nodes.Sphere000.geometry} material={materials.Green_Main} skeleton={nodes.Sphere000.skeleton} />
            <skinnedMesh name="Sphere000_1" geometry={nodes.Sphere000_1.geometry} material={materials.Eye_White} skeleton={nodes.Sphere000_1.skeleton} />
          </group>
          <group name="GreenSpiky_Blob002">
            <skinnedMesh name="Sphere001" geometry={nodes.Sphere001.geometry} material={materials.Eye_Black} skeleton={nodes.Sphere001.skeleton} />
            <skinnedMesh name="Sphere001_1" geometry={nodes.Sphere001_1.geometry} material={materials.Eye_White} skeleton={nodes.Sphere001_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/blob/GreenSpikyBlob-transformed.glb')
