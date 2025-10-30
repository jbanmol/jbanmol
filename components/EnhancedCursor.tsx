import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface EnhancedCursorProps {
  isCursorEnabled: boolean;
}

interface CursorState {
  variant: 'default' | 'hover' | 'click' | 'text' | 'view' | 'drag';
  scale: number;
  mixBlendMode: string;
}

const EnhancedCursor: React.FC<EnhancedCursorProps> = ({ isCursorEnabled }) => {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: 'default',
    scale: 1,
    mixBlendMode: 'normal'
  });
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 });
  
  const trailIdRef = useRef(0);

  useEffect(() => {
    if (!isCursorEnabled) return;

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Add trail point
      setTrail(prev => {
        const newTrail = [...prev, { 
          x: e.clientX, 
          y: e.clientY, 
          id: trailIdRef.current++ 
        }].slice(-8); // Keep last 8 points
        return newTrail;
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, a, [role="button"]')) {
        setCursorState({
          variant: 'hover',
          scale: 1.5,
          mixBlendMode: 'difference'
        });
      } else if (target.matches('input, textarea, [contenteditable]')) {
        setCursorState({
          variant: 'text',
          scale: 0.8,
          mixBlendMode: 'normal'
        });
      } else if (target.matches('[data-cursor="view"]')) {
        setCursorState({
          variant: 'view',
          scale: 2,
          mixBlendMode: 'multiply'
        });
      } else {
        setCursorState({
          variant: 'default',
          scale: 1,
          mixBlendMode: 'normal'
        });
      }
    };

    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, variant: 'click', scale: 0.8 }));
    };

    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, variant: 'default', scale: 1 }));
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isCursorEnabled, cursorX, cursorY]);

  // Clean up old trail points
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      setTrail(prev => prev.slice(-5));
    }, 100);

    return () => clearInterval(cleanupInterval);
  }, []);

  if (!isCursorEnabled || !isVisible) return null;

  const getCursorContent = () => {
    switch (cursorState.variant) {
      case 'view':
        return (
          <div className="flex items-center justify-center w-full h-full text-xs font-bold text-white">
            VIEW
          </div>
        );
      case 'text':
        return (
          <div className="w-0.5 h-6 bg-current animate-pulse" />
        );
      case 'drag':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1L11 4H9V7H12L9 10V8H4V10L1 7H4V4L7 1H8Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: point.x,
            top: point.y,
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: 'var(--accent-primary)',
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0,
            transition: { 
              duration: 0.8,
              delay: index * 0.05
            }
          }}
        />
      ))}
      
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          left: springX,
          top: springY,
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: cursorState.variant === 'hover' ? 'transparent' : 'var(--accent-primary)',
          border: cursorState.variant === 'hover' ? '2px solid var(--accent-primary)' : 'none',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: cursorState.mixBlendMode as any
        }}
        animate={{
          scale: cursorState.scale,
          rotate: cursorState.variant === 'click' ? 45 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25
        }}
      >
        {getCursorContent()}
      </motion.div>
      
      {/* Cursor outline */}
      <motion.div
        className="fixed pointer-events-none z-[9998] border-2 border-current rounded-full opacity-30"
        style={{
          left: springX,
          top: springY,
          width: 60,
          height: 60,
          borderColor: 'var(--accent-primary)',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: cursorState.scale * 0.8,
          opacity: cursorState.variant === 'hover' ? 0.6 : 0.3
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          delay: 0.05
        }}
      />
    </>
  );
};

export default EnhancedCursor;