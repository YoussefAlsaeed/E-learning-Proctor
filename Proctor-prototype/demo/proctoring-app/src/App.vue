<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-buttons">
        <button class="nav-button" @click="navigateTo('admin')">Instructor/Admin</button>
        <button class="nav-button" @click="navigateTo('student')">Student</button>
      </div>
    </nav>

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

<style scoped>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  overflow-x: hidden;
}

.navbar {
  background-color: #3498db;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start; 
}

.nav-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.nav-button {
  background-color: #2ecc71;
  color: #fff;
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #27ae60;
}

@media only screen and (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start; 
}


  .nav-button {
    margin: 10px 0;
  }
}
</style>

