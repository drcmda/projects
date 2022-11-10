import { MathUtils } from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Instances, Model } from './Inst'

const positions = Array.from({ length: 1000 }, () => ({
  position: [MathUtils.randFloatSpread(10), MathUtils.randFloatSpread(10), MathUtils.randFloatSpread(10)],
  rotation: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2]
}))

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight />
      <directionalLight position={[10, 10, 10]} />
      <Instances>
        {positions.map((props, index) => (
          <Model key={index} scale={0.1} {...props} matrixAutoUpdate={false} onUpdate={(self) => self.updateMatrix()} />
        ))}
      </Instances>
      <OrbitControls />
      <Perf matrixUpdate />
    </Canvas>
  )
}
