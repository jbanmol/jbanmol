import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, Code, Brain, Zap } from 'lucide-react';
import Scene3D from './Scene3D';
import useTheme from '../hooks/useTheme';

const TypewriterEnhanced: React.FC<{ words: string[] }> = ({ words }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    const type = () => {
      const currentWord = words[wordIndex];
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(type, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <motion.span 
      className="font-code font-medium text-xl md:text-2xl text-[var(--muted)] tracking-tight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text}
      <motion.span 
        className="text-xl md:text-2xl"
        style={{ color: 'var(--accent-primary)' }}
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        |
      </motion.span>
    </motion.span>
  );
};

const ProfileImage3D: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  
  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  return (
    <motion.div
      className="relative mb-8"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative"
      >
        {/* Animated background rings */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: 'conic-gradient(from 0deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary), var(--accent-primary))',
            transform: 'translateZ(-20px)'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        
        <motion.div
          className="p-1 rounded-full bg-gradient-accent relative z-10"
          style={{ 
            boxShadow: isHovered 
              ? '0 0 40px var(--shadow-color), 0 0 80px var(--glow-color)' 
              : '0 0 20px var(--shadow-color)'
          }}
          animate={{
            boxShadow: isHovered 
              ? '0 0 40px var(--shadow-color), 0 0 80px var(--glow-color)' 
              : '0 0 20px var(--shadow-color)'
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src="/assets/IMG_3429.webp"
            alt="Jb Anmol"
            className="w-52 h-52 rounded-full object-cover border-4"
            style={{ borderColor: 'var(--surface)' }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
        </motion.div>
        
        {/* Floating icons */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                className="absolute -top-4 -right-4 p-2 rounded-full bg-[var(--accent-primary)] text-white"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ delay: 0.1 }}
                data-cursor="view"
              >
                <Code size={16} />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 p-2 rounded-full bg-[var(--accent-secondary)] text-white"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ delay: 0.2 }}
                data-cursor="view"
              >
                <Brain size={16} />
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -right-8 p-2 rounded-full bg-[var(--accent-tertiary)] text-white"
                initial={{ scale: 0, x: -20 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0, x: -20 }}
                transition={{ delay: 0.3 }}
                data-cursor="view"
              >
                <Zap size={16} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const EnhancedHero: React.FC = () => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(var(--accent-primary-rgb), 0.1) 0%, transparent 50%)`
      }}
    >
      {/* 3D Background Scene */}
      <Scene3D theme={theme} interactive={true} geometryCount={8} />
      
      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center flex flex-col items-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <ProfileImage3D />
        </motion.div>
        
        <motion.div 
          className="mb-6 text-center"
          variants={itemVariants}
        >
          <motion.p 
            className="text-xl font-medium text-[var(--text)] tracking-wide flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Sparkles className="w-5 h-5 text-[var(--accent-primary)]" />
            Data Scientist 
            <span className="text-[var(--muted)] mx-1">|</span> 
            AI Enthusiast
            <Sparkles className="w-5 h-5 text-[var(--accent-primary)]" />
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="flex items-center justify-center mb-8 min-h-[60px]"
          variants={itemVariants}
        >
          <TypewriterEnhanced words={[
            "Hi, I'm Anmol() 👋",
            "Python 🐍 and caffeine ☕",
            "debugs life with yoga 🧘‍♂️",
            "builds things that don't break (much) 🏗️😅",
            "turns data into stories 📊✨",
            "AI enthusiast by day, debugger by night 🌙"
          ]} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <motion.a 
            href="#projects" 
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-base rounded-full bg-transparent border-2 text-[var(--accent-primary)] border-[var(--accent-primary)] transition-all duration-300 ease-in-out hover:bg-gradient-accent hover:text-[var(--text-on-accent)] hover:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-[var(--bg)] backdrop-blur-sm"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 25px -5px var(--glow-color)'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            data-cursor="view"
          >
            <span>View My Work</span>
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[var(--accent-primary)] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedHero;