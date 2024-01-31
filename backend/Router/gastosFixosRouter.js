const express = require('express')
const router = express.Router()
const gastosFixosController = require('../Controller/gastosFixosController');


router.get('/', gastosFixosController.getAllGastosFixos);
router.delete('/delet/:id', gastosFixosController.deletaGastosFixos)
router.post('/add', gastosFixosController.addGastosFixos)



module.exports = router