<template>
  <section id="skills" class="section">
    <div class="container">
      <h2 class="reveal">Skills</h2>
      <div class="skills-grid">
        <div v-for="(skillGroup, key, index) in skills" :key="key" class="skill-category reveal" :class="`reveal-delay-${index % 3 + 1}`">
          <h3>{{ skillGroup.category }}</h3>
          <ul class="skill-list">
            <li v-for="skill in skillGroup.items" :key="skill.name" 
                :style="{ borderLeftColor: getSkillColor(skill.proficiency) }">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-proficiency">{{ skill.proficiency }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: skill.proficiency + '%', backgroundColor: getSkillColor(skill.proficiency) }"></div>
              </div>
              <div v-if="skill.details" class="skill-details" style="font-size: 11px; color: var(--text-muted); margin-top: 4px; font-style: italic;">
                {{ skill.details }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SkillsSection',
  data() {
    return {
      skills: {
        programming: {
          category: "Programming & Development",
          items: [
            { name: "Python", proficiency: 95, details: "pandas, numpy, scikit-learn, flask, fastapi" },
            { name: "JavaScript", proficiency: 85, details: "Vue.js, Node.js, DOM manipulation, async programming" },
            { name: "SQL", proficiency: 90, details: "Complex queries, database design, joins, optimization" },
            { name: "HTML/CSS", proficiency: 80, details: "Responsive design, animations, grid/flexbox" },
            { name: "Git/GitHub", proficiency: 90, details: "Version control, collaboration, CI/CD workflows" }
          ]
        },
        data_science: {
          category: "Data Science & ML",
          items: [
            { name: "Machine Learning", proficiency: 95, details: "Classification, regression, ensemble methods" },
            { name: "Statistical Analysis", proficiency: 85, details: "A/B testing, hypothesis testing, correlation" },
            { name: "Data Processing", proficiency: 95, details: "ETL pipelines, data cleaning, validation" },
            { name: "LLM Integration", proficiency: 80, details: "Prompt engineering, API integration, embeddings" },
            { name: "Data Visualization", proficiency: 85, details: "Interactive dashboards, storytelling" }
          ]
        },
        deployment: {
          category: "Deployment & DevOps",
          items: [
            { name: "Cloud Platforms", proficiency: 80, details: "Vercel, Google Cloud, Docker containers" },
            { name: "Web Scraping", proficiency: 90, details: "Beautiful Soup, Selenium, API integration" },
            { name: "Database Systems", proficiency: 85, details: "SQLite, MySQL, DuckDB optimization" },
            { name: "API Development", proficiency: 85, details: "REST APIs, authentication, CORS, FastAPI" },
            { name: "CI/CD & Testing", proficiency: 75, details: "GitHub Actions, automated testing pipelines" }
          ]
        },
        tools: {
          category: "Tools & Platforms",
          items: [
            { name: "Development Environment", proficiency: 95, details: "VS Code, Jupyter, Docker, terminal tools" },
            { name: "Data Tools", proficiency: 90, details: "Excel, Streamlit, OpenRefine, Google Sheets" },
            { name: "Collaboration", proficiency: 85, details: "Git workflows, Google Workspace, documentation" },
            { name: "Design & UX", proficiency: 75, details: "UI/UX principles, responsive design basics" },
            { name: "Power BI", proficiency: 70, details: "Business intelligence, data visualization, reporting dashboards" }
          ]
        },
        leadership: {
          category: "Leadership & Soft Skills",
          items: [
            { name: "Team Leadership", proficiency: 90, details: "Cross-cultural collaboration, volunteer coordination, mentoring" },
            { name: "Program Management", proficiency: 85, details: "Project coordination, resource management, process optimization" },
            { name: "Strategic Thinking", proficiency: 80, details: "Problem solving, analytical approach, solution design" },
            { name: "Communication", proficiency: 85, details: "Stakeholder management, presentation skills, documentation" },
            { name: "Adaptability", proficiency: 90, details: "Learning agility, technology adoption, diverse environments" }
          ]
        }
      }
    }
  },
  methods: {
    getSkillColor(proficiency) {
      if (proficiency >= 90) return 'var(--accent, #3b82f6)'
      if (proficiency >= 80) return 'var(--accent-secondary, #06b6d4)'
      if (proficiency >= 70) return 'var(--accent-tertiary, #8b5cf6)'
      return 'var(--text-muted, #a1a1aa)'
    }
  }
}
</script>
