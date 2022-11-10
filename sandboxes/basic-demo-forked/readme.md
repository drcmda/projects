```jsx
function Kitchen({ floor, ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/kitchen-transformed.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.base.geometry} material={materials.base} material-side={THREE.FrontSide} />
      <mesh castShadow receiveShadow position={[-12.4, -7.07, -2.87]} rotation={[-Math.PI / 2, 0, 0]} geometry={nodes.floor.geometry}>
        <MeshReflectorMaterial
          color={floor}
          resolution={512}
          mirror={0.2}
          mixBlur={0.9}
          mixStrength={2.2}
          blur={[400, 50]}
          envMapIntensity={1}
          /*map={materials.floor.map}
          roughnessMap={materials.floor.roughnessMap}
          normalMap={materials.floor.normalMap}*/
        />
      </mesh>
    </group>
  )
}
```
