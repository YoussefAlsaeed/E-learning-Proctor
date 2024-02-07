const { Sequelize } = require('sequelize');
const QuizModel = require('./models/quiz');
const QuestionModel = require('./models/question');
const AnswerModel = require('./models/answer'); 

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'quiz.db',
});

const Quiz = QuizModel(sequelize);
const Question = QuestionModel(sequelize);
const Answer = AnswerModel(sequelize); 

Quiz.hasMany(Question);
Question.belongsTo(Quiz);

Question.hasMany(Answer); 
Answer.belongsTo(Question); 

// sequelize.sync({ force: true }) 
//   .then(() => console.log('Database & tables created!'));

module.exports = {
  sequelize,
  Quiz,
  Question,
  Answer, 
};
