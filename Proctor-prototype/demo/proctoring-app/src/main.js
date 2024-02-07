import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import AdminComponent from './components/AdminComponent.vue';
// import VideoPlayer from './components/VideoPlayer.vue';
import QuizList from './components/QuizList.vue'; // Import QuizList
import Quiz from './components/QuizComp.vue'; // Import Quiz

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/admin', component: AdminComponent },
    { path: '/student', component: QuizList }, // Use QuizList for the /student route
    { path: '/quiz/:id', component: Quiz }, // Add a route for individual quizzes
  ],
});

const app = createApp(App);
app.use(router);
app.mount('#app');
