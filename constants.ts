import type { Experience, Project, Skill } from './types';
import { BrainCircuit, Database, Code, BarChart4, TestTube, FileText, Bot, Layers3, GitFork, Sigma, Waypoints, Dna, Terminal, PenTool, MessageCircleQuestion, Combine, SmilePlus, Link2, Server, Cloud, Package, AppWindow } from 'lucide-react';

export const experiences: Experience[] = [
  {
    role: "Data Scientist (Part-time)",
    company: "Kidaura",
    period: "Mar 2025 - Current",
    points: [
      "Developed ETL pipelines with Python, reducing data processing time by 30%.",
      "Built scikit-learn models achieving 95% accuracy and 25% error reduction.",
      "Performed anomaly detection and custom analysis for clinical stakeholders.",
    ],
  },
  {
    role: "Founder's Office - Analytics & Partnerships",
    company: "Tummo Labs",
    period: "Jun 2024 - Oct 2024",
    points: [
      "Led analytics for a product launch reaching 47,000+ users in 3 months.",
      "Designed and interpreted A/B tests, increasing user retention by 25%.",
      "Created dashboards for cross-functional data-driven decision making.",
    ],
  },
  {
    role: "Administrator",
    company: "Shloka",
    period: "May 2023 - Dec 2023",
    points: [
      "Improved data collection, achieving 98% data integrity across 50+ groups.",
      "Analyzed engagement metrics with SQL to create stakeholder reports.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Clinical Analytics Pipeline",
    description: "Built an end-to-end data pipeline with robust validation, anomaly detection, and automated QA, reducing manual review time by 40%.",
    tech: ["Python", "SQL", "Pandas & NumPy", "ETL Pipelines"],
    repoUrl: "https://github.com/jbanmol/clinical-analytics-pipeline",
  },
  {
    title: "Neuro-Diverse Medical Classification",
    description: "Applied statistical modeling and cohort analysis to distill user behavior data into actionable product insights for a neuro-diverse context.",
    tech: ["Python", "scikit-learn", "Statistical Modeling", "RAG"],
    repoUrl: "https://github.com/jbanmol/neuro-diverse-classification",
  },
  {
    title: "AI Project Deployment Agent",
    description: "Built an AI agent that automatically builds, deploys, and updates projects on GitHub based on natural language user queries.",
    tech: ["Python", "OpenAI", "LangChain", "Hugging Face", "Docker"],
    repoUrl: "https://github.com/jbanmol/Build_Deploy_gpt-4o-mini-IITM",
  },
  {
    title: "Movie Review Sentiment Analyzer",
    description: "Built a sentiment analysis model using the Gemini API (gemini-flash) to classify movie reviews as positive or negative with high accuracy.",
    tech: ["Python", "Gemini API", "Pandas & NumPy"],
    repoUrl: "https://github.com/jbanmol/movie_Review_Sentiment_Analyzer",
  },
];

export const skills: Skill[] = [
    { name: "Python", icon: Code },
    { name: "SQL", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "scikit-learn", icon: BrainCircuit },
    { name: "Pandas & NumPy", icon: BarChart4 },
    { name: "ETL Pipelines", icon: Waypoints },
    { name: "Statistical Modeling", icon: Sigma },
    { name: "A/B Testing", icon: TestTube },
    { name: "Flask", icon: Server },
    { name: "FastAPI", icon: Server },
    { name: "Hugging Face", icon: SmilePlus },
    { name: "LangChain", icon: Link2 },
    { name: "Docker", icon: Package },
    { name: "S3 (AWS)", icon: Cloud },
    { name: "Feature Engineering", icon: Dna },
    { name: "Git", icon: GitFork },
    { name: "Bash", icon: Terminal },
    { name: "RAG", icon: Combine },
    { name: "Tableau", icon: BarChart4 },
    { name: "Power BI", icon: BarChart4 },
    { name: "Google Workspace", icon: AppWindow },
    { name: "Vue3", icon: Code },
    { name: "OpenAI", icon: Bot },
    { name: "Claude", icon: MessageCircleQuestion },
];

export const RESUME_DATA_FOR_AI = `
Name: Jb Anmol
Role: Data Scientist
Summary: A Data Scientist passionate about leveraging AI to unlock human potential, especially in medical sciences. Known for strong stakeholder communication skills and translating complex data into actionable insights. Combines hands-on experience in the full data lifecycle with a leadership background and a keen interest in clinical time series analysis.
Education: BS in Data Science & Programming from IIT Madras (2023-2026), Current CGPA: 9.1.
Experience:
- Data Scientist (Part-time) at Kidaura (Mar 2025 - Current): Developed ETL pipelines (Python), built ML models (scikit-learn) with 95% accuracy, performed data analysis for clinical stakeholders.
- Founder's Office - Analytics & Partnerships at Tummo Labs (Jun 2024 - Oct 2024): Worked directly with the founding team to lead launch analytics for 47k+ users, designed A/B tests improving retention by 25%, and created dashboards to drive stakeholder alignment.
- Administrator at Shloka (May 2023 - Dec 2023): Improved data collection with 98% data integrity, analyzed engagement metrics with SQL.
`;
