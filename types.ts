import type * as React from 'react';
import '@react-three/fiber';

export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  repoUrl?: string;
}

export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
  sources?: GroundingSource[];
}

export interface GroundingSource {
    uri: string;
    title: string;
}
