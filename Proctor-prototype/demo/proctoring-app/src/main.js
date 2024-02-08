import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import AdminComponent from './components/AdminComponent.vue';
import QuizList from './components/QuizList.vue'; 
import Quiz from './components/QuizComp.vue'; 

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/admin', component: AdminComponent },
    { path: '/student', component: QuizList }, 
    { path: '/quiz/:id', component: Quiz }, 
  ],
});

const app = createApp(App);
app.use(router);
app.mount('#app');
