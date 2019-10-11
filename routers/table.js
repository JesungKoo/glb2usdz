const express = require('express');
const { exec } = require('child_process');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('table');
  })
  .post((req, res) => {
    res.redirect('/table/output');
  });

router.route('/output')
  .get((req, res) => {
    // exec('sh glb2usdz.sh');
    res.render('table-output');
  });

module.exports = router;