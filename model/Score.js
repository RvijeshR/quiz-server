const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Submission = sequelize.define('Submission', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  answers: {
    type: DataTypes.JSON, // Store answers as JSON
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Submission;
