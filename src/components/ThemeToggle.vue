<template>
  <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme">
    <span v-show="isDarkMode" class="icon moon">🌙</span>
    <span v-show="!isDarkMode" class="icon sun">☀️</span>
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

.icon {
  font-size: 18px;
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
