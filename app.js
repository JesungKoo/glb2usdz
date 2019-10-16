const express = require('express');
const bodyParser = require('body-parser'); 
const ejs = require('ejs');

const tableRouter = require('./routers/table');
const sofaRouter = require('./routers/sofa');
const rootRouter = require('./routers/root');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/table', tableRouter);
app.use('/sofa', sofaRouter);

app.listen(port, () => console.log(`App on ${port}!`));