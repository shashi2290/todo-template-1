const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Registration
router.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    user.save().then(user => {
      res.status(200).json({success: true, user});
    }).catch(err => {
      res.status(500).json({error: "Registration failed"});
    });

  } catch(err) {
    res.status(500).json({error: "Registration failed"});
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const {email, password, username} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({error: "User not found"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({error: "Invalid credentials"});
    }
    const token = jwt.sign({id: user._id}, 'secret', {expiresIn: '1d'});
    res.status(200).json({success: true, token});
  } catch(err) {
    res.status(500).json({error: "Login failed"});
  }
});


module.exports = router;