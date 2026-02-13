import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = ({ onOrderClick }) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary-color py-20">

            {/* Dynamic Background */}
            <motion.div
                className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.4]"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1615141982880-199109408852?q=80&w=2070&auto=format&fit=crop')`,
                    y: y
                }}
            />

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-primary-color via-primary-color/60 to-transparent opacity-90" />

            {/* Content */}
            <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    {/* Badges */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <span className="bg-accent-color/10 border border-accent-color/30 text-accent-color px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
                            Mangalore Only
                        </span>
                        <span className="bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
                            Cash on Delivery
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-xl tracking-tight">
                        Fresh Catch, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-color to-cyan-300">
                            Straight to Doorstep.
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed">
                        Premium quality, export-grade fresh fish delivered exclusively within Mangalore. No frozen, no chemicals.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(45, 212, 191, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onOrderClick}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary-color transition-all duration-200 bg-accent-color rounded-xl hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-accent-color overflow-hidden shadow-2xl"
                    >
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                        <span className="relative flex items-center gap-2">
                            Order Fresh Fish
                            <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            {/* SVG Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block">
                    <path fill="#F5F7FA" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
