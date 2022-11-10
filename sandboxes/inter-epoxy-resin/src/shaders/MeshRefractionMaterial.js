import * as THREE from 'three'
import { extend, useThree } from '@react-three/fiber'

class MeshRefractionMaterialImpl extends THREE.MeshPhysicalMaterial {
  constructor(args) {
    super(args)

    this.uniforms = {
      uRefractPower: { value: 0.3 },
      uRefractNormal: { value: 0.85 },
      uSceneTex: { value: null },
      uTransparent: { value: 0.5 },
      uNoise: { value: 0.03 },
      uColor: { value: new THREE.Color('white') },
      uSat: { value: 0.0 },
      uIntensity: { value: 1.0 },
      winResolution: { value: new THREE.Vector2() }
    }

    this.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ...this.uniforms
      }

      shader.fragmentShader = shader.fragmentShader.replace(
        'outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;',
        ''
      )

      shader.fragmentShader =
        `uniform float uTransparent;
      uniform vec2 winResolution;
      uniform float uRefractPower;
      uniform float uRefractNormal;
      uniform float uNoise;  
      uniform float uSat;      
      uniform float uIntensity;
      uniform vec3 uColor;
      uniform sampler2D uSceneTex;      
      
      float random(vec2 p) {
        return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }
    
      vec3 sat(vec3 rgb, float adjustment) {    
        const vec3 W = vec3(0.2125, 0.7154, 0.0721);
        vec3 intensity = vec3(dot(rgb, W));
        return mix(intensity, rgb, adjustment);
      }
      ` + shader.fragmentShader
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <output_fragment>',
        `vec2 uv = gl_FragCoord.xy / winResolution.xy;
        vec2 refractNormal = vNormal.xy * (1.0 - vNormal.z * uRefractNormal);
        vec3 refractCol = vec3( 0.0 );

        float slide;
        vec2 refractUvR;
        vec2 refractUvG;
        vec2 refractUvB;
        #pragma unroll_loop_start
        for ( int i = 0; i < 16; i ++ ) {
          slide = float(UNROLLED_LOOP_INDEX) / float(16) * 0.1 + random(uv) * uNoise;
          refractUvR = uv - refractNormal * ( uRefractPower + slide * 1.0 ) * uTransparent;
          refractUvG = uv - refractNormal * ( uRefractPower + slide * 2.0 ) * uTransparent;
          refractUvB = uv - refractNormal * ( uRefractPower + slide * 3.0 ) * uTransparent;
          refractCol.r += texture2D( uSceneTex, refractUvR ).r;
          refractCol.g += texture2D( uSceneTex, refractUvG ).g;
          refractCol.b += texture2D( uSceneTex, refractUvB ).b;
          refractCol = sat(refractCol, uSat);
        }
        #pragma unroll_loop_end
    
        refractCol /= float( 16 );
        
        outgoingLight = mix(refractCol * uIntensity, uColor, 0.25) * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
        #include <output_fragment>`
      )
    }

    Object.keys(this.uniforms).forEach((name) =>
      Object.defineProperty(this, name, {
        get: () => this.uniforms[name].value,
        set: (v) => (this.uniforms[name].value = v)
      })
    )
  }
}

extend({ MeshRefractionMaterial: MeshRefractionMaterialImpl })

export function MeshRefractionMaterial(props) {
  const { size, viewport } = useThree()
  return <meshRefractionMaterial winResolution={[size.width * viewport.dpr, size.height * viewport.dpr]} {...props} />
}
