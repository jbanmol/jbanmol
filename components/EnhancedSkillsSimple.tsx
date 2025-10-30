import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../constants';
import type { Skill } from '../types';
import useTheme from '../hooks/useTheme';

// Enhanced 2D Skills Grid with CSS 3D effects
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
      style={{
        transformStyle: 'preserve-3d'
      }}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: isHovered ? 1.05 : 1,
        rotateY: isHovered ? 5 : 0
      }}
      transition={{ 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 25
      }}
      whileHover={{
        y: -8,
        rotateX: 10,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.95, rotateX: -5 }}
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
      
      {/* Enhanced particle effect on hover */}
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[var(--accent-primary)] rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${20 + (i % 3) * 20}%`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  y: [-15, -40],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Depth layers */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
        <motion.div
          className="relative"
          animate={{ 
            rotate: isHovered ? 360 : 0,
            scale: isSelected ? 1.2 : 1,
            rotateY: isHovered ? 180 : 0
          }}
          transition={{ 
            rotate: { duration: 0.6, ease: 'easeInOut' },
            scale: { type: 'spring', stiffness: 400, damping: 25 },
            rotateY: { duration: 0.8, ease: 'easeInOut' }
          }}
          style={{ transformStyle: 'preserve-3d' }}
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
          
          {/* CSS-based glow effect */}
          {(isHovered || isSelected) && (
            <motion.div
              className="absolute inset-0 -z-10"
              style={{
                filter: `drop-shadow(0 0 20px var(--accent-primary))`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
            >
              <skill.icon className="w-12 h-12 text-[var(--accent-primary)]" />
            </motion.div>
          )}
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
            y: isHovered ? -2 : 0,
            rotateX: isHovered ? 10 : 0
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {skill.name}
        </motion.span>
      </div>
      
      {/* Selection indicator with enhanced effects */}
      <AnimatePresence>
        {isSelected && (
          <>
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent-primary)] rounded-full flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>
            
            {/* Orbital ring */}
            <motion.div
              className="absolute inset-0 border-2 border-[var(--accent-primary)] rounded-xl opacity-50"
              initial={{ scale: 0.8, rotate: 0 }}
              animate={{ scale: 1.1, rotate: 360 }}
              transition={{ 
                scale: { type: 'spring', stiffness: 400, damping: 25 },
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' }
              }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// CSS-based 3D Skills Visualization
const SkillsVisualization3D: React.FC<{
  skills: Skill[];
  selectedSkill: Skill | null;
  onSkillSelect: (skill: Skill) => void;
}> = ({ skills, selectedSkill, onSkillSelect }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <div className="h-96 w-full perspective-1000 relative overflow-hidden">
      <motion.div 
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: hoveredIndex !== null ? 5 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {skills.map((skill, index) => {
          // Arrange in 3D spiral
          const angle = (index / skills.length) * Math.PI * 2;
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = Math.sin(angle * 2) * 30;
          
          const isSelected = selectedSkill?.name === skill.name;
          const isHovered = hoveredIndex === index;
          
          return (
            <motion.button
              key={skill.name}
              className="absolute w-20 h-20 rounded-full border-2 bg-glass backdrop-blur-sm flex items-center justify-center cursor-pointer"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
                transformStyle: 'preserve-3d',
                borderColor: isSelected || isHovered ? 'var(--accent-primary)' : 'var(--border)',
                boxShadow: isSelected || isHovered ? '0 0 20px var(--glow-color)' : 'none'
              }}
              onClick={() => onSkillSelect(skill)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ 
                scale: 1.2,
                rotateY: 180,
                z: 50
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ 
                opacity: 0,
                scale: 0,
                rotateX: -90
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                rotateX: 0,
                rotateY: isSelected ? 360 : 0
              }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.6,
                rotateY: isSelected ? { duration: 2, repeat: Infinity, ease: 'linear' } : {}
              }}
              data-cursor="view"
            >
              <skill.icon 
                className={`w-8 h-8 transition-colors duration-300 ${
                  isSelected 
                    ? 'text-[var(--accent-primary)]' 
                    : isHovered 
                      ? 'text-[var(--accent-secondary)]'
                      : 'text-[var(--muted)]'
                }`}
              />
              
              {/* Skill name on hover */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-[var(--surface)] border border-[var(--border)] rounded text-xs whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10
                }}
                transition={{ duration: 0.2 }}
              >
                {skill.name}
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

interface EnhancedSkillsSimpleProps {
  onSkillSelect: (skill: Skill) => void;
  selectedSkill: Skill | null;
}

const EnhancedSkillsSimple: React.FC<EnhancedSkillsSimpleProps> = ({ onSkillSelect, selectedSkill }) => {
  const { theme } = useTheme();
  const [view3D, setView3D] = useState(false);
  
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
        </div>
      </motion.div>
      
      {/* Skills Display */}
      <AnimatePresence mode="wait">
        {view3D ? (
          <motion.div
            key="3d-view"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <SkillsVisualization3D
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

export default EnhancedSkillsSimple;