import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ParticleBackgroundSimpleProps {
  theme?: 'light' | 'dark';
  density?: 'low' | 'medium' | 'high';
  interactive?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const ParticleBackgroundSimple: React.FC<ParticleBackgroundSimpleProps> = ({ 
  theme = 'dark', 
  density = 'medium',
  interactive = true 
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const densityMap = {
    low: 20,
    medium: 35,
    high: 50
  };

  const colors = theme === 'dark' 
    ? ['#06B6D4', '#3B82F6', '#10B981']
    : ['#0EA5E9', '#2563EB', '#059669'];

  // Initialize particles
  useEffect(() => {
    const count = densityMap[density];
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 1 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setParticles(newParticles);
  }, [density, theme]);

  // Mouse interaction
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [interactive]);

  // Animate particles
  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        let newVx = particle.vx;
        let newVy = particle.vy;

        // Bounce off edges
        if (newX <= 0 || newX >= 100) {
          newVx = -particle.vx;
          newX = Math.max(0, Math.min(100, newX));
        }
        if (newY <= 0 || newY >= 100) {
          newVy = -particle.vy;
          newY = Math.max(0, Math.min(100, newY));
        }

        // Mouse repulsion effect
        if (interactive) {
          const dx = newX - mousePosition.x;
          const dy = newY - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 15) {
            const force = 0.1;
            newVx += (dx / distance) * force;
            newVy += (dy / distance) * force;
          }
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy
        };
      }));
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, interactive]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none" 
      style={{ zIndex: 0 }}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, var(--accent-primary) 0%, transparent 50%)`
        }}
        animate={{
          opacity: interactive ? [0.05, 0.15, 0.05] : 0.1
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)'
          }}
          whileHover={interactive ? { scale: 2, opacity: 0.8 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      ))}
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.map((particle, i) => 
          particles.slice(i + 1).map((otherParticle, j) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 20) {
              return (
                <motion.line
                  key={`${particle.id}-${otherParticle.id}`}
                  x1={`${particle.x}%`}
                  y1={`${particle.y}%`}
                  x2={`${otherParticle.x}%`}
                  y2={`${otherParticle.y}%`}
                  stroke={particle.color}
                  strokeWidth="0.5"
                  opacity={0.3 * (1 - distance / 20)}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              );
            }
            return null;
          })
        )}
      </svg>
    </div>
  );
};

export default ParticleBackgroundSimple;