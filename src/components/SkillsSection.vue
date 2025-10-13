<template>
  <section id="skills" class="section">
    <div class="container">
      <h2 class="reveal">Skills</h2>
      <div class="skills-grid">
        <div v-for="(skillGroup, key, index) in skills" :key="key" class="skill-category reveal" :class="`reveal-delay-${index % 3 + 1}`">
          <h3>{{ skillGroup.category }}</h3>
          <ul class="skill-list">
            <li v-for="skill in skillGroup.items" :key="skill.name"
                :style="{ borderLeftColor: getSkillColor(skill) }">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress"
                     :style="{ width: '100%', background: getSkillColor(skill) }"></div>
              </div>
              <div v-if="skill.details" class="skill-details"
                   style="font-size: 11px; color: var(--text-muted); margin-top: 4px; font-style: italic;">
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
    // Vibrant/neon colors for core categories:
    const categoryColors = {
      programming: '#00fff7',       // Neon cyan
      data_science: '#ff00ea',      // Neon magenta/pink
      deployment: '#ffc107',        // Bright gold/yellow for deployment/ops
      tools: '#39ff14',             // Neon green for tools
      cloud: '#8f00ff',             // Neon violet/purple for cloud
      leadership: '#ff5e00',        // Vibrant orange for leadership/soft
      amazon: '#ff2e63',            // Neon red/pink for Amazon-related
      azure: '#00aeff',             // Electric Azure blue
      jira: '#fe019a',              // Neon pink for Jira
      boto: '#fcff42',              // Lightning yellow for boto (automation)
    };
    return {
      categoryColors,
      skills: {
        programming: {
          category: "Programming & Development",
          items: [
            { name: "Python", categories: ['programming', 'data_science', 'deployment'], details: "pandas, numpy, scikit-learn, flask, fastapi" },
            { name: "JavaScript", categories: ['programming'], details: "Vue.js, Node.js, DOM manipulation, async programming" },
            { name: "SQL", categories: ['programming', 'data_science'], details: "Complex queries, database design, joins, optimization" },
            { name: "HTML/CSS", categories: ['programming'], details: "Responsive design, animations, grid/flexbox" },
            { name: "Git/GitHub", categories: ['programming', 'deployment'], details: "Version control, collaboration, CI/CD workflows" },
            // Boto as programming + deployment + Amazon
            { name: "boto", categories: ['programming', 'deployment', 'amazon'], details: "Python AWS SDK, S3, automation" }
          ]
        },
        data_science: {
          category: "Data Science & ML",
          items: [
            { name: "Machine Learning", categories: ['data_science'], details: "Classification, regression, ensemble methods" },
            { name: "Statistical Analysis", categories: ['data_science'], details: "A/B testing, hypothesis testing, correlation" },
            { name: "Data Processing", categories: ['data_science', 'deployment'], details: "ETL pipelines, data cleaning, validation" },
            { name: "LLM Integration", categories: ['data_science'], details: "Prompt engineering, API integration, embeddings" },
            { name: "Data Visualization", categories: ['data_science', 'tools'], details: "Interactive dashboards, storytelling" }
          ]
        },
        deployment: {
          category: "Deployment & DevOps",
          items: [
            { name: "Cloud Platforms", categories: ['deployment', 'cloud'], details: "Vercel, Google Cloud, Docker containers" },
            { name: "Azure Cloud", categories: ['deployment', 'cloud', 'azure'], details: "Azure portal, resource management, serverless" },
            { name: "Amazon S3", categories: ['deployment', 'cloud', 'amazon'], details: "S3 storage, cloud integration" },
            { name: "Web Scraping", categories: ['deployment', 'programming'], details: "Beautiful Soup, Selenium, API integration" },
            { name: "Database Systems", categories: ['deployment', 'programming'], details: "SQLite, MySQL, DuckDB optimization" },
            { name: "API Development", categories: ['deployment', 'programming'], details: "REST APIs, authentication, CORS, FastAPI" },
            { name: "CI/CD & Testing", categories: ['deployment', 'tools'], details: "GitHub Actions, automated testing pipelines" }
          ]
        },
        tools: {
          category: "Tools & Platforms",
          items: [
            { name: "Jira", categories: ['tools', 'jira'], details: "Project management, agile boards, automation" },
            { name: "Development Environment", categories: ['tools'], details: "VS Code, Jupyter, Docker, terminal tools" },
            { name: "Data Tools", categories: ['tools', 'data_science'], details: "Excel, Streamlit, OpenRefine, Google Sheets" },
            { name: "Collaboration", categories: ['tools', 'leadership'], details: "Git workflows, Google Workspace, documentation" },
            { name: "Design & UX", categories: ['tools'], details: "UI/UX principles, responsive design basics" },
            { name: "Power BI", categories: ['tools', 'data_science'], details: "Business intelligence, data visualization, reporting dashboards" }
          ]
        },
        leadership: {
          category: "Leadership & Soft Skills",
          items: [
            { name: "Team Leadership", categories: ['leadership'], details: "Cross-cultural collaboration, volunteer coordination, mentoring" },
            { name: "Program Management", categories: ['leadership'], details: "Project coordination, resource management, process optimization" },
            { name: "Strategic Thinking", categories: ['leadership'], details: "Problem solving, analytical approach, solution design" },
            { name: "Communication", categories: ['leadership'], details: "Stakeholder management, presentation skills, documentation" },
            { name: "Adaptability", categories: ['leadership'], details: "Learning agility, technology adoption, diverse environments" }
          ]
        }
      }
    }
  },
  methods: {
    getSkillColor(skill) {
      if (!skill.categories || skill.categories.length === 0) return '#a1a1aa';
      // Single category: solid neon color
      if (skill.categories.length === 1) return this.categoryColors[skill.categories[0]] || '#a1a1aa';
      // Multi-category: vibrant linear gradient
      const colors = skill.categories.map(cat => this.categoryColors[cat] || '#a1a1aa');
      return `linear-gradient(90deg, ${colors.join(', ')})`;
    }
  }
}
</script>
