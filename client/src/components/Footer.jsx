import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-primary-color text-white relative pt-24 pb-12 overflow-hidden" id="contact">

            {/* Wave Background */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
                    <path fill="#2DD4BF" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,181.3C384,203,480,213,576,197.3C672,181,768,139,864,138.7C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 mb-16 items-start">

                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:items-start text-center md:text-left"
                    >
                        <h3 className="text-3xl font-extrabold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent-color to-cyan-300">
                            Sea2Serve
                        </h3>
                        <p className="text-gray-400 leading-relaxed font-light mb-8 max-w-sm">
                            Delivering the freshest catch from Mangalore's seas directly to your kitchen. Quality you can trust, taste you won't forget.
                        </p>
                        <div className="flex gap-4">
                            {['Facebook', 'Instagram', 'Twitter'].map((social, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-color hover:text-primary-color transition-all duration-300 backdrop-blur-sm"
                                    aria-label={social}
                                >
                                    {social[0]}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center md:items-start text-center md:text-left"
                    >
                        <h4 className="text-xl font-bold mb-8 relative inline-block">
                            Contact Us
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent-color rounded-full"></span>
                        </h4>
                        <ul className="space-y-6 text-gray-300 font-light">
                            <li className="flex items-center gap-4 group">
                                <span className="w-10 h-10 bg-secondary-color/20 rounded-full flex items-center justify-center text-accent-color group-hover:scale-110 transition-transform">📞</span>
                                <span className="group-hover:text-accent-color transition-colors">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <span className="w-10 h-10 bg-secondary-color/20 rounded-full flex items-center justify-center text-accent-color group-hover:scale-110 transition-transform">📍</span>
                                <span className="group-hover:text-accent-color transition-colors">Mangalore, Karnataka</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <span className="w-10 h-10 bg-secondary-color/20 rounded-full flex items-center justify-center text-accent-color group-hover:scale-110 transition-transform">✉️</span>
                                <span className="group-hover:text-accent-color transition-colors">support@sea2serve.com</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Policy */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center md:items-start text-center md:text-left"
                    >
                        <h4 className="text-xl font-bold mb-8 relative inline-block">
                            Delivery Policy
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent-color rounded-full"></span>
                        </h4>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                            <p className="text-gray-300 mb-4 flex items-start gap-3 text-sm">
                                <span className="text-xl">🚚</span>
                                <span>All orders are subject to availability. <strong>Strict Delivery within Mangalore City Limits Only.</strong></span>
                            </p>
                            <p className="text-gray-300 flex items-start gap-3 text-sm">
                                <span className="text-xl">💵</span>
                                <span>We currently accept <strong>Cash on Delivery (COD) Only</strong> to ensure your satisfaction.</span>
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm font-light">
                    <p>&copy; {new Date().getFullYear()} Sea2Serve. All rights reserved. <br className="md:hidden" /> Designed with ❤️ for Mangalore.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
