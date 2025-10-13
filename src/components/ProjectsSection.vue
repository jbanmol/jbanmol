<template>
  <section id="projects" class="section">
    <div class="container">
      <h2 class="reveal">Projects</h2>
      <div class="projects-grid">
        <div v-for="(project, index) in projects" :key="project.name" class="project-item reveal" :class="`reveal-delay-${index % 2 + 1}`" style="position: relative;">
          <div class="project-header">
            <h3>{{ project.name }}</h3>
            <div class="project-links">
              <a :href="project.github" target="_blank" class="project-link">GitHub</a>
              <a v-if="project.demo" :href="project.demo" target="_blank" class="project-link">Demo</a>
            </div>
          </div>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-technologies">
            <span v-for="tech in project.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
          <div class="project-highlights" v-if="project.highlights">
            <p v-for="highlight in project.highlights" :key="highlight">{{ highlight }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProjectsSection',
  data() {
    return {
      projects: [
        {
          name: "Binary Classification Clinical",
          description: "ML system with demographic-aware enhancement, robust cross-validation, and clinical threshold optimization for assessment applications",
          github: "https://github.com/jbanmol/binary_classification_clinical",
          technologies: ["Python", "scikit-learn", "Cross-validation", "Ensemble Methods", "Clinical ML"],
          highlights: ["-> 5-fold group-aware cross-validation", "-> Ensemble modeling with isotonic calibration", "-> Clinical threshold optimization with transfer learning", "-> Demographic-aware enhancement pipelines"]
        },
        {
          name: "Touch Data Analysis Clinical",
          description: "Comprehensive ML-enhanced analysis platform with real-time quality assessment, interactive visualizations, and automated anomaly detection for research applications",
          github: "https://github.com/jbanmol/Touchdata_Analysis_clinical",
          technologies: ["Python", "Streamlit", "ML Enhancement", "Data Validation", "Interactive Viz", "Google API"],
          highlights: ["-> Real-time quality scoring system (0-100)", "-> Automated behavioral anomaly detection", "-> Seamless Google Sheets integration", "-> Interactive HTML reporting with mobile support"]
        },
        {
          name: "Movie Review Sentiment Analyzer",
          description: "Production-ready LLM-powered sentiment analysis tool with sub-3 second response times, confidence scoring, and scalable batch processing capabilities",
          github: "https://github.com/jbanmol/movie_Review_Sentiment_Analyzer",
          technologies: ["Python", "Google Gemini", "Streamlit", "LLM Integration", "NLP", "API Development"],
          highlights: ["-> Sub-3 second response time with retry logic", "-> Confidence scoring with evidence extraction", "-> Dual-mode prompting (normal/strict)", "-> Scalable batch processing with rate limiting"]
        },
        {
          name: "GST Matching System",
          description: "Web application for automated invoice reconciliation with intuitive drag-drop interface, fuzzy matching algorithms, and real-time processing",
          github: "https://github.com/jbanmol/GST_matching_drag-drop",
          technologies: ["Python", "Streamlit", "Pandas", "Fuzzy Matching", "Data Processing", "Excel Integration"],
          highlights: ["-> Intuitive drag & drop file interface", "-> Real-time fuzzy matching with tolerance settings", "-> Comprehensive visual analytics dashboard", "-> Multi-format export (Excel, CSV) functionality"]
        }
      ]
    }
  }
}
</script>
