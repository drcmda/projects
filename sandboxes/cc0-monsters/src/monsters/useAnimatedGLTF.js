import { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function useAnimatedGLTF(url, play) {
  const { animations, ...rest } = useGLTF(url)
  const { ref, actions } = useAnimations(animations)
  useEffect(() => {
    const action = actions[play]
    if (action) {
      action.timeScale = 0.5 + Math.random() * 0.5
      action.reset().fadeIn(0.5).play()
      return () => action.fadeOut(0.5)
    }
  }, [play])
  return { ref, animations, ...rest }
}

useAnimatedGLTF.preload = useGLTF.preload
