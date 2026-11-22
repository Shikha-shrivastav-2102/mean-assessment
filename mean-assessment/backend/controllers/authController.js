
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../config/mysql');

// REGISTER
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (
            typeof username !== 'string' ||
            !username.trim() ||
            typeof password !== 'string' ||
            password.length < 8
        ) {
            return res.status(400).json({
                message: 'Enter username and password of at least 8 characters'
            });
        }

        const [existing] = await db.execute(
            'SELECT id FROM users WHERE username = ?',
            [username.trim()]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                message: 'Username already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username.trim(), hashedPassword]
        );

        return res.status(201).json({
            message: 'Registration successful'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Registration failed'
        });
    }
};


// LOGIN
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (
            typeof username !== 'string' ||
            typeof password !== 'string' ||
            !username.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }

        const [users] = await db.execute(
            'SELECT * FROM users WHERE username = ?',
            [username.trim()]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Login failed'
        });
    }
};
