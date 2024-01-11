const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

const { GetGanhos, DeletaGanhos, AddGanhos } = require('../Controller/Ganhos.js');

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.get('/ganhos', GetGanhos.getAllGanhos);
app.delete('/deleta-ganhos/:id', DeletaGanhos.deletaGanhos);
app.post('/adicionarGanhos', AddGanhos.addGanhos);

// app.get('/api/teste', (req, res) =>{
// 	const data = {message: 'Deu tudo certo'}
// 	res.json(data);
// });

// app.get('/api/insert', (req,res) => {
// 	insertTable();
// 	res.send('Usuario salvo com sucesso');
// });

app.listen(port, () => {
  console.log(`Servidor do Express rodando na porta ${port}`);
});