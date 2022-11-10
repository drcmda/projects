import * as THREE from 'three'
import { extend, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const MeshRefractionMaterialImpl = shaderMaterial(
  {
    uRefractPower: 0.3,
    uRefractNormal: 0.85,
    uSceneTex: null,
    uTransparent: 0.5,
    uNoise: 0.03,
    uSat: 0.0,
    uIntensity: 1.0,
    winResolution: new THREE.Vector2()
  },
  /*glsl*/ `varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec3 vWorldPos;
  
  void main() {
    vec3 pos = position;
    vec4 worldPos = modelMatrix * vec4( pos, 1.0 );
    vec4 mvPosition = viewMatrix * worldPos;
    gl_Position = projectionMatrix * mvPosition;
    vec3 transformedNormal = normalMatrix * normal;
    vec3 normal = normalize( transformedNormal );
    vUv = uv;
    vNormal = normal;
    vViewPos = -mvPosition.xyz;
    vWorldPos = worldPos.xyz;
  }`,
  /*glsl*/ `uniform float uTransparent;
  uniform vec2 winResolution;
  uniform float uRefractPower;
  uniform float uRefractNormal;
  uniform float uNoise;  
  uniform float uSat;
  uniform float uIntensity;
  uniform sampler2D uSceneTex;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec3 vWorldPos;
  
  float random(vec2 p) {
    return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  vec3 sat(vec3 rgb, float adjustment) {    
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    vec3 intensity = vec3(dot(rgb, W));
    return mix(intensity, rgb, adjustment);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / winResolution.xy;
    vec2 refractNormal = vNormal.xy * (1.0 - vNormal.z * uRefractNormal);
    vec3 refractCol = vec3( 0.0 );

    float slide;
    vec2 refractUvR;
    vec2 refractUvG;
    vec2 refractUvB;
    #pragma unroll_loop_start
    for ( int i = 0; i < 8; i ++ ) {
      slide = float(UNROLLED_LOOP_INDEX) / float(8) * 0.1 + random(uv) * uNoise;
      refractUvR = uv - refractNormal * ( uRefractPower + slide * 1.0 ) * uTransparent;
      refractUvG = uv - refractNormal * ( uRefractPower + slide * 2.0 ) * uTransparent;
      refractUvB = uv - refractNormal * ( uRefractPower + slide * 3.0 ) * uTransparent;
      refractCol.r += texture2D( uSceneTex, refractUvR ).r;
      refractCol.g += texture2D( uSceneTex, refractUvG ).g;
      refractCol.b += texture2D( uSceneTex, refractUvB ).b;
      refractCol = sat(refractCol, uSat);
    }
    #pragma unroll_loop_end

    refractCol /= float( 8 );
    gl_FragColor = vec4(refractCol * uIntensity, 1.0);
    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }`
)

export function MeshRefractionMaterial(props) {
  extend({ MeshRefractionMaterial: MeshRefractionMaterialImpl })
  const { size, viewport } = useThree()
  return <meshRefractionMaterial winResolution={[size.width * viewport.dpr, size.height * viewport.dpr]} {...props} />
}
