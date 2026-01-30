const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { getConnection } = require('../db/db-connection');
const connection = getConnection();

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'name , email and password required' });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        connection.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword],
            (err) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ error: 'Email already exists' });
                    }
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'User registered successfully' });
            }
        );

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// LOGIN
const login = async (req, res) => {
    console.log('REQ BODY:', req.body);
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'email and password required' });
        }

        connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (err, results) => {
                if (err) return res.status(500).json({ error: err.message });

                if (results.length === 0) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }

                const user = results[0];

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }

                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.json({
                    message: 'Login successful',
                    token
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };
