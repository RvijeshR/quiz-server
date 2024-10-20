require('dotenv').config(); // Load environment variables

const { Sequelize } = require('sequelize');

// Create a Sequelize instance for your database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // or any other database dialect you're using, like 'postgres', 'sqlite', etc.
  logging: false,
});

// Check the connection to the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
