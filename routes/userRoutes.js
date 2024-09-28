const express = require('express');
const router = express.Router();
const User = require('../model/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('users', { users }); // Render the users EJS template
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
