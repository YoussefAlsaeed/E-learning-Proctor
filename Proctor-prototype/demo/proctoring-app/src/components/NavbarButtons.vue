<template>
    <div class="nav-buttons">
      <button class="nav-button" @click="navigateTo('admin')">Instructor/Admin</button>
      <button class="nav-button" @click="navigateTo('student')">Student</button>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'NavbarButtons',
    setup() {
      const router = useRouter();
  
      const navigateTo = (route) => {
        router.push({ path: `/${route}` });
      };
  
      return { navigateTo };
    },
  };
  </script>
  
  <style scoped>
  </style>
  