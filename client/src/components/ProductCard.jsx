import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, index, onAddToCart }) => {
    const [qty, setQty] = useState(1);

    const getBadgeColor = (status) => {
        switch (status.toLowerCase()) {
            case 'fresh today': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case '1 day old': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'frozen': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const handleIncrement = () => setQty(q => q + 1);
    const handleDecrement = () => setQty(q => q > 1 ? q - 1 : 1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col h-full group hover:border-accent-color/50 transition-all duration-300"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden h-[250px] bg-gray-100">
                <motion.img
                    src={product.imageURL}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.05]"
                />

                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm backdrop-blur-sm z-10 ${getBadgeColor(product.freshness)}`}>
                    {product.freshness}
                </div>

                {/* Out of Stock Overlay */}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-10">
                        <span className="text-white font-bold text-lg border-2 border-white px-6 py-2 rounded uppercase tracking-wider bg-black/20">Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="p-6 flex-grow flex flex-col">
                <div className="mb-2">
                    <h3 className="font-bold text-xl text-primary-color group-hover:text-secondary-color transition-colors leading-tight">
                        {product.name}
                    </h3>
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                <div className="mt-auto space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-secondary-color tracking-tight">
                            ₹{product.pricePerKg}
                            <span className="text-sm text-gray-400 font-normal ml-1">/kg</span>
                        </span>

                        {/* Quantity Selector */}
                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <button
                                onClick={handleDecrement}
                                className="p-2 hover:bg-gray-200 transition-colors disabled:opacity-50"
                                disabled={product.stock === 0}
                                aria-label="Decrease quantity"
                            >
                                <Minus size={16} className="text-gray-600" />
                            </button>
                            <span className="w-10 text-center font-bold text-gray-700">{qty}</span>
                            <button
                                onClick={handleIncrement}
                                className="p-2 hover:bg-gray-200 transition-colors disabled:opacity-50"
                                disabled={product.stock === 0}
                                aria-label="Increase quantity"
                            >
                                <Plus size={16} className="text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        disabled={product.stock === 0}
                        onClick={() => onAddToCart({ ...product, quantity: qty })}
                        className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all shadow-md active:shadow-sm ${product.stock > 0
                            ? 'bg-primary-color text-white hover:bg-secondary-color shadow-primary-color/20'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <ShoppingCart size={18} className={product.stock > 0 ? "group-hover:animate-bounce" : ""} />
                        {product.stock > 0 ? "Add to Cart" : "Unavailable"}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
