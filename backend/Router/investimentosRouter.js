const express = require('express')
const router = express.Router()

const investimentosController  = require('../Controller/investimentosController');

router.get('/', investimentosController.getAllInvestimentos);
router.delete('/delet/:id', investimentosController.deletaInvestimentos);
router.post('/add', investimentosController.addInvestimentos)


module.exports = router