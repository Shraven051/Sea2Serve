import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Fish, Sparkles, HandCoins } from 'lucide-react';

const TrustSection = () => {
    const cards = [
        {
            icon: <Truck size={40} className="text-secondary-color" />,
            title: 'Same Day Delivery',
            desc: 'Order before 11 AM, get it by 2 PM.'
        },
        {
            icon: <Fish size={40} className="text-accent-color" />,
            title: '100% Fresh Catch',
            desc: 'Sourced daily from Mangalore Bunder.'
        },
        {
            icon: <Sparkles size={40} className="text-blue-500" />,
            title: 'Hygienic Cleaning',
            desc: 'Cleaned, cut & vacuum packed.'
        },
        {
            icon: <HandCoins size={40} className="text-emerald-500" />,
            title: 'Cash on Delivery',
            desc: 'Pay only when you see the fresh fish.'
        }
    ];

    return (
        <section className="bg-white py-24 border-b border-gray-100" id="about">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-extrabold text-primary-color mb-4 tracking-tight">Why Choose Sea2Serve?</h2>
                    <div className="w-20 h-1.5 bg-accent-color mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
                            className="p-10 rounded-3xl bg-gray-50/50 border border-gray-100 text-center hover:bg-white transition-all duration-300 group flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-xl relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-gray-100 group-hover:border-accent-color/30 group-hover:shadow-accent-color/10">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-color transition-colors">{card.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                            </div>

                            {/* Subtle background decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity translate-x-1/2 -translate-y-1/2"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
