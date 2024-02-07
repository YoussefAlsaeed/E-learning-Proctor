<template>
  <div id="app">
    <div v-if="!$route.path.includes('/admin') && !$route.path.includes('/student')">
      <button @click="navigateTo('admin')">Instructor/Admin</button>
      <button @click="navigateTo('student')">Student</button>
    </div>

    <router-view />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const router = useRouter();

    const navigateTo = (route) => {
      router.push({ path: `/${route}` });
    };

    return { navigateTo };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
