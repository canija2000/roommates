const express = require('express');
const { getGastos, createGasto, updateGasto, deleteGasto } = require('../controllers/gastos');

const router = express.Router();

router.get('/gastos', getGastos);
router.post('/gastos', createGasto);
router.delete('/gasto', deleteGasto);
router.put('/gasto', updateGasto);

module.exports = router;

