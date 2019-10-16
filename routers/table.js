const express = require('express');
const { exec } = require('child_process');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('table');
  })

router.route('/output')
  .get((req, res) => {
    // exec('sh glb2usdz.sh');
    // res.render('table-output', { test: req });
    res.send('heelo');
  })
  .post((req, res) => {
    res.render('table-output', { table: req.body });
    // res.redirect('/table/output', req);
  });

module.exports = router;