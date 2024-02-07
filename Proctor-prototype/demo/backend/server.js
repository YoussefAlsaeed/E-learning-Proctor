const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, Quiz, Question, Answer } = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());


app.post('/api/quizzes', async (req, res) => {
  try {
    const { title, timer, questions } = req.body;

    const quiz = await Quiz.create({ title, timer });

    await Promise.all(
      questions.map(async (question) => {
        const createdQuestion = await Question.create({ text: question.text, QuizId: quiz.id });

        await Promise.all(
          question.answers.map(async (answer) => {
            await Answer.create({ text: answer.text, isCorrect: answer.isCorrect, QuestionId: createdQuestion.id });
          })
        );
      })
    );

    res.json({ success: true, quizId: quiz.id });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/quizzes', async (req, res) => {
    try {
      const quizzes = await Quiz.findAll({
        include: {
          model: Question,
          include: Answer 
        }
      });
  
      res.json(quizzes);
    } catch (error) {
      console.error('Error getting quizzes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  app.get('/api/quizzes/:id', async (req, res) => {
    try {
      const quiz = await Quiz.findByPk(req.params.id, {
        include: {
          model: Question,
          include: Answer
        }
      });
  
      if (quiz) {
        res.json(quiz);
      } else {
        res.status(404).json({ error: 'Quiz not found' });
      }
    } catch (error) {
      console.error('Error getting quiz:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/api/quizzes/:id/grade', async (req, res) => {
    try {
      const quiz = await Quiz.findByPk(req.params.id, {
        include: {
          model: Question,
          include: Answer
        }
      });
  
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      const userAnswers = req.body;
      let score = 0;
  
      quiz.Questions.forEach((question, index) => {
        const correctAnswer = question.Answers.find(answer => answer.isCorrect);
        if (userAnswers[index] === correctAnswer.id) {
          score++;
        }
      });
  
      res.json({ score });
    } catch (error) {
      console.error('Error grading quiz:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});