const express = require('express')
const router = express.Router()

const ganhosController  = require('../Controller/ganhosController');

router.get('/', ganhosController.getAllGanhos);
router.delete('/deleta-ganhos/:id', ganhosController.deletaGanhos);
router.post('/adicionarGanhos', ganhosController.addGanhos)


module.exports = router