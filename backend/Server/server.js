const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;


const ganhosRouter = require('../Router/ganhosRouter');
const gastosFixosRouter = require('../Router/gastosFixosRouter');
const gastosVariaveisRouter = require('../Router/gastosVariaveisRouter');

app.use(cors());
app.use(bodyParser.json());

app.use('/ganhos',ganhosRouter);
app.use('/gastosfixos', gastosFixosRouter);
app.use('/gastosvariaveis', gastosVariaveisRouter)


app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});


app.listen(port, () => {
  console.log(`Servidor do Express rodando na porta ${port}`);
});