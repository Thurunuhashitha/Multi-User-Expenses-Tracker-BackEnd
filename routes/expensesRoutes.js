const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const { createExpense, getAllExpenses } = require('../controller/expensesController');

router.post('/create', upload.single('bill_img'), createExpense);
router.get('/all', getAllExpenses);

module.exports = router;
