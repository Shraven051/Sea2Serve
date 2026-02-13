import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, MapPin, Phone, User, ShoppingBag, CreditCard } from 'lucide-react';

const CartModal = ({ isOpen, onClose, items, totalAmount, onCheckout }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        city: 'Mangalore',
        area: '',
        address: '',
        pincode: '',
        paymentMethod: 'Cash on Delivery'
    });

    const [errorMSG, setErrorMSG] = useState('');
    const [showCheckout, setShowCheckout] = useState(false);

    const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.city.toLowerCase() !== 'mangalore') {
            setErrorMSG('Currently delivering only within Mangalore city limits.');
            return;
        }
        setErrorMSG('');
        onCheckout(formData);
    };

    const calculateSubtotal = () => items.reduce((acc, item) => acc + (item.pricePerKg * item.quantity), 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-[101] flex flex-col h-full border-l border-gray-100"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 backdrop-blur">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-primary-color">
                                <ShoppingBag className="text-secondary-color" size={24} />
                                Your Catch
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-primary-color"
                                aria-label="Close cart"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-grow overflow-y-auto p-8 scrollbar-thin">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                        <ShoppingBag size={48} className="text-gray-400" />
                                    </div>
                                    <p className="text-xl font-medium text-gray-800 mb-2">Your basket is empty.</p>
                                    <p className="text-gray-500 mb-8">Looks like you haven't made a choice yet.</p>
                                    <button
                                        onClick={onClose}
                                        className="mt-2 text-secondary-color font-bold hover:underline"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {/* Cart Items List */}
                                    {!showCheckout && (
                                        <div className="space-y-6">
                                            {items.map((item, index) => (
                                                <motion.div
                                                    layout
                                                    key={`${item._id}-${index}`}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group"
                                                >
                                                    <img src={item.imageURL} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                                                    <div className="flex-grow flex flex-col justify-center">
                                                        <h4 className="font-bold text-lg text-primary-color leading-tight mb-1">{item.name}</h4>
                                                        <div className="text-sm text-gray-500 mb-2 font-medium">
                                                            {formatPrice(item.pricePerKg)} x <span className="font-bold text-secondary-color">{item.quantity} kg</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end justify-between py-2">
                                                        <div className="font-bold text-lg text-primary-color">{formatPrice(item.pricePerKg * item.quantity)}</div>
                                                        {/* <button className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={18} /></button> */}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Checkout Form */}
                                    {showCheckout && (
                                        <motion.form
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="space-y-6"
                                            onSubmit={handleSubmit}
                                        >
                                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary-color border-b pb-4">
                                                <MapPin size={20} className="text-accent-color" />
                                                Delivery Details
                                            </h3>

                                            <div className="space-y-4">
                                                <div className="relative group">
                                                    <User size={18} className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-secondary-color transition-colors" />
                                                    <input
                                                        type="text"
                                                        name="customerName"
                                                        placeholder="Full Name"
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-color/20 focus:border-secondary-color outline-none transition-all placeholder-gray-400 text-gray-700"
                                                        value={formData.customerName}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="relative group">
                                                    <Phone size={18} className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-secondary-color transition-colors" />
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        placeholder="Phone Number"
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-color/20 focus:border-secondary-color outline-none transition-all placeholder-gray-400 text-gray-700"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            value={formData.city}
                                                            readOnly
                                                            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed font-medium select-none"
                                                        />
                                                        <span className="absolute right-3 top-3 text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">VALID</span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="pincode"
                                                        placeholder="Pincode"
                                                        required
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-color/20 focus:border-secondary-color outline-none text-gray-700"
                                                        value={formData.pincode}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <textarea
                                                    name="address"
                                                    placeholder="Complete Address (House No, Street, Landmark)"
                                                    required
                                                    rows="3"
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-color/20 focus:border-secondary-color outline-none resize-none transition-all text-gray-700"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                ></textarea>

                                                <div className="p-4 bg-teal-50 rounded-xl border border-teal-100 flex items-center justify-between shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <CreditCard className="text-teal-600" />
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-teal-900 text-sm">Payment Method</span>
                                                            <span className="text-xs text-teal-700">Pay on delivery</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs font-bold bg-white text-teal-800 px-3 py-1.5 rounded-lg border border-teal-100 shadow-sm uppercase tracking-wide">COD Only</span>
                                                </div>
                                            </div>

                                            {errorMSG && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium flex items-center gap-2"
                                                >
                                                    ⚠️ {errorMSG}
                                                </motion.div>
                                            )}
                                        </motion.form>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-8 border-t bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] space-y-6">
                                <div className="flex justify-between items-center text-lg font-medium text-gray-500">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(calculateSubtotal())}</span>
                                </div>
                                <div className="flex justify-between items-center text-3xl font-extrabold text-primary-color tracking-tight">
                                    <span>Total</span>
                                    <span>{formatPrice(calculateSubtotal())}</span>
                                </div>

                                {!showCheckout ? (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setShowCheckout(true)}
                                        className="w-full py-4 bg-secondary-color text-white rounded-xl font-bold text-lg shadow-lg shadow-secondary-color/20 hover:shadow-xl hover:bg-primary-color transition-all flex items-center justify-center gap-3"
                                    >
                                        Proceed to Checkout
                                    </motion.button>
                                ) : (
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowCheckout(false)}
                                            className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors w-1/3"
                                        >
                                            Back
                                        </button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSubmit}
                                            className="flex-grow py-4 bg-accent-color text-primary-color rounded-xl font-bold text-lg shadow-lg shadow-accent-color/30 hover:bg-teal-400 transition-all flex items-center justify-center gap-2 w-2/3"
                                        >
                                            Place Order
                                        </motion.button>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartModal;
