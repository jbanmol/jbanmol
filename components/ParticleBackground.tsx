import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

interface ParticleBackgroundProps {
  theme?: "light" | "dark";
  density?: "low" | "medium" | "high";
  interactive?: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  theme = "dark",
  density = "medium",
  interactive = true
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo<ISourceOptions>(() => ({
    background: { opacity: 0 },
    fpsLimit: 120,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onClick: { enable: interactive, mode: "push" },
        onHover: { enable: interactive, mode: "repulse" },
        resize: true
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 100, duration: 0.4 }
      }
    },
    particles: {
      color: { value: theme === "dark" ? "#06B6D4" : "#0EA5E9" },
      links: {
        color: theme === "dark" ? "#06B6D4" : "#0EA5E9",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 1,
        straight: false
      },
      number: {
        density: { enable: true, area: 800 },
        value: density === "high" ? 80 : density === "medium" ? 50 : 30
      },
      opacity: {
        value: 0.5,
        animation: { enable: true, speed: 0.5, minimumValue: 0.1, sync: false }
      },
      shape: { type: "circle" },
      size: {
        value: { min: 1, max: 3 },
        animation: { enable: true, speed: 2, minimumValue: 0.5, sync: false }
      }
    },
    detectRetina: true
  }), [theme, density, interactive]);

  if (!ready) return null;

  return <Particles id="particle-background" options={options} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />;
};

export default ParticleBackground;