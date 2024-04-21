const express = require('express');
const { casa,addRommie,getRommie} = require('../controllers/mates')
const { getGastos} = require('../controllers/gastos')

const router = express.Router()

router.get('/', casa);
router.post('/roommate',addRommie)
router.get('/roommates',getRommie)
router.get('/gastos',getGastos)

module.exports = router;

