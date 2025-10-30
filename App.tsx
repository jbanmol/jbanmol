import React, { useState, useEffect, Suspense } from 'react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import AskAnmolAI from './components/AskAnmolAI';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import type { Skill } from './types';

// Enhanced components with lazy loading for performance
const EnhancedCursor = React.lazy(() => import('./components/EnhancedCursor'));
const EnhancedHeroSimple = React.lazy(() => import('./components/EnhancedHeroSimple'));
const EnhancedSkillsSimple = React.lazy(() => import('./components/EnhancedSkillsSimple'));
const ParticleBackgroundSimple = React.lazy(() => import('./components/ParticleBackgroundSimple'));

// Fallback components
const CustomCursor = React.lazy(() => import('./components/CustomCursor'));
const Hero = React.lazy(() => import('./components/Hero'));
const Skills = React.lazy(() => import('./components/Skills'));

// Loading component
const ComponentLoader: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--accent-primary)] border-t-transparent"></div>
  </div>
);

function App() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCursorEnabled, setIsCursorEnabled] = useState(() => {
    const storedValue = localStorage.getItem('isCursorEnabled');
    return storedValue ? JSON.parse(storedValue) : true;
  });
  const [useEnhancedComponents, setUseEnhancedComponents] = useState(() => {
    // Always enable enhanced components now since they use CSS instead of WebGL
    return true;
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('theme');
    return (stored as 'light' | 'dark') || 'dark';
  });

  const handleSkillSelect = (skill: Skill | null) => {
    setSelectedSkill(skill);
  };
  
  const toggleCursor = () => {
    setIsCursorEnabled((prev: boolean) => !prev);
  };

  const toggleEnhancedMode = () => {
    setUseEnhancedComponents(prev => !prev);
    localStorage.setItem('enhancedMode', JSON.stringify(!useEnhancedComponents));
  };

  useEffect(() => {
    localStorage.setItem('isCursorEnabled', JSON.stringify(isCursorEnabled));
    document.body.classList.toggle('custom-cursor-disabled', !isCursorEnabled);
  }, [isCursorEnabled]);

  useEffect(() => {
    if (selectedSkill) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedSkill]);

  // Theme detection
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Error boundary fallback
  const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
    <div className="flex items-center justify-center py-8 text-center">
      <div className="text-[var(--muted)]">
        <p>Oops! Something went wrong.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-[var(--accent-primary)] text-[var(--text-on-accent)] rounded-lg hover:opacity-90 transition-opacity"
        >
          Reload Page
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300 relative">
      {/* Particle Background - Enhanced mode only */}
      {useEnhancedComponents && (
        <Suspense fallback={null}>
          <ParticleBackgroundSimple 
            theme={theme} 
            density="medium" 
            interactive={true} 
          />
        </Suspense>
      )}
      
      {/* Cursor - Enhanced or Fallback */}
      <Suspense fallback={null}>
        {useEnhancedComponents ? (
          <EnhancedCursor isCursorEnabled={isCursorEnabled} />
        ) : (
          <CustomCursor isCursorEnabled={isCursorEnabled} />
        )}
      </Suspense>
      
      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        setIsOpen={setIsCommandPaletteOpen}
        isCursorEnabled={isCursorEnabled}
        toggleCursor={toggleCursor}
      />
      
      {/* Header with Enhanced Mode Toggle */}
      <Header 
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        enhancedMode={useEnhancedComponents}
        onToggleEnhanced={toggleEnhancedMode}
      />
      
      <main className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Hero Section */}
        <div id="home" className="h-screen min-h-[700px] flex items-center justify-center">
          <Suspense fallback={<ComponentLoader />}>
            {useEnhancedComponents ? (
              <EnhancedHeroSimple />
            ) : (
              <Hero />
            )}
          </Suspense>
        </div>
        
        {/* Main Sections */}
        <div className="space-y-32 md:space-y-40 py-24">
          <div id="about">
            <About />
          </div>
          
          <div id="experience">
            <Experience />
          </div>
          
          <div id="skills">
            <Suspense fallback={<ComponentLoader />}>
              {useEnhancedComponents ? (
                <EnhancedSkillsSimple 
                  onSkillSelect={handleSkillSelect} 
                  selectedSkill={selectedSkill} 
                />
              ) : (
                <Skills 
                  onSkillSelect={handleSkillSelect} 
                  selectedSkill={selectedSkill} 
                />
              )}
            </Suspense>
          </div>
          
          <div id="projects">
            <Projects 
              selectedSkill={selectedSkill} 
              onClearFilter={() => handleSkillSelect(null)} 
            />
          </div>
          
          <div id="contact">
            <AskAnmolAI />
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Enhanced Mode Indicator */}
      {useEnhancedComponents && (
        <div className="fixed bottom-4 left-4 z-50">
          <div className="px-3 py-1 bg-glass backdrop-blur-sm rounded-full border border-[var(--accent-primary)] text-xs text-[var(--accent-primary)] font-medium">
            Enhanced Mode
          </div>
        </div>
      )}
    </div>
  );
}

export default App;