const express = require('express');
const { exec } = require('child_process');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('sofa');
  })

module.exports = router;