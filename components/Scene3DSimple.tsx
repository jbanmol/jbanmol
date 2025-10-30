import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// CSS-based 3D effects instead of Three.js to avoid JSX augmentation issues
interface Scene3DSimpleProps {
  theme?: 'light' | 'dark';
  interactive?: boolean;
  geometryCount?: number;
}

const FloatingShape: React.FC<{
  index: number;
  theme: 'light' | 'dark';
  delay: number;
}> = ({ index, theme, delay }) => {
  const shapes = ['sphere', 'cube', 'torus'];
  const shape = shapes[index % 3];
  
  const colors = theme === 'dark' 
    ? ['#06B6D4', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6']
    : ['#0EA5E9', '#2563EB', '#059669', '#D97706', '#DC2626', '#7C3AED'];
    
  const color = colors[index % colors.length];
  
  const getShapeStyles = () => {
    switch (shape) {
      case 'cube':
        return {
          borderRadius: '8px',
          transform: 'rotateX(45deg) rotateY(45deg)'
        };
      case 'torus':
        return {
          borderRadius: '50%',
          border: `3px solid ${color}`,
          backgroundColor: 'transparent'
        };
      default: // sphere
        return {
          borderRadius: '50%'
        };
    }
  };
  
  return (
    <motion.div
      className="absolute w-8 h-8 opacity-30"
      style={{
        backgroundColor: shape !== 'torus' ? color : 'transparent',
        left: `${20 + (index * 13) % 60}%`,
        top: `${20 + (index * 17) % 60}%`,
        ...getShapeStyles()
      }}
      animate={{
        y: [-10, 10, -10],
        x: [-5, 5, -5],
        rotate: [0, 180, 360],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 4 + (index * 0.5),
        repeat: Infinity,
        delay,
        ease: 'easeInOut'
      }}
    />
  );
};

const Scene3DSimple: React.FC<Scene3DSimpleProps> = ({ 
  theme = 'dark', 
  interactive = true,
  geometryCount = 8
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 40%, ${theme === 'dark' ? '#06B6D4' : '#0EA5E9'}22 0%, transparent 50%),
                      radial-gradient(circle at 70% 60%, ${theme === 'dark' ? '#3B82F6' : '#2563EB'}22 0%, transparent 50%)`
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Floating geometric shapes */}
      {Array.from({ length: geometryCount }).map((_, i) => (
        <FloatingShape
          key={i}
          index={i}
          theme={theme}
          delay={i * 0.2}
        />
      ))}
      
      {/* Dynamic light effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`light-${i}`}
            className="absolute w-32 h-32 rounded-full opacity-10 blur-3xl"
            style={{
              backgroundColor: theme === 'dark' ? '#06B6D4' : '#0EA5E9',
              left: `${25 + i * 25}%`,
              top: `${30 + i * 15}%`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Scene3DSimple;