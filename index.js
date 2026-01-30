const express = require('express'); 

const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const expensesRoutes = require('./routes/expensesRoutes');
app.use('/api/expenses', expensesRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
