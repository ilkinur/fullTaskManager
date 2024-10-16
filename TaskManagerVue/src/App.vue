<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      userDarkMode: false,
      userHighContrast: false
    }
  },
  created() {
    this.userDarkMode = localStorage.getItem('darkMode') === 'true'
    this.userhighContrast = localStorage.getItem('highContrast') === 'true'
    
    if (this.userDarkMode === true) {
      let htmlElement = document.getElementsByTagName('html')[0];
      htmlElement.setAttribute('data-theme', 'dark');
    }
    else if (this.userHighContrast === true) {
      let htmlElement = document.getElementsByTagName('html')[0];
      htmlElement.setAttribute('data-theme', 'high-contrast');
    }
    else {
      let htmlElement = document.getElementsByTagName('html')[0];
      htmlElement.setAttribute('data-theme', 'light');
    }
  }
};
</script>
