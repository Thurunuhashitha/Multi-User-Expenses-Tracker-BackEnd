const express = require('express')
const cors = require('cors')
const path = require('path')   // ✅ ADD THIS

const app = express()

// 🔥 VERY IMPORTANT
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ SERVE UPLOADED IMAGES
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ROUTES
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

const expensesRoutes = require('./routes/expensesRoutes')
app.use('/api/expenses', expensesRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
