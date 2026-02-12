const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

// ✅ Allow only your frontend domain
app.use(cors({
    origin: 'https://react.thurunu.me',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

const expensesRoutes = require('./routes/expensesRoutes')
app.use('/api/expenses', expensesRoutes)

const PORT = process.env.PORT || 3000

// Better for VPS
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})
