<template>
    <div>
      <h1>Admin Page - Create Quiz</h1>
      <form @submit.prevent="createQuiz">
        <label>Title:</label>
        <input v-model="quiz.title" required />
  
        <label>Timer (seconds):</label>
        <input type="number" v-model="quiz.timer" required />
  
        <h2>Create Questions</h2>
        <div v-for="(question, index) in questions" :key="index">
          <label>Question {{ index + 1 }}:</label>
          <input v-model="question.text" required />
  
          <h3>Answers</h3>
          <div v-for="(answer, answerIndex) in question.answers" :key="answerIndex">
            <label>Answer {{ answerIndex + 1 }}:</label>
            <input v-model="answer.text" required />
            <input type="checkbox" v-model="answer.isCorrect" /> Correct
            <button type="button" @click="removeAnswer(index, answerIndex)">Remove Answer</button>
          </div>
  
          <button type="button" @click="addAnswer(index)">Add Answer</button>
          <button type="button" @click="removeQuestion(index)">Remove Question</button>
        </div>
  
        <button type="button" @click="addQuestion">Add Question</button>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        quiz: {
          title: '',
          timer: 0,
        },
        questions: [
          { text: '', answers: [{ text: '', isCorrect: false }] },
        ],
      };
    },
    methods: {
      addQuestion() {
        this.questions.push({ text: '', answers: [{ text: '', isCorrect: false }] });
      },
      removeQuestion(questionIndex) {
        this.questions.splice(questionIndex, 1);
      },
      addAnswer(questionIndex) {
        this.questions[questionIndex].answers.push({ text: '', isCorrect: false });
      },
      removeAnswer(questionIndex, answerIndex) {
        this.questions[questionIndex].answers.splice(answerIndex, 1);
      },
      async createQuiz() {
        try {
          const response = await fetch('http://localhost:3000/api/quizzes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: this.quiz.title,
              timer: this.quiz.timer,
              questions: this.questions,
            }),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log('Quiz created successfully:', data);
        } catch (error) {
          console.error('Error creating quiz:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  