<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="contact-header reveal">
        <h2>Contact</h2>
        <p class="contact-cta">{{ personalInfo.cta }}</p>
      </div>
      <div class="contact-grid">
        <div class="contact-info reveal reveal-delay-1">
          <h3>Get in Touch</h3>
          <div class="contact-item">
            <strong>Email:</strong> <a :href="`mailto:${personalInfo.email}`">{{ personalInfo.email }}</a>
          </div>
          <div class="contact-item">
            <strong>Phone:</strong> <a :href="`tel:${personalInfo.phone}`">{{ personalInfo.phone }}</a>
          </div>
          <div class="contact-item">
            <strong>GitHub:</strong> <a :href="personalInfo.github" target="_blank">github.com/jbanmol</a>
          </div>
          <div class="contact-item">
            <strong>LinkedIn:</strong> <a :href="personalInfo.linkedin" target="_blank">linkedin.com/in/jbanmol</a>
          </div>
          <div class="contact-item">
            <strong>Location:</strong> <span style="color: var(--text-secondary, #e5e5e7);">{{ personalInfo.location }}</span>
          </div>
        </div>
        <form class="contact-form reveal reveal-delay-2" @submit.prevent="submitForm">
          <h3>Send a Message</h3>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="form.name" required placeholder="Your name">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required placeholder="your.email@example.com">
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="form.message" required placeholder="Tell me about your project or opportunity..."></textarea>
          </div>
          <button type="submit" class="submit-btn">Send Message</button>
          <p v-if="formSubmitted" style="color: var(--accent, #3b82f6); margin-top: 15px; font-family: var(--font-mono, monospace); font-size: 14px; padding: 12px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 6px;">✓ Message sent successfully!</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  name: 'ContactSection',
  setup() {
    const formSubmitted = ref(false)
    
    const personalInfo = {
      email: "jbanmol9@gmail.com",
      phone: "+91 9962775663",
      github: "https://github.com/jbanmol",
      linkedin: "https://linkedin.com/in/jbanmol",
      location: "Jaipur, Rajasthan",
      cta: "Let's drive growth together"
    }
    
    const form = reactive({
      name: '',
      email: '',
      message: ''
    })
    
    const submitForm = () => {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
      const body = encodeURIComponent(`Hi JB,\n\n${form.message}\n\nBest regards,\n${form.name}\nEmail: ${form.email}`)
      const mailtoLink = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
      
      // Open email client
      window.open(mailtoLink, '_blank')
      
      // Show success message
      formSubmitted.value = true
      
      // Reset form after 3 seconds
      setTimeout(() => {
        form.name = ''
        form.email = ''
        form.message = ''
        formSubmitted.value = false
      }, 3000)
    }
    
    return {
      personalInfo,
      form,
      formSubmitted,
      submitForm
    }
  }
}
</script>
