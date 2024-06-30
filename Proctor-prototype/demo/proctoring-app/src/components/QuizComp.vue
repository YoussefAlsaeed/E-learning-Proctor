<template>
  <div class="quiz-container">
    <VideoPlayer ref="videoPlayer" class="video-player" />
    <div class="quiz-content" :class="{ disabled: !isFullscreen }">
      <h1>{{ quiz.title }}</h1>
      <p v-if="timer > 0">Time remaining: {{ timer }} seconds</p>
      <form @submit.prevent="submitAnswers">
        <div v-for="(question, index) in quiz.Questions" :key="index" class="card">
          <h2>{{ question.text }}</h2>
          <div v-for="(answer, answerIndex) in question.Answers" :key="answerIndex">
            <input
              type="radio"
              :name="`question-${index}`"
              :value="answer.id" 
              v-model="answers[index]"
              :disabled="!isFullscreen"
            />
            <label>{{ answer.text }}</label>
          </div>
        </div>
        <button type="submit" :disabled="!isFullscreen">Submit</button>
      </form>
    </div>

    <!-- Fullscreen Popup -->
    <div v-if="showFullscreenPopup" class="fullscreen-popup">
      <p>To take the exam, you must be in fullscreen mode.</p>
      <button @click="enterFullscreen">OK</button>
    </div>

    <!-- Result Popup -->
    <div v-if="showResultPopup" class="result-popup">
      <p>Your grade: {{ result.grade }} / {{ result.totalQuestions }}</p>
      <button @click="closeResultPopup">Close</button>
    </div>
  </div>
</template>

<script>
import VideoPlayer from './VideoPlayer.vue';

export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {
      quiz: [],
      answers: [],
      timer: 0,
      showResultPopup: false,
      showFullscreenPopup: true,
      isFullscreen: false,
      result: {
        grade: 0,
        correctAnswers: 0,
        totalQuestions: 0,
      },
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
      this.result.totalQuestions = this.quiz.Questions.length;

      setTimeout(() => {
        this.submitAnswers();
      }, this.timer * 1000);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  },

  beforeRouteLeave(to, from, next) {
    clearInterval(this.timerInterval);
    this.$refs.videoPlayer.stopFaceDetection();
    next();
  },

  methods: {
    async submitAnswers() {
      const response = await fetch(`http://localhost:3000/api/quizzes/${this.$route.params.id}/grade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.answers),
      });

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return;
      }

      const gradeData = await response.json();
      console.log('Your grade:', gradeData);

      this.result.grade = gradeData.score;

      this.showResultPopup = true;
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

    enterFullscreen() {
      const elem = document.documentElement;
      const onFullscreenChange = () => {
        this.isFullscreen = !!document.fullscreenElement;
        if (!this.isFullscreen) {
          this.$router.push('/student');
        }
      };

      document.addEventListener('fullscreenchange', onFullscreenChange);

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }

      this.showFullscreenPopup = false;
    },

    openResultPopup() {
      this.showResultPopup = true;
    },

    closeResultPopup() {
      this.showResultPopup = false;
      this.$router.push('/student'); 
    },
  },
};
</script>

<style scoped>
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}

.video-player {
  position: relative;
  width: 100%;
  height: auto; 
  z-index: 1;
}

.quiz-content {
  width: 90%; 
  margin: 0 auto;
}

.card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px 0;
  padding: 15px;
  width: 100%; 
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #2980b9;
}

.fullscreen-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.result-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.result-popup p {
  font-size: 16px;
  margin-bottom: 10px;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
