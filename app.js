const express = require('express');
const ejs = require('ejs');

const app = express();
const port = 8000;

const tableRouter = require('./routers/table');
const rootRouter = require('./routers/root');

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/table', tableRouter);

app.listen(port, () => console.log(`App on ${port}!`));