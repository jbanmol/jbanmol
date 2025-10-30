import React, { useCallback, useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from 'tsparticles-engine';

interface ParticleBackgroundProps {
  theme?: 'light' | 'dark';
  density?: 'low' | 'medium' | 'high';
  interactive?: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  theme = 'dark', 
  density = 'medium',
  interactive = true 
}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particleOptions = useMemo(() => {
    const densityMap = {
      low: 30,
      medium: 50,
      high: 80
    };

    const themeColors = {
      light: {
        particles: '#0EA5E9',
        links: '#0EA5E9'
      },
      dark: {
        particles: '#06B6D4',
        links: '#06B6D4'
      }
    };

    return {
      background: {
        opacity: 0
      },
      fpsLimit: 120,
      interactivity: {
        detect_on: 'canvas',
        events: {
          onClick: {
            enable: interactive,
            mode: 'push'
          },
          onHover: {
            enable: interactive,
            mode: 'repulse'
          },
          resize: true
        },
        modes: {
          push: {
            quantity: 4
          },
          repulse: {
            distance: 100,
            duration: 0.4
          }
        }
      },
      particles: {
        color: {
          value: themeColors[theme].particles
        },
        links: {
          color: themeColors[theme].links,
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1
        },
        move: {
          enable: true,
          outModes: {
            default: 'bounce'
          },
          random: false,
          speed: 1,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 800
          },
          value: densityMap[density]
        },
        opacity: {
          value: 0.5,
          animation: {
            enable: true,
            speed: 0.5,
            opacity_min: 0.1,
            sync: false
          }
        },
        shape: {
          type: 'circle'
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
            size_min: 0.5,
            sync: false
          }
        }
      },
      detectRetina: true
    };
  }, [theme, density, interactive]);

  return (
    <Particles
      id="particle-background"
      init={particlesInit}
      options={particleOptions}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleBackground;