import { EffectComposer, SSR, Bloom } from '@react-three/postprocessing'
import { useControls, folder } from 'leva'

export function Effects() {
  const props = useControls({
    enabled: true,
    intensity: { value: 1, min: 0, max: 5 },
    power: { value: 0.5, min: 0, max: 5 },
    roughnessFadeOut: { value: 1, min: 0, max: 1 },
    thickness: { value: 10, min: 0, max: 10 },
    ior: { value: 1.45, min: 0, max: 2 },
    resolutionScale: { value: 1, min: 0, max: 1 },
    steps: folder(
      {
        rayStep: { value: 0.75, min: 0, max: 2 },
        maxDepthDifference: { value: 1.5, min: 0, max: 5, step: 0.01 },
        MAX_STEPS: { value: 20, min: 0, max: 20, step: 1 },
        NUM_BINARY_SEARCH_STEPS: { value: 7, min: 0, max: 10, step: 1 }
      },
      { collapsed: true }
    ),
    blur: folder(
      {
        useBlur: true,
        blurSize: { value: 1024, min: 128, max: 2024, step: 128 },
        blurKernelSize: { value: 3, min: 0, max: 5, step: 1 },
        depthBlur: { value: 0.04, min: 0, max: 1 },
        maxDepth: { value: 1, min: 0, max: 1 }
      },
      { collapsed: true }
    ),
    jitter: folder(
      {
        enableJittering: true,
        jitter: { value: 0.0, min: 0, max: 1 },
        jitterSpread: { value: 0.5, min: 0, max: 15 }
      },
      { collapsed: true }
    )
  })
  return (
    <EffectComposer disableNormalPass>
      <SSR {...props} />
      <Bloom mipmapBlur luminanceSmoothing={0} intensity={1.25} />
    </EffectComposer>
  )
}
