import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Fish from './models/Fish.js';
import Order from './models/Order.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sea2serve')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes

// Get all fish
app.get('/api/fish', async (req, res) => {
    try {
        const fish = await Fish.find();
        res.json(fish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Seed data route (for convenience)
app.post('/api/seed', async (req, res) => {
    try {
        await Fish.deleteMany({});
        const seedFish = [
            {
                name: 'Seer Fish/Anjal (Whole)',
                imageURL: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=1000&auto=format&fit=crop',
                freshness: 'Fresh Today',
                pricePerKg: 820,
                description: 'Premium King Fish, perfect for fry.',
                stock: 50
            },
            {
                name: 'Pomfret/Manji',
                imageURL: 'https://images.unsplash.com/photo-1611181829929-232675713c54?q=80&w=1000&auto=format&fit=crop',
                freshness: 'Fresh Today',
                pricePerKg: 680,
                description: 'Great for Tandoori.',
                stock: 30
            },
            {
                name: 'Mackerel/Bangude',
                imageURL: 'https://images.unsplash.com/photo-1621858564222-38374828b12f?q=80&w=1000&auto=format&fit=crop',
                freshness: 'Fresh Today',
                pricePerKg: 260,
                description: 'Rich in Omega-3.',
                stock: 100
            },
            {
                name: 'Sardine/Mathi',
                imageURL: 'https://plus.unsplash.com/premium_photo-1675237626068-de466bba788d?q=80&w=1000&auto=format&fit=crop',
                freshness: 'Fresh Today',
                pricePerKg: 180,
                description: 'Small, tasty, and nutrient-rich.',
                stock: 80
            },
            {
                name: 'King Fish/Viswan',
                imageURL: 'https://images.unsplash.com/photo-1615141982880-199109408852?q=80&w=1000&auto=format&fit=crop',
                freshness: 'Fresh Today',
                pricePerKg: 900,
                description: 'High quality steak fish.',
                stock: 25
            },
            {
                name: 'Tuna/Kere Meen',
                imageURL: 'https://images.unsplash.com/photo-1598511796318-7b8256bd2b20?q=80&w=1000&auto=format&fit=crop',
                freshness: '1 Day Old',
                pricePerKg: 550,
                description: 'Best for curry and steaks.',
                stock: 40
            }
        ];
        await Fish.insertMany(seedFish);
        res.json({ message: 'Database seeded successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create Order
app.post('/api/orders', async (req, res) => {
    try {
        const { city, paymentMethod } = req.body;

        // Server-side validation
        if (city.toLowerCase() !== 'mangalore') {
            return res.status(400).json({ message: 'Delivery available ONLY within Mangalore.' });
        }

        if (paymentMethod !== 'Cash on Delivery') {
            return res.status(400).json({ message: 'Only Cash on Delivery is accepted.' });
        }

        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
