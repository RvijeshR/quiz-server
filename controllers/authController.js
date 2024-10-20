// routes/auth.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');



const register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, password: hashedPassword, role });
    res.status(201).json(user);
  } catch (error) {
    // Check if the error is a unique constraint error (duplicate username)
    if (error.name == 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Username already exists' });
    }
    // Handle other errors
    res.status(500).json({ error: 'User registration failed' });
  }
};


const getvalue = async (req, res)=>{
  console.log("lj njkjbk;jbbno'ns")
      res.status(200).json({ massage: 'User registration failed' });
    
}


const login = async(req, res) => {
  const { username, password } = req.body;
  try {
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(400).json({ message: 'User Not Found'  });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: "User Login successfully", user, token });
  } catch (error) {
      res.status(500).json({ massage: 'Login failed', error });
  }
}

module.exports = {
  login,
  register,
  getvalue

};
