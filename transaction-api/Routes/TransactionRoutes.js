const express = require('express');
const { initializeDatabase, listTransactions, getStatistics, getBarChartData, getPieChartData, combinedData } = require('../controllers/transactionController');

const router = express.Router();

router.get('/initialize', initializeDatabase);
router.get('/transactions', listTransactions);
router.get('/statistics', getStatistics);
router.get('/barchart', getBarChartData);
router.get('/piechart', getPieChartData);
router.get('/api', combinedData);

module.exports = router;
