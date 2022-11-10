import * as THREE from 'three'
import { extend, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const MeshRefractionMaterialImpl = shaderMaterial(
  {
    uRefractPower: 0.3,
    uSceneTex: null,
    uTransparent: 0.5,
    uNoise: 0.03,
    uHue: 0.0,
    uSat: 0.0,
    winResolution: new THREE.Vector2()
  },
  `varying vec2 vUv;
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
  `uniform float uTransparent;
  uniform vec2 winResolution;
  uniform float uRefractPower;
  uniform float uNoise;
  uniform float uHue;
  uniform float uSat;
  
  // uniform samplerCube uEnvMap;
  uniform sampler2D uSceneTex;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec3 vWorldPos;
  
  float random(vec2 p){
    return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  vec3 sat(vec3 rgb, float adjustment)
{
    // Algorithm from Chapter 16 of OpenGL Shading Language
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    vec3 intensity = vec3(dot(rgb, W));
    return mix(intensity, rgb, adjustment);
}

  vec3 hue( vec3 color, float hueAdjust ){

    const vec3  kRGBToYPrime = vec3 (0.299, 0.587, 0.114);
    const vec3  kRGBToI      = vec3 (0.596, -0.275, -0.321);
    const vec3  kRGBToQ      = vec3 (0.212, -0.523, 0.311);

    const vec3  kYIQToR     = vec3 (1.0, 0.956, 0.621);
    const vec3  kYIQToG     = vec3 (1.0, -0.272, -0.647);
    const vec3  kYIQToB     = vec3 (1.0, -1.107, 1.704);

    float   YPrime  = dot (color, kRGBToYPrime);
    float   I       = dot (color, kRGBToI);
    float   Q       = dot (color, kRGBToQ);
    float   hue     = atan (Q, I);
    float   chroma  = sqrt (I * I + Q * Q);

    hue += hueAdjust;

    Q = chroma * sin (hue);
    I = chroma * cos (hue);

    vec3    yIQ   = vec3 (YPrime, I, Q);

    return vec3( dot (yIQ, kYIQToR), dot (yIQ, kYIQToG), dot (yIQ, kYIQToB) );

}
  
  struct Geometry {
    vec3 pos;
    vec3 posWorld;
    vec3 viewDir;
    vec3 viewDirWorld;
    vec3 normal;
    vec3 normalWorld;
  };

  void main() {
    vec2 uv = gl_FragCoord.xy / winResolution.xy;
    vec2 refractNormal = vNormal.xy * (1.0 - vNormal.z * 0.85);
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
    gl_FragColor = vec4(hue(refractCol, uHue), 1.0);
    //#include <tonemapping_fragment>
    //#include <encodings_fragment>
  }`
)

export function MeshRefractionMaterial(props) {
  extend({ MeshRefractionMaterial: MeshRefractionMaterialImpl })
  const size = useThree((state) => state.size)
  const dpr = useThree((state) => state.viewport.dpr)
  return <meshRefractionMaterial winResolution={[size.width * dpr, size.height * dpr]} {...props} />
}
