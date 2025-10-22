import React from 'react';
import { Github, Linkedin, Mail, GraduationCap } from 'lucide-react';

const Footer: React.FC = () => {
    const socialLinks = [
        { icon: Github, href: 'https://github.com/jbanmol', label: 'GitHub' },
        { icon: Linkedin, href: 'https://linkedin.com/in/jbanmol', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:jbanmol9@gmail.com', label: 'Email' },
        { icon: GraduationCap, href: 'https://app.onlinedegree.iitm.ac.in/student/23F1001015', label: 'IIT Madras' },
    ];

    return (
        <footer className="bg-transparent border-t mt-24" style={{ borderColor: 'var(--border)'}}>
            <div className="container mx-auto px-6 md:px-12 lg:px-24 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <p className="text-sm text-[var(--muted)] mb-4 md:mb-0">&copy; {new Date().getFullYear()} Jb Anmol. All Rights Reserved.</p>
                <div className="flex items-center space-x-6">
                    {socialLinks.map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="text-[var(--muted)] hover:text-[var(--accent-primary)] transition-all duration-300 transform hover:-translate-y-1">
                            <link.icon className="w-6 h-6" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;