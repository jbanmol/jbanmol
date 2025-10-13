<template>
  <section id="skills" class="section">
    <div class="container">
      <h2 class="reveal">Skills</h2>
      <div class="skills-grid">
        <div
          v-for="(skillGroup, key, index) in skills"
          :key="key"
          class="skill-category reveal"
          :class="`reveal-delay-${index % 3 + 1}`"
        >
          <h3>{{ skillGroup.category }}</h3>
          <ul class="skill-list">
            <li
              v-for="skill in skillGroup.items"
              :key="skill.name"
              :style="{ borderLeftColor: getSkillColor(skill.type) }"
            >
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
              </div>
              <div class="skill-bar">
                <div
                  class="skill-progress"
                  :style="{
                    width: '100%',
                    background: getSkillGradient(skill.type),
                    boxShadow: getSkillGlow(skill.type)
                  }"
                ></div>
              </div>
              <div
                v-if="skill.details"
                class="skill-details"
                style="font-size: 11px; color: var(--text-muted); margin-top: 4px; font-style: italic;"
              >
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
  name: "SkillsSection",
  data() {
    return {
      skills: {
        ml: {
          category: "Machine Learning & Data Science",
          items: [
            { name: "Python", type: "ml", details: "pandas, numpy, scikit-learn, flask, fastapi" },
            { name: "Machine Learning", type: "ml", details: "Classification, regression, ensemble methods" },
            { name: "Statistical Analysis", type: "ml", details: "A/B testing, hypothesis testing, correlation" },
            { name: "Data Processing", type: "ml", details: "ETL pipelines, data cleaning, validation" },
            { name: "LLM Integration", type: "ml", details: "Prompt engineering, API integration, embeddings" },
            { name: "Data Visualization", type: "ml", details: "Interactive dashboards, storytelling" },
            { name: "Excel", type: "ml", details: "Data analysis, formulas, automation" },
            { name: "Google Sheets", type: "ml", details: "Spreadsheets, data validation, formulas" }
          ]
        },
        dev: {
          category: "Development",
          items: [
            { name: "JavaScript", type: "dev", details: "Vue.js, Node.js, DOM manipulation, async programming" },
            { name: "SQL", type: "dev", details: "Complex queries, database design, joins, optimization" },
            { name: "HTML/CSS", type: "dev", details: "Responsive design, animations, grid/flexbox" },
            { name: "Git/GitHub", type: "dev", details: "Version control, collaboration, CI/CD workflows" },
            { name: "Web Scraping", type: "dev", details: "Beautiful Soup, Selenium, API integration" },
            { name: "API Development", type: "dev", details: "REST APIs, authentication, CORS, FastAPI" },
            { name: "Design & UX", type: "dev", details: "UI/UX principles, responsive design basics" }
          ]
        },
        ops: {
          category: "Deployment & Operations",
          items: [
            { name: "Cloud Platforms", type: "ops", details: "Vercel, Google Cloud, Docker containers" },
            { name: "Database Systems", type: "ops", details: "SQLite, MySQL, DuckDB optimization" },
            { name: "CI/CD & Testing", type: "ops", details: "GitHub Actions, automated testing pipelines" },
            { name: "Development Environment", type: "ops", details: "VS Code, Jupyter, Docker, terminal tools" },
            { name: "Data Tools", type: "ops", details: "Excel, Streamlit, OpenRefine, Google Sheets" },
            { name: "Power BI", type: "ops", details: "Business intelligence, data visualization, reporting dashboards" },
            { name: "Collaboration", type: "ops", details: "Git workflows, Google Workspace, documentation" }
          ]
        },
        soft: {
          category: "Soft Skills & Leadership",
          items: [
            { name: "Team Leadership", type: "soft", details: "Cross-cultural collaboration, volunteer coordination, mentoring" },
            { name: "Program Management", type: "soft", details: "Project coordination, resource management, process optimization" },
            { name: "Strategic Thinking", type: "soft", details: "Problem solving, analytical approach, solution design" },
            { name: "Communication", type: "soft", details: "Stakeholder management, presentation skills, documentation" },
            { name: "Adaptability", type: "soft", details: "Learning agility, technology adoption, diverse environments" }
          ]
        }
      }
    };
  },
  methods: {
    getSkillColor(type) {
      if (type === "ml") return "var(--accent, #3b82f6)";
      if (type === "dev") return "var(--accent-secondary, #06b6d4)";
      if (type === "ops") return "var(--accent-ops, #ef5fff)";
      if (type === "soft") return "var(--accent-soft, #8b5cf6)";
      return "var(--text-muted, #a1a1aa)";
    },
    // Animated gradient for each type
    getSkillGradient(type) {
      if (type === "ml") return "linear-gradient(90deg, #3b82f6, #60a5fa)";
      if (type === "dev") return "linear-gradient(90deg, #06b6d4, #67e8f9)";
      if (type === "ops") return "linear-gradient(90deg, #ef5fff, #f472b6)";
      if (type === "soft") return "linear-gradient(90deg, #8b5cf6, #c4b5fd)";
      return "var(--text-muted, #a1a1aa)";
    },
    // Neon box-shadow for glow effect
    getSkillGlow(type) {
      if (type === "ml") return "0 0 8px #3b82f6, 0 0 2px #60a5fa";
      if (type === "dev") return "0 0 8px #06b6d4, 0 0 2px #67e8f9";
      if (type === "ops") return "0 0 16px #ef5fff, 0 0 4px #f472b6";
      if (type === "soft") return "0 0 12px #8b5cf6, 0 0 2px #c4b5fd";
      return "";
    }
  }
};
</script>

<style scoped>
.skill-bar {
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 7px;
  background: var(--surface-1, #23232b);
}
.skill-progress {
  height: 100%;
  border-radius: 4px;
  transition: background 0.8s linear;
  animation: gradient-shift 3s infinite linear;
}
@keyframes gradient-shift {
  0% { filter: brightness(1); }
  50% { filter: brightness(1.10); }
  100% { filter: brightness(1); }
}
</style>
