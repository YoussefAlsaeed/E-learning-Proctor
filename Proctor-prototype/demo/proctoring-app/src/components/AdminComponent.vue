<template>
    <br>
    <br>
    <div class="admin-create-quiz">
      <h1>Create Quiz</h1>
      <form @submit.prevent="createQuiz" class="quiz-form">
        <label>Title:</label>
        <input v-model="quiz.title" required />
  
        <label>Timer (seconds):</label>
        <input type="number" v-model="quiz.timer" required />
  
        <h2>Create Questions</h2>
        <div v-for="(question, index) in questions" :key="index" class="question-container">
          <label>Question {{ index + 1 }}: </label>
          <input v-model="question.text" required />
  
          <h3>Answers</h3>
          <div v-for="(answer, answerIndex) in question.answers" :key="answerIndex" class="answer-container">
            <label>Answer {{ answerIndex + 1 }}: </label>
            <input v-model="answer.text" required />
            <input type="checkbox" v-model="answer.isCorrect" /> Correct
            <button type="button" @click="removeAnswer(index, answerIndex)">Remove Answer</button>
          </div>
  
          <button type="button" @click="addAnswer(index)">Add Answer</button>
          <button type="button" @click="removeQuestion(index)">Remove Question</button>
        </div>
  
        <button type="button" @click="addQuestion">Add Question</button>
        <br>

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
  
          // Clear the form on success
          this.quiz.title = '';
          this.quiz.timer = 0;
          this.questions = [{ text: '', answers: [{ text: '', isCorrect: false }] }];
  
          const data = await response.json();
          console.log('Quiz created successfully:', data);
          alert('Quiz created successfully!');
        } catch (error) {
          console.error('Error creating quiz:', error);
          alert('Error creating quiz. Please try again.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-create-quiz {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    color: #333; /* Text color on the background */
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  
  h1 {
    font-size: 30px;
    margin-bottom: 20px;
  }
  
  .quiz-form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  input {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
  }
  
  h2 {
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .question-container {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .answer-container {
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
  