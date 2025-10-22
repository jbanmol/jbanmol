import React from 'react';
import { projects } from '../constants';
import type { Project, Skill } from '../types';
import { X, Github } from 'lucide-react';

interface ProjectsProps {
    selectedSkill: Skill | null;
    onClearFilter: () => void;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div 
        className="interactive-card bg-glass backdrop-blur-sm rounded-lg overflow-hidden border group flex flex-col h-full"
        style={{ borderColor: 'var(--border)' }}
    >
        <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[var(--text)] pr-4">{project.title}</h3>
                {project.repoUrl && (
                    <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[var(--muted)] hover:text-[var(--accent-primary)] transition-colors flex-shrink-0"
                        aria-label={`View ${project.title} on GitHub`}
                    >
                        <Github size={20} />
                    </a>
                )}
            </div>
            <p className="text-[var(--muted)] mb-4 flex-grow">{project.description}</p>
        </div>
        <div 
            className="p-6 border-t bg-[var(--surface)]" 
            style={{ 
                borderColor: 'var(--border)'
            }}
        >
             <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                    <span 
                        key={index} 
                        className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{
                            color: 'var(--accent-primary)',
                            backgroundColor: 'rgba(var(--accent-primary-rgb), 0.1)'
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

const Projects: React.FC<ProjectsProps> = ({ selectedSkill, onClearFilter }) => {
  const filteredProjects = selectedSkill
    ? projects.filter(p => p.tech.includes(selectedSkill.name))
    : projects;

  return (
    <section aria-labelledby="projects-title">
      <div className="text-center mb-12">
        <h2 id="projects-title" className="text-3xl md:text-4xl font-bold text-[var(--text)] tracking-tight">Project Showcase</h2>
        {selectedSkill && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[var(--surface)] text-[var(--text)] text-sm font-medium rounded-full border border-[var(--border)]">
                Showing projects for: 
                <span className="font-bold text-[var(--accent-primary)]">{selectedSkill.name}</span>
                <button 
                    onClick={onClearFilter}
                    className="ml-2 group p-1 rounded-full hover:bg-[var(--border)] transition-colors"
                    aria-label="Clear filter"
                >
                    <X size={16} className="text-[var(--muted)] group-hover:text-[var(--text)] transition-transform group-hover:rotate-90" />
                </button>
            </div>
        )}
      </div>
      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>
      ) : (
        <div className="text-center text-[var(--muted)] bg-glass border border-[var(--border)] rounded-lg p-8">
            No projects found for the skill "{selectedSkill?.name}".
        </div>
      )}
    </section>
  );
};

export default Projects;