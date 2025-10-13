<template>
  <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme">
    <!-- Moon Icon SVG -->
    <svg v-show="isDarkMode" class="icon moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
    <!-- Sun Icon SVG -->
    <svg v-show="!isDarkMode" class="icon sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle-theme'],
  setup(props, { emit }) {
    const toggleTheme = () => {
      emit('toggle-theme');
    };

    return {
      toggleTheme
    };
  }
};
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: 1px solid var(--border);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-duration) var(--transition-timing);
  position: relative;
  overflow: hidden;
}

.theme-toggle:hover {
  border-color: var(--accent);
  transform: scale(1.1) rotate(15deg);
}

.theme-toggle:hover .icon {
  stroke: var(--accent);
}

.icon {
  color: var(--text-secondary); /* Use a more subtle color */
  position: absolute;
  transition: transform var(--transition-duration) var(--transition-timing), opacity var(--transition-duration) var(--transition-timing);
}

/* Default (Dark Mode) styles */
:root .moon,
html[data-theme='dark'] .moon {
  transform: translateY(0);
  opacity: 1;
}

:root .sun,
html[data-theme='dark'] .sun {
  transform: translateY(20px);
  opacity: 0;
}

/* Light Mode styles */
html[data-theme='light'] .sun {
  transform: translateY(0);
  opacity: 1;
}

html[data-theme='light'] .moon {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
