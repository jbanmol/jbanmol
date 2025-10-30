import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sphere, Float } from '@react-three/drei';
import { skills } from '../constants';
import type { Skill } from '../types';
import useTheme from '../hooks/useTheme';
import * as THREE from 'three';
import '@react-three/fiber';

// 3D Skill Orb Component
const SkillOrb3D: React.FC<{ 
  skill: Skill; 
  position: [number, number, number]; 
  isSelected: boolean;
  onSelect: () => void;
}> = ({ skill, position, isSelected, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      if (hovered || isSelected) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={hovered ? 0.8 : 0.3}
    >
      <group position={position}>
        <Sphere 
          ref={meshRef}
          args={[0.8, 32, 32]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onSelect}
        >
          <meshStandardMaterial
            color={isSelected ? '#06B6D4' : hovered ? '#0EA5E9' : '#64748B'}
            emissive={isSelected || hovered ? '#06B6D4' : '#000000'}
            emissiveIntensity={isSelected ? 0.3 : hovered ? 0.2 : 0}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>
        
        <Text
          position={[0, 0, 0.9]}
          fontSize={0.3}
          color={isSelected || hovered ? '#FFFFFF' : '#CBD5E1'}
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-medium.woff"
        >
          {skill.name}
        </Text>
        
        {/* Icon representation */}
        <Sphere
          args={[0.2, 16, 16]}
          position={[0, 0, -0.3]}
        >
          <meshStandardMaterial
            color={'#FFFFFF'}
            emissive={'#FFFFFF'}
            emissiveIntensity={0.5}
          />
        </Sphere>
      </group>
    </Float>
  );
};

// 3D Skills Visualization
const Skills3DVisualization: React.FC<{
  skills: Skill[];
  selectedSkill: Skill | null;
  onSkillSelect: (skill: Skill) => void;
}> = ({ skills, selectedSkill, onSkillSelect }) => {
  const { theme } = useTheme();
  
  // Arrange skills in a spiral pattern
  const skillPositions = skills.map((_, index) => {
    const angle = (index / skills.length) * Math.PI * 2;
    const radius = 4 + (index % 3) * 2;
    const height = Math.sin(angle * 2) * 2;
    
    return [
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    ] as [number, number, number];
  });

  return (
    <div className="h-96 w-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={theme === 'dark' ? 0.3 : 0.5} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={1} 
          color={theme === 'dark' ? '#06B6D4' : '#0EA5E9'}
        />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={0.5} 
          color={theme === 'dark' ? '#3B82F6' : '#2563EB'}
        />
        
        {skills.map((skill, index) => (
          <SkillOrb3D
            key={skill.name}
            skill={skill}
            position={skillPositions[index]}
            isSelected={selectedSkill?.name === skill.name}
            onSelect={() => onSkillSelect(skill)}
          />
        ))}
      </Canvas>
    </div>
  );
};

// Enhanced 2D Skills Grid (Fallback)
const SkillCard: React.FC<{ 
  skill: Skill; 
  isSelected: boolean; 
  onSelect: () => void;
  index: number;
}> = ({ skill, isSelected, onSelect, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden p-6 bg-glass backdrop-blur-sm rounded-xl border text-left w-full transition-all duration-300 ${
        isSelected 
          ? 'border-[var(--accent-primary)] shadow-[0_0_30px_var(--glow-color)]' 
          : 'border-[var(--border)] hover:border-[var(--accent-primary)]'
      }`}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{ 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 25
      }}
      whileHover={{
        y: -8,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.95 }}
      data-cursor="view"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)]"
        animate={{ 
          opacity: isSelected ? 0.1 : isHovered ? 0.05 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Particle effect on hover */}
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[var(--accent-primary)] rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + (i % 2) * 30}%`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [-10, -30]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
        <motion.div
          animate={{ 
            rotate: isHovered ? 360 : 0,
            scale: isSelected ? 1.2 : 1
          }}
          transition={{ 
            rotate: { duration: 0.6, ease: 'easeInOut' },
            scale: { type: 'spring', stiffness: 400, damping: 25 }
          }}
        >
          <skill.icon 
            className={`w-12 h-12 transition-colors duration-300 ${
              isSelected 
                ? 'text-[var(--accent-primary)]' 
                : isHovered 
                  ? 'text-[var(--accent-secondary)]'
                  : 'text-[var(--muted)]'
            }`} 
          />
        </motion.div>
        
        <motion.span 
          className={`text-sm font-medium transition-colors duration-300 text-center ${
            isSelected 
              ? 'text-[var(--accent-primary)]' 
              : isHovered 
                ? 'text-[var(--text)]'
                : 'text-[var(--muted)]'
          }`}
          animate={{ 
            y: isHovered ? -2 : 0
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {skill.name}
        </motion.span>
      </div>
      
      {/* Selection indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent-primary)] rounded-full flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

interface EnhancedSkillsProps {
  onSkillSelect: (skill: Skill) => void;
  selectedSkill: Skill | null;
}

const EnhancedSkills: React.FC<EnhancedSkillsProps> = ({ onSkillSelect, selectedSkill }) => {
  const { theme } = useTheme();
  const [view3D, setView3D] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  
  React.useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(!!gl);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.section 
      className="relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      aria-labelledby="skills-title"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{ backgroundColor: 'var(--accent-secondary)' }}
        />
      </div>
      
      <motion.div 
        className="relative z-10"
        variants={headerVariants}
      >
        <div className="text-center mb-12">
          <motion.h2 
            id="skills-title" 
            className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4 tracking-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            Technical 
            <span className="text-gradient ml-2">Arsenal</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Interactive toolkit of technologies and frameworks I use to build amazing experiences
          </motion.p>
          
          {/* View toggle buttons */}
          {webGLSupported && (
            <motion.div 
              className="flex items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button
                onClick={() => setView3D(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  !view3D 
                    ? 'bg-[var(--accent-primary)] text-[var(--text-on-accent)] shadow-lg' 
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
                data-cursor="view"
              >
                Grid View
              </button>
              <button
                onClick={() => setView3D(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  view3D 
                    ? 'bg-[var(--accent-primary)] text-[var(--text-on-accent)] shadow-lg' 
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
                data-cursor="view"
              >
                3D View
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Skills Display */}
      <AnimatePresence mode="wait">
        {view3D && webGLSupported ? (
          <motion.div
            key="3d-view"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <Skills3DVisualization
              skills={skills}
              selectedSkill={selectedSkill}
              onSkillSelect={onSkillSelect}
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid-view"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                isSelected={selectedSkill?.name === skill.name}
                onSelect={() => onSkillSelect(skill)}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Selected skill info */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-glass backdrop-blur-sm rounded-full border border-[var(--accent-primary)] shadow-lg">
              <selectedSkill.icon className="w-5 h-5 text-[var(--accent-primary)]" />
              <span className="font-medium text-[var(--text)]">
                Selected: <span className="text-[var(--accent-primary)]">{selectedSkill.name}</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default EnhancedSkills;