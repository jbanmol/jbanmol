<template>
  <div id="app">
    <!-- Header Navigation -->
    <header class="header">
      <div class="container">
        <nav class="nav">
          <button class="mobile-menu-btn" @click="toggleMobileMenu">☰</button>
          <ul class="nav-links" :class="{ active: mobileMenuOpen }">
            <li><a href="#about" @click="closeMobileMenu">About</a></li>
            <li><a href="#experience" @click="closeMobileMenu">Experience</a></li>
            <li><a href="#projects" @click="closeMobileMenu">Projects</a></li>
            <li><a href="#skills" @click="closeMobileMenu">Skills</a></li>
            <li><a href="#education" @click="closeMobileMenu">Education</a></li>
            <li><a href="#contact" @click="closeMobileMenu">Contact</a></li>
          </ul>
          <ThemeToggle :isDarkMode="isDarkMode" @toggle-theme="toggleTheme" />
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>{{ personalInfo.name }}</h1>
          <p class="tagline">{{ personalInfo.tagline }}</p>
          <div class="status">{{ personalInfo.availability }}</div>
          <p class="description">{{ personalInfo.description }}</p>
          <div class="cta-links">
            <a :href="personalInfo.github" target="_blank">GitHub</a>
            <a :href="personalInfo.linkedin" target="_blank">LinkedIn</a>
            <a :href="`mailto:${personalInfo.email}`">Contact</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Other sections... -->
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <SkillsSection />
    <EducationSection />
    <ContactSection />

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 {{ personalInfo.name }}</p>
        <p>{{ personalInfo.positioning }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect, computed } from 'vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import ThemeToggle from './components/ThemeToggle.vue'

export default {
  name: 'App',
  components: {
    AboutSection,
    ExperienceSection,
    ProjectsSection,
    SkillsSection,
    EducationSection,
    ContactSection,
    ThemeToggle
  },
  setup() {
    const mobileMenuOpen = ref(false)
    const currentTheme = ref('dark'); // Default to dark theme

    const isDarkMode = computed(() => currentTheme.value === 'dark');

    const personalInfo = {
      name: "Jb Anmol",
      location: "Jaipur, Rajasthan",
      email: "jbanmol9@gmail.com",
      phone: "+91 9962775663",
      github: "https://github.com/jbanmol",
      linkedin: "https://linkedin.com/in/jbanmol",
      tagline: 'Product & Data Science - The breadth engineer founders rely on to get things done',
      availability: "Open to work",
      description: "A versatile engineer with expertise spanning ML pipelines, web development, and system deployment. From program management to production systems, I deliver reliable solutions that founders can count on. My unique blend of technical depth and leadership experience enables me to bridge complex challenges with practical business impact.",
      github: "https://github.com/jbanmol",
      linkedin: "https://linkedin.com/in/jbanmol",
      email: "jbanmol9@gmail.com"
    }

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      mobileMenuOpen.value = false
    }

    const toggleTheme = () => {
      currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
    }

    // Apply theme and save to localStorage
    watchEffect(() => {
      document.documentElement.setAttribute('data-theme', currentTheme.value);
      localStorage.setItem('theme', currentTheme.value);
    });

    onMounted(() => {
      // 1. Check localStorage for a saved theme
      const savedTheme = localStorage.getItem('theme');

      // 2. Check user's OS preference
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

      if (savedTheme) {
        currentTheme.value = savedTheme;
      } else if (prefersLight) {
        currentTheme.value = 'light';
      }
      // Otherwise, the default 'dark' is used.

      // Scroll reveal functionality
      const handleScroll = () => {
        const reveals = document.querySelectorAll('.reveal')
        reveals.forEach(element => {
          const windowHeight = window.innerHeight
          const elementTop = element.getBoundingClientRect().top
          const elementVisible = 150

          if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active')
          }
        })
      }
      handleScroll() // Initial check
      window.addEventListener('scroll', handleScroll)
    })

    return {
      mobileMenuOpen,
      personalInfo,
      toggleMobileMenu,
      closeMobileMenu,
      isDarkMode,
      toggleTheme
    }
  }
}
</script>
