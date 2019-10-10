const express = require('express');
const ejs = require('ejs');
const { exec } = require('child_process');
const app = express();
const port = 8000;

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { message: '??' });

});

app.post('/', (req, res) => {
  // exec('sh glb2usdz.sh');
  // console.log(req);
  res.render('model');
});

app.get('/table', (req, res) => {
  res.render('table');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));