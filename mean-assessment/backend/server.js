
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectMongoDB = require('./config/mongodb');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        message: 'Backend server is running'
    });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectMongoDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to start server');
        process.exit(1);
    }
}

startServer();
