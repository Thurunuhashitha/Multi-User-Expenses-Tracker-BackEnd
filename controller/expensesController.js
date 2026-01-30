const { getConnection } = require('../db/db-connection');
const connection = getConnection();

// CREATE EXPENSE
const createExpense = (req, res) => {
    const { reason, amount, date } = req.body;
    const bill_img = req.file ? req.file.filename : null;

    if (!reason || !amount || !date) {
        return res.status(400).json({ error: 'Reason, amount, and date are required' });
    }

    connection.query(
        'INSERT INTO expenses (reason, amount, date, bill_img) VALUES (?, ?, ?, ?)',
        [reason, amount, date, bill_img],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({ message: 'Expense added successfully', expenseId: results.insertId });
        }
    );
};

// GET ALL EXPENSES
const getAllExpenses = (req, res) => {
    connection.query('SELECT * FROM expenses', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { createExpense, getAllExpenses };
