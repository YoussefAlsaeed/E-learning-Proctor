<template>
    <div>
      <h1>Quizzes</h1>
      <div v-for="quiz in quizzes" :key="quiz.id">
        <h2>{{ quiz.title }}</h2>
        <button @click="takeQuiz(quiz.id)">Take Quiz</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        quizzes: [],
      };
    },
    async created() {
      const response = await fetch('http://localhost:3000/api/quizzes');
      this.quizzes = await response.json();
    },
    methods: {
      takeQuiz(quizId) {
        this.$router.push({ path: `/quiz/${quizId}` });
      },
    },
  };
  </script>
  