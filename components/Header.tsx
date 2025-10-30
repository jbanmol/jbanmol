import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { Command, Zap, ZapOff } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  enhancedMode?: boolean;
  onToggleEnhanced?: () => void;
}

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const Header: React.FC<HeaderProps> = ({ 
  onOpenCommandPalette, 
  enhancedMode = false, 
  onToggleEnhanced 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    const handleHashChange = () => {
      setIsMobileMenuOpen(false);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-glass backdrop-blur-lg shadow-lg border-b border-[var(--border)]' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center py-4">
          <a href="#home" className="text-2xl font-bold tracking-tighter group">
            <span className="text-gradient group-hover:animate-pulse">Jb Anmol</span>
            {enhancedMode && (
              <span className="ml-2 text-xs px-2 py-1 rounded-full bg-[var(--accent-primary)] text-[var(--text-on-accent)] opacity-75">
                ⚡
              </span>
            )}
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link-underline text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            
            <div className="flex items-center space-x-2">
              {/* Enhanced Mode Toggle */}
              {onToggleEnhanced && (
                <button
                  onClick={onToggleEnhanced}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    enhancedMode
                      ? 'bg-[var(--accent-primary)] text-[var(--text-on-accent)] shadow-lg hover:shadow-xl'
                      : 'bg-[var(--surface)] border text-[var(--muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]'
                  }`}
                  style={{ borderColor: enhancedMode ? 'transparent' : 'var(--border)' }}
                  aria-label={`${enhancedMode ? 'Disable' : 'Enable'} enhanced mode`}
                  title={`${enhancedMode ? 'Disable' : 'Enable'} Enhanced Mode`}
                >
                  {enhancedMode ? <Zap size={18} /> : <ZapOff size={18} />}
                </button>
              )}
              
              <button
                onClick={onOpenCommandPalette}
                className="w-9 h-9 bg-[var(--surface)] border rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all"
                style={{ borderColor: 'var(--border)' }}
                aria-label="Open command palette"
                title="Open Command Palette (Cmd+K)"
              >
                <Command size={18} />
              </button>
              
              <ThemeToggle />
            </div>
          </nav>
          
          {/* Mobile Nav Button */}
          <div className="md:hidden flex items-center space-x-2">
            {onToggleEnhanced && (
              <button
                onClick={onToggleEnhanced}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  enhancedMode
                    ? 'bg-[var(--accent-primary)] text-[var(--text-on-accent)]'
                    : 'bg-[var(--surface)] border text-[var(--muted)]'
                }`}
                style={{ borderColor: enhancedMode ? 'transparent' : 'var(--border)' }}
                aria-label={`${enhancedMode ? 'Disable' : 'Enable'} enhanced mode`}
              >
                {enhancedMode ? <Zap size={16} /> : <ZapOff size={16} />}
              </button>
            )}
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`hamburger z-50 w-8 h-8 flex flex-col justify-center items-center space-y-1.5 ${
                isMobileMenuOpen ? 'open' : ''
              }`}
              aria-label="Toggle navigation menu"
            >
              <div className="hamburger-line line-1 w-6 h-0.5" style={{ backgroundColor: 'var(--text)'}} />
              <div className="hamburger-line line-2 w-6 h-0.5" style={{ backgroundColor: 'var(--text)'}} />
              <div className="hamburger-line line-3 w-6 h-0.5" style={{ backgroundColor: 'var(--text)'}} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-bold text-[var(--text)] hover:text-[var(--accent-primary)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          
          <div className="absolute bottom-16 flex items-center space-x-4">
            {onToggleEnhanced && (
              <button
                onClick={() => { onToggleEnhanced(); setIsMobileMenuOpen(false); }}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  enhancedMode
                    ? 'bg-[var(--accent-primary)] text-[var(--text-on-accent)] shadow-lg'
                    : 'bg-[var(--surface)] border text-[var(--muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]'
                }`}
                style={{ borderColor: enhancedMode ? 'transparent' : 'var(--border)' }}
                aria-label={`${enhancedMode ? 'Disable' : 'Enable'} enhanced mode`}
              >
                {enhancedMode ? <Zap size={24} /> : <ZapOff size={24} />}
              </button>
            )}
            
            <button
              onClick={() => { onOpenCommandPalette(); setIsMobileMenuOpen(false); }}
              className="w-12 h-12 bg-[var(--surface)] border rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all"
              style={{ borderColor: 'var(--border)' }}
              aria-label="Open command palette"
            >
              <Command size={24} />
            </button>
            
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;