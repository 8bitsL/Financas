const express = require('express')
const router = express.Router()
const gastosVariaveisController = require('../Controller/gastosVariaveisController');


router.get('/', gastosVariaveisController.getAllGastosVariaveis);
router.delete('/delet/:id', gastosVariaveisController.deletaGastosVariaveis)
router.post('/add', gastosVariaveisController.addGastosVariaveis)



module.exports = router