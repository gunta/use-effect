import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying float vZ;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Create wave effect
    pos.z = sin(pos.x * 2.0 + uTime) * 0.1 + 
            cos(pos.y * 3.0 + uTime * 1.5) * 0.1;
    
    vZ = pos.z;
    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vZ;
  
  void main() {
    // Create animated gradient
    vec3 color1 = vec3(0.055, 0.647, 0.914); // Electric blue
    vec3 color2 = vec3(0.957, 0.267, 0.267); // Warning red
    vec3 color3 = vec3(0.0, 0.0, 0.0); // Black
    
    // Animate between colors based on position and time
    float mixFactor = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
    float mixFactor2 = cos(vUv.y * 10.0 - uTime * 0.5) * 0.5 + 0.5;
    
    vec3 color = mix(color1, color2, mixFactor);
    color = mix(color, color3, mixFactor2 * 0.7);
    
    // Add glitch effect
    float glitch = step(0.98, sin(uTime * 50.0 + vUv.y * 100.0));
    if (glitch > 0.0) {
      color = vec3(1.0, 0.0, 0.0);
    }
    
    // Add wave-based brightness
    float brightness = 0.3 + vZ * 2.0;
    color *= brightness;
    
    gl_FragColor = vec4(color, 0.3);
  }
`;

function ShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]} scale={[5, 5, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export const ShaderBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ShaderMesh />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};
