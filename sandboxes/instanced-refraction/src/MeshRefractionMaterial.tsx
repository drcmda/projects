// Author: N8Programs
// https://github.com/N8python/diamonds

import * as THREE from 'three'
import * as React from 'react'
import { shaderMaterial } from '@react-three/drei'
import { MeshBVHUniformStruct, shaderStructs, shaderIntersectFunction } from 'three-mesh-bvh'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { extend, ReactThreeFiber, useThree } from '@react-three/fiber'
import { MeshBVH, SAH } from 'three-mesh-bvh'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshRefractionMaterial: typeof MeshRefractionMaterial_
    }
  }
}

type MeshRefractionMaterialProps = JSX.IntrinsicElements['shaderMaterial'] & {
  bounces?: number
  ior?: number
  fresnel?: number
  aberrationStrength?: number
  color?: ReactThreeFiber.Color
  resolution?: ReactThreeFiber.Vector2
  envMap?: THREE.CubeTexture | THREE.Texture
  frames?: number
  near?: number
  far?: number
  fastChroma?: boolean
}

const isCubeTexture = (def: THREE.CubeTexture | THREE.Texture): def is THREE.CubeTexture => def && (def as THREE.CubeTexture).isCubeTexture

export function MeshRefractionMaterial({
  frames = 1,
  resolution = 256,
  near = 0.1,
  far = 1000,
  aberrationStrength = 0,
  fastChroma = true,
  envMap,
  ...props
}: MeshRefractionMaterialProps) {
  extend({ MeshRefractionMaterial: MeshRefractionMaterial_ })

  const material = useRef()
  const { size } = useThree()

  const defines = useMemo(() => {
    const temp = {} as { [key: string]: string }
    if (envMap) {
      const isCubeMap = isCubeTexture(envMap)
      const w = (isCubeMap ? envMap.image[0]?.width : envMap.image.width) ?? 1024
      const cubeSize = w / 4
      const _lodMax = Math.floor(Math.log2(cubeSize))
      const _cubeSize = Math.pow(2, _lodMax)
      const width = 3 * Math.max(_cubeSize, 16 * 7)
      const height = 4 * _cubeSize

      if (isCubeMap) temp.ENVMAP_TYPE_CUBEM = ''
      temp.CUBEUV_TEXEL_WIDTH = `${1.0 / width}`
      temp.CUBEUV_TEXEL_HEIGHT = `${1.0 / height}`
      temp.CUBEUV_MAX_MIP = `${_lodMax}.0`
    }
    if (aberrationStrength > 0) temp.CHROMATIC_ABERRATIONS = ''
    if (fastChroma) temp.FAST_CHROMA = ''
    return temp
  }, [aberrationStrength, fastChroma])

  console.log(fastChroma, JSON.stringify(defines))

  useLayoutEffect(() => {
    const geometry = (material.current as any)?.__r3f?.parent?.geometry
    if (geometry) (material.current as any).bvh.updateFrom(new MeshBVH(geometry.toNonIndexed(), { lazyGeneration: false, strategy: SAH }))
  }, [])

  return (
    <meshRefractionMaterial
      // @ts-ignore
      key={JSON.stringify(defines)}
      // @ts-ignore
      defines={defines}
      ref={material}
      resolution={[size.width, size.height]}
      aberrationStrength={aberrationStrength}
      envMap={envMap}
      {...props}
    />
  )
}

