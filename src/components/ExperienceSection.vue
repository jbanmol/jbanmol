<template>
  <section id="experience" class="section">
    <div class="container">
      <h2 class="reveal">Experience</h2>
      <div v-for="(exp, index) in experience" :key="exp.company" class="experience-item reveal" :class="`reveal-delay-${index % 3 + 1}`" style="position: relative;">
        <div class="floating-tech">{{ exp.technologies[0] }}</div>
        <div class="experience-header">
          <h3>{{ exp.title }}</h3>
          <div class="company-duration">{{ exp.company }} • {{ exp.duration }} • {{ exp.type }}<span v-if="exp.location"> • {{ exp.location }}</span></div>
          <div class="experience-description">{{ exp.description }}</div>
        </div>
        <ul class="achievements">
          <li v-for="achievement in exp.achievements" :key="achievement">{{ achievement }}</li>
        </ul>
        <div class="technologies">
          <span v-for="tech in exp.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ExperienceSection',
  data() {
    return {
      experience: [
        {
          title: "Data Scientist",
          company: "Kidaura",
          duration: "Mar 2025 - Present",
          type: "Part-time",
          description: "Leading ML development for clinical applications supporting neuro-diverse children",
          achievements: [
            "Built production ETL pipelines reducing processing time by 30%",
            "Achieved 88% sensitivity in clinical classification model with ensemble methods in cv folds",
            "Implemented automated QA protocols cutting manual review by 40%",
            "Deployed scalable data validation systems for clinical stakeholders"
          ],
          technologies: ["Python", "scikit-learn", "pandas", "ETL", "Clinical ML", "Data Validation"]
        },
        {
          title: "Founder's Office - Analytics",
          company: "Tummo Labs",
          duration: "Jun 2024 - Oct 2024",
          type: "Full-time",
          description: "Drove analytics strategy for rapid product growth and user engagement",
          achievements: [
            "Led data strategy for rapid product scaling to 47,000+ users",
            "Increased user retention 25% through strategic A/B testing frameworks",
            "Built predictive churn models reducing customer loss by 15%",
            "Developed growth analytics infrastructure enabling strategic decision-making"
          ],
          technologies: ["Growth Analytics", "A/B Testing", "Predictive Modeling", "Business Intelligence"]
        },
        {
          title: "Data Operations Lead",
          company: "Shloka",
          duration: "May 2023 - Dec 2023",
          type: "Full-time",
          description: "Established data infrastructure and community analytics systems",
          achievements: [
            "Achieved 98% data integrity across 50+ community groups through systematic validation",
            "Built automated reporting systems providing actionable insights to leadership",
            "Optimized data collection workflows improving operational efficiency by 35%",
            "Designed scalable data architecture supporting organizational growth"
          ],
          technologies: ["Data Architecture", "Process Automation", "Quality Assurance", "Reporting Systems"]
        },
        {
          title: "Coordinator of Volunteers",
          company: "Isha Foundation",
          duration: "Feb 2019 - Dec 2022",
          type: "Full-time",
          location: "Coimbatore, Tamil Nadu",
          description: "Led program management and team coordination for large-scale residential programs",
          achievements: [
            "Managed 7-month residential programs with 900+ participants from diverse backgrounds",
            "Built data tracking systems monitoring volunteer engagement and program effectiveness",
            "Applied analytical thinking to optimize resource allocation and workflow efficiency",
            "Led cross-cultural teams developing leadership and communication skills"
          ],
          technologies: ["Program Management", "Team Leadership", "Cross-cultural Communication", "Process Optimization"]
        }
      ]
    }
  }
}
</script>
