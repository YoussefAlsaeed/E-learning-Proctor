<template>
  <div>
    <h1>{{ quiz.title }}</h1>
    <p v-if="timer > 0">Time remaining: {{ timer }} seconds</p>
    <form @submit.prevent="submitAnswers">
      <div v-for="(question, index) in quiz.Questions" :key="index">
        <h2>{{ question.text }}</h2>
        <div v-for="(answer, answerIndex) in question.Answers" :key="answerIndex">
          <input
            type="radio"
            :name="`question-${index}`"
            :value="answer.id" 
            v-model="answers[index]"
          />
          <label>{{ answer.text }}</label>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quiz: [],
      answers: [],
      timer: 0,
    };
  },
  async created() {
    try {
      const response = await fetch(`http://localhost:3000/api/quizzes/${this.$route.params.id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.quiz = await response.json();

      if (!this.quiz.Questions) {
        throw new Error('Quiz questions not found in the API response');
      }

      this.answers = new Array(this.quiz.Questions.length).fill(null);

      this.timer = this.quiz.timer;

      this.startTimer();

      setTimeout(() => {
        this.submitAnswers();
      }, this.timer * 1000);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  },
  methods: {
    async submitAnswers() {
      const response = await fetch(`http://localhost:3000/api/quizzes/${this.$route.params.id}/grade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.answers),
      });
      const grade = await response.json();
      console.log('Your grade:', grade);

      this.$router.push('/student');
    },
    startTimer() {
      const timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(timerInterval);
        }
      }, 1000);
    },
  },
};
</script>
