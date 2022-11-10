import { Canvas, useLoader } from '@react-three/fiber'
import { Bounds, Center, OrbitControls } from '@react-three/drei'
import { PCDLoader } from 'three-stdlib'

function Points(props) {
  const points = useLoader(PCDLoader, 'Zaghetto.pcd')
  return <primitive object={points} {...props} />
}

export default function App() {
  return (
    <Canvas>
      <Bounds fit clip observe>
        <Center>
          <Points rotation={[Math.PI, 0, 0]} material-size={0.001} material-color="white" />
        </Center>
      </Bounds>
      <OrbitControls />
    </Canvas>
  )
}
