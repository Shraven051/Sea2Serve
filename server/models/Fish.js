import mongoose from 'mongoose';

const fishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageURL: { type: String, required: true },
    freshness: {
        type: String,
        required: true,
        enum: ['Fresh Today', '1 Day Old', 'Frozen']
    },
    pricePerKg: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 }
});

const Fish = mongoose.model('Fish', fishSchema);

export default Fish;