export const MeshRefractionMaterial_ = shaderMaterial(
  {
    envMap: null,
    bounces: 3,
    ior: 2.4,
    correctMips: true,
    aberrationStrength: 0.01,
    fresnel: 0,
    bvh: new MeshBVHUniformStruct(),
    color: new THREE.Color('white'),
    resolution: new THREE.Vector2()
  },
  /*glsl*/ `
  #ifndef USE_COLOR
    uniform vec3 color;
  #endif
  varying vec3 vWorldPosition;  
  varying vec3 vNormal;
  varying mat4 projectionMatrixInv;
  varying mat4 viewMatrixInv;
  varying vec3 viewDirection;
  varying mat4 vInstanceMatrix;
  varying vec3 vColor;
  
  void main() {        
    vec4 transformedNormal = vec4(normal, 0.0);
    vec4 transformedPosition = vec4(position, 1.0);
    #ifdef USE_INSTANCING
      vInstanceMatrix = instanceMatrix;
      transformedNormal = instanceMatrix * transformedNormal;
      transformedPosition = instanceMatrix * transformedPosition;
    #else
      vInstanceMatrix = mat4(1.0);
    #endif

    vColor = color;
    #ifdef USE_INSTANCING_COLOR
      vColor *= instanceColor.rgb;
    #endif
  
    projectionMatrixInv = inverse(projectionMatrix);
    viewMatrixInv = inverse(viewMatrix);
  
    vWorldPosition = (modelMatrix * transformedPosition).xyz;    
    vNormal = (viewMatrixInv * vec4(normalMatrix * transformedNormal.xyz, 0.0)).xyz;
    viewDirection = normalize(vWorldPosition - cameraPosition);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * transformedPosition;
  }`,
  /*glsl*/ `
  #define ENVMAP_TYPE_CUBE_UV
  precision highp isampler2D;
  precision highp usampler2D;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
    
  #ifdef ENVMAP_TYPE_CUBEM
    uniform samplerCube envMap;
  #else
    uniform sampler2D envMap;
  #endif
    
  uniform float bounces;
  ${shaderStructs}
  ${shaderIntersectFunction}
  uniform BVH bvh;
  uniform float ior;
  uniform bool correctMips;
  uniform vec2 resolution;
  uniform float fresnel;
  uniform mat4 modelMatrix;
    
  uniform float aberrationStrength;
  varying mat4 projectionMatrixInv;
  varying mat4 viewMatrixInv;
  varying vec3 viewDirection;  
  varying mat4 vInstanceMatrix;
  varying vec3 vColor;
  
  float fresnelFunc(vec3 viewDirection, vec3 worldNormal) {
    return pow( 1.0 + dot( viewDirection, worldNormal), 10.0 );
  }
    
  vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 normal, float ior, mat4 modelMatrixInverse) {
    vec3 rayOrigin = ro;
    vec3 rayDirection = rd;
    rayDirection = refract(rayDirection, normal, 1.0 / ior);
    rayOrigin = vWorldPosition + rayDirection * 0.001;
    rayOrigin = (modelMatrixInverse * vec4(rayOrigin, 1.0)).xyz;
    rayDirection = normalize((modelMatrixInverse * vec4(rayDirection, 0.0)).xyz);
    for(float i = 0.0; i < bounces; i++) {
      uvec4 faceIndices = uvec4( 0u );
      vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
      vec3 barycoord = vec3( 0.0 );
      float side = 1.0;
      float dist = 0.0;
      bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
      vec3 hitPos = rayOrigin + rayDirection * max(dist - 0.001, 0.0);      
      vec3 tempDir = refract(rayDirection, faceNormal, ior);
      if (length(tempDir) != 0.0) {
        rayDirection = tempDir;
        break;
      }
      rayDirection = reflect(rayDirection, faceNormal);
      rayOrigin = hitPos + rayDirection * 0.01;
    }
    rayDirection = normalize((modelMatrix * vec4(rayDirection, 0.0)).xyz);
    return rayDirection;
  }
    
  #include <common>
  #include <cube_uv_reflection_fragment>
    
  #ifdef ENVMAP_TYPE_CUBEM
    vec4 textureGradient(samplerCube envMap, vec3 rayDirection, vec3 directionCamPerfect) {
      return textureGrad(envMap, rayDirection, dFdx(correctMips ? directionCamPerfect: rayDirection), dFdy(correctMips ? directionCamPerfect: rayDirection));
    }
  #else
    vec4 textureGradient(sampler2D envMap, vec3 rayDirection, vec3 directionCamPerfect) {
      vec2 uvv = equirectUv( rayDirection );
      vec2 smoothUv = equirectUv( directionCamPerfect );
      return textureGrad(envMap, uvv, dFdx(correctMips ? smoothUv : uvv), dFdy(correctMips ? smoothUv : uvv));
    }
  #endif
  
  void main() {
    mat4 modelMatrixInverse = inverse(modelMatrix * vInstanceMatrix);
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 directionCamPerfect = (projectionMatrixInv * vec4(uv * 2.0 - 1.0, 0.0, 1.0)).xyz;
    directionCamPerfect = (viewMatrixInv * vec4(directionCamPerfect, 0.0)).xyz;
    directionCamPerfect = normalize(directionCamPerfect);
    vec3 normal = vNormal;
    vec3 rayOrigin = cameraPosition;
    vec3 rayDirection = normalize(vWorldPosition - cameraPosition);
    vec3 finalColor;
    #ifdef CHROMATIC_ABERRATIONS
      vec3 rayDirectionG = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), modelMatrixInverse);
      #ifdef FAST_CHROMA 
        vec3 rayDirectionR = normalize(rayDirectionG + 1.0 * vec3(aberrationStrength / 2.0));
        vec3 rayDirectionB = normalize(rayDirectionG - 1.0 * vec3(aberrationStrength / 2.0));
      #else
        vec3 rayDirectionR = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 - aberrationStrength), 1.0), modelMatrixInverse);
        vec3 rayDirectionB = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 + aberrationStrength), 1.0), modelMatrixInverse);
      #endif
      float finalColorR = textureGradient(envMap, rayDirectionR, directionCamPerfect).r;
      float finalColorG = textureGradient(envMap, rayDirectionG, directionCamPerfect).g;
      float finalColorB = textureGradient(envMap, rayDirectionB, directionCamPerfect).b;
      finalColor = vec3(finalColorR, finalColorG, finalColorB) * vColor;
    #else
      rayDirection = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), modelMatrixInverse);
      finalColor = textureGradient(envMap, rayDirection, directionCamPerfect).rgb;    
      finalColor *= vColor;
    #endif
    float nFresnel = fresnelFunc(viewDirection, normal) * fresnel;
    gl_FragColor = vec4(mix(finalColor, vec3(1.0), nFresnel), 1.0);      
    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }`
)
