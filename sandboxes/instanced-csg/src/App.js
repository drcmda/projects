import { MathUtils } from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Instances, Instance, Environment } from '@react-three/drei'
import { Subtraction, Brush } from '@react-three/csg'
import niceColors from 'nice-color-palettes'
import { BoxBlendGeometry, HeartGeometry } from './geometries'

const positions = Array.from({ length: 1000 }, () => ({
  color: niceColors[17][Math.floor(Math.random() * 5)],
  position: [MathUtils.randFloatSpread(7), MathUtils.randFloatSpread(7), MathUtils.randFloatSpread(7)],
  rotation: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2]
}))

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 0.1], fov: 90 }}>
      <hemisphereLight intensity={1} groundColor="white" />
      <directionalLight position={[10, -15, -10]} intensity={2} />
      <directionalLight position={[5, 10, 15]} intensity={1} />
      <Instances limit={1000}>
        <Subtraction>
          <Brush a rotation={[0, Math.PI / 2, 0]} position={[0, 0.4, 0.4]}>
            <BoxBlendGeometry depth={0.4} />
          </Brush>
          <Brush b position={[0, 0.4, 0.4]}>
            <HeartGeometry radius={0.5} depth={2} />
          </Brush>
        </Subtraction>
        <meshStandardMaterial roughness={1} />
        {positions.map((props, index) => (
          <Instance key={index} scale={0.25} {...props} matrixAutoUpdate={false} onUpdate={(self) => self.updateMatrix()} />
        ))}
      </Instances>
      <OrbitControls />
      <Environment preset="city" />
    </Canvas>
  )
}
