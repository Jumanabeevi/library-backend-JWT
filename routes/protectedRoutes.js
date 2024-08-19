const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/secure-data', authMiddleware, (req, res) => {
  res.send('This is protected data');
});

module.exports = router;
