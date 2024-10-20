const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Question = sequelize.define('Question', {
  questionText: {
    type: DataTypes.STRING,
    allowNull: false
  },
  options: {
    type: DataTypes.JSON, // Store options as JSON
    allowNull: false
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Question.belongsTo(User, { as: 'teacher' }); // Only teachers can create questions

module.exports = Question;
