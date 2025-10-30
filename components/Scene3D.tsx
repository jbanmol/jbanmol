import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position: [number, number, number];
  geometry: 'sphere' | 'box' | 'torus';
  color: string;
  speed?: number;
}

const FloatingGeometry: React.FC<FloatingGeometryProps> = ({ 
  position, 
  geometry, 
  color, 
  speed = 1 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.3;
    }
  });

  const renderGeometry = () => {
    const props = {
      ref: meshRef,
      position,
      scale: [0.8, 0.8, 0.8] as [number, number, number]
    };

    switch (geometry) {
      case 'sphere':
        return (
          <Sphere {...props}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0.4}
              metalness={0.8}
            />
          </Sphere>
        );
      case 'box':
        return (
          <Box {...props}>
            <meshStandardMaterial
              color={color}
              attach="material"
              roughness={0.2}
              metalness={0.9}
            />
          </Box>
        );
      case 'torus':
        return (
          <Torus {...props} args={[1, 0.3, 8, 16]}>
            <meshStandardMaterial
              color={color}
              attach="material"
              roughness={0.1}
              metalness={0.7}
              emissive={color}
              emissiveIntensity={0.1}
            />
          </Torus>
        );
      default:
        return null;
    }
  };

  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      {renderGeometry()}
    </Float>
  );
};

interface Scene3DProps {
  theme?: 'light' | 'dark';
  interactive?: boolean;
  geometryCount?: number;
}

const Scene3D: React.FC<Scene3DProps> = ({ 
  theme = 'dark', 
  interactive = true,
  geometryCount = 6
}) => {
  const geometries = useMemo(() => {
    const colors = theme === 'dark' 
      ? ['#06B6D4', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6']
      : ['#0EA5E9', '#2563EB', '#059669', '#D97706', '#DC2626', '#7C3AED'];
    
    return Array.from({ length: geometryCount }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      geometry: ['sphere', 'box', 'torus'][Math.floor(Math.random() * 3)] as 'sphere' | 'box' | 'torus',
      color: colors[i % colors.length],
      speed: 0.5 + Math.random() * 1.5
    }));
  }, [theme, geometryCount]);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        {/* Lighting */}
        <ambientLight intensity={theme === 'dark' ? 0.2 : 0.4} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={theme === 'dark' ? 0.8 : 1} 
          color={theme === 'dark' ? '#06B6D4' : '#0EA5E9'}
        />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={0.3} 
          color={theme === 'dark' ? '#3B82F6' : '#2563EB'}
        />
        
        {/* Floating geometries */}
        {geometries.map((geo) => (
          <FloatingGeometry
            key={geo.id}
            position={geo.position}
            geometry={geo.geometry}
            color={geo.color}
            speed={geo.speed}
          />
        ))}
        
        {/* Interactive controls */}
        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        )}
      </Canvas>
    </div>
  );
};

export default Scene3D;