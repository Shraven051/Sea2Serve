import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    area: { type: String, required: true },
    city: {
        type: String,
        required: true,
        default: 'Mangalore',
        validate: {
            validator: function (v) {
                return /mangalore/i.test(v);
            },
            message: props => `We only deliver to Mangalore!`
        }
    },
    cartItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Fish' },
        name: String,
        pricePerKg: Number,
        quantity: Number
    }],
    totalAmount: { type: Number, required: true },
    paymentMethod: {
        type: String,
        required: true,
        default: 'Cash on Delivery',
        enum: ['Cash on Delivery']
    },
    orderStatus: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled']
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
