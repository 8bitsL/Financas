const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

// const { GetGanhos, DeletaGanhos, AddGanhos } = require('../Controller/Ganhos.js');
const ganhosRouter = require('../Router/ganhosRouter');

app.use(cors());
app.use(bodyParser.json());

app.use('/ganhos',ganhosRouter);


app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

// app.get('/ganhos', GetGanhos.getAllGanhos);
// app.delete('/deleta-ganhos/:id', DeletaGanhos.deletaGanhos);
// app.post('/adicionarGanhos', AddGanhos.addGanhos);

app.listen(port, () => {
  console.log(`Servidor do Express rodando na porta ${port}`);
});