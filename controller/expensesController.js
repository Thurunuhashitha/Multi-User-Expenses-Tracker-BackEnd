const { getConnection } = require('../db/db-connection');
const connection = getConnection();

// CREATE EXPENSE
const createExpense = (req, res) => {
    const { reason, amount, date } = req.body;
    const bill_img = req.file ? req.file.filename : null;

    const id = req.user.id; // 🔥 USER ID FROM TOKEN

    if (!reason || !amount || !date) {
        return res.status(400).json({ error: 'Reason, amount, and date are required' });
    }

    connection.query(
        'INSERT INTO expenses (id, reason, amount, date, bill_img) VALUES (?, ?, ?, ?, ?)',
        [id, reason, amount, date, bill_img],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({
                message: 'Expense added successfully',
                expenseId: results.insertId
            });
        }
    );
};

// GET LOGGED-IN USER EXPENSES
const getAllExpenses = (req, res) => {
    const id = req.user.id;

    connection.query(
        'SELECT * FROM expenses WHERE id = ?',
        [id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
};

// Delete EXPENSES 
const deleteExpenses = (req, res) => {
    const expenseId = req.params.id;  // From URL 

    connection.query(
        'DELETE FROM expenses WHERE expense_id = ? ',
        [expenseId],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            if (result.affectedRows === 0) {
                return res.status(403).json({ message: 'Not authorized or expense not found' });
            }

            res.json({ message: 'Expense deleted successfully' });
        }
    );
};


module.exports = { createExpense, getAllExpenses, deleteExpenses };
