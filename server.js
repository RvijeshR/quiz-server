require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const cors = require('cors');
const router = require("./router")
const sequelize = require('./db'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS if needed
router.init_routes(app)

// Sync database and start the server
sequelize.sync()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running successfully on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database: ', err);
  });
