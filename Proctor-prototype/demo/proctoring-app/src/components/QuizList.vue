<template>
    <div class="quiz-list">
      <h1>Quizzes</h1>
      <div v-for="quiz in quizzes" :key="quiz.id" class="quiz-item">
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
    mounted() {
    document.body.style.backgroundColor = "#D0E8F2"; 
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
  
  <style scoped>


  .quiz-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .quiz-item {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 15px;
    padding: 15px;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .quiz-item:hover {
    background-color: #e0e0e0;
    transform: scale(1.02);
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  