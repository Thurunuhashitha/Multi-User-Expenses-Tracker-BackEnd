const express = require('express');
const router = express.Router();

const { createExpense, getAllExpenses , deleteExpenses } = require('../controller/expensesController');
const { authenticateToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/add',authenticateToken,upload.single('bill_img'),createExpense);
router.get('/all', authenticateToken, getAllExpenses);
router.delete('/delete/:id', authenticateToken, deleteExpenses);

module.exports = router;
