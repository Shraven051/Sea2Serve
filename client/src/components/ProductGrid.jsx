import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const ProductGrid = ({ products, onAddToCart, loading }) => {
    if (loading) {
        return (
            <section className="bg-background-color py-24" id="shop">
                <div className="container mx-auto px-6">
                    <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-16 animate-pulse"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-[400px] bg-white rounded-3xl shadow-sm border border-gray-100 animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-t-3xl"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                                    <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-background-color py-24 relative" id="shop">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-secondary-color font-bold tracking-wider uppercase text-sm mb-2 block">Premium Quality</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-primary-color mb-6 drop-shadow-sm">
                        Fresh Catch of the Day
                    </h2>
                    <div className="w-24 h-1.5 bg-accent-color mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                        Sourced directly from local fishermen in Mangalore. We ensure every fish is cleaned, packed, and delivered with the utmost care for freshness.
                    </p>
                </motion.div>

                {!products || products.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24 px-6 bg-white rounded-3xl border-2 border-dashed border-gray-200 max-w-2xl mx-auto shadow-sm"
                    >
                        <div className="text-7xl mb-6">🎣</div>
                        <h3 className="text-3xl font-bold text-primary-color mb-3">No Fresh Catch Available Today</h3>
                        <p className="text-gray-500 text-lg">We only sell what's fresh. Please check back tomorrow morning.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
                        {products.map((product, index) => (
                            <ProductCard
                                key={product._id || product.id}
                                product={product}
                                index={index}
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductGrid;
