const express = require('express');
const ejs = require('ejs');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.render('index.ejs'));

app.post('/', (req, res) => {
  exec('sh glb2usdz.sh');
  res.send("Done!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));