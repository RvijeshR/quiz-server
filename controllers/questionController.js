// routes/questions.js
const express = require('express');
const Question = require('../model/Question');
const Score = require('../model/Score');
const User = require('../model/User');


// Create Quiz Question (Only for Teachers)
const QuestionRegister = async (req, res) => {
    if (req.user.role !== 'Teacher') {
      return res.status(403).json({ error: 'Access denied' });
    }
  
    const { questionText, options, correctAnswer } = req.body;
    try {
      // Store the options as a JSON object (for example: {a: "hig", b: "tftft", c: "yguyf", d: "kuygf"})
      const question = await Question.create({
        questionText,
        options, // Expecting the options as an object { a: 'option A', b: 'option B', c: 'option C', d: 'option D' }
        correctAnswer,
        teacherId: req.user.id
      });
  
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create question' });
    }
  };

// Get Quiz Questions (For Students)
const getQuestions =  async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json({mesage:"get ", questions});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};
const getScore = async (req, res) => {
    const { id } = req.params; // Get userId from the request parameters

    try {
        // Find the last score for the specified userId
        const lastScore = await Score.findOne({
            where: { userId: id },
            order: [['createdAt', 'DESC']] // Assuming you have a createdAt timestamp
        });
        
        // Check if a score is found
        if (!lastScore) {
            return res.status(404).json({ message: 'No scores found for this user.' });
        }

        res.json({ message: "Last score fetched successfully", lastScore });
    } catch (error) {
        console.error('Error fetching last score:', error);
        res.status(500).json({ error: 'Failed to fetch last score' });
    }
};


// Delete Question by ID
const deleteQuestion = async (req, res) => {
    const { id } = req.params; // Get the question ID from the request parameters
  
    try {
      // Find the question by ID
      const question = await Question.findByPk(id);
  
      // Check if the question exists
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      // Delete the question
      await question.destroy();
      
      res.json({ message: 'Question deleted successfully' });
    } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).json({ error: 'Failed to delete question' });
    }
  };


// Update Question by ID
const updateQuestion = async (req, res) => {
    const { id } = req.params; // Get the question ID from the request parameters
    const { questionText, options, correctAnswer } = req.body; // Destructure the request body

    try {
        // Find the question by ID
        const question = await Question.findByPk(id);

        // Check if the question exists
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Update the question details
        await question.update({
            questionText,
            options, // Expecting options as an object or JSON string
            correctAnswer,
        });

        res.json({ message: 'Question updated successfully', question });
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ error: 'Failed to update question' });
    }
};



const scroe =  async (req, res) => {
  const { userId, answers, score } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Save the submission in the database
    await Score.create({
      userId,
      answers,
      score,
    });

    res.status(200).json({ message: 'Answers submitted successfully!' });
  } catch (error) {
    console.error('Error submitting answers:', error);
    res.status(500).json({ error: 'Failed to submit answers' });
  }
}


module.exports = {
    getQuestions,QuestionRegister, deleteQuestion, updateQuestion, scroe, getScore
};
