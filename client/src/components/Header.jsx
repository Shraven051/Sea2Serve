import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Anchor } from 'lucide-react';

const Header = ({ cartCount, onCartClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { title: 'Home', href: '#home' },
        { title: 'Shop', href: '#shop' },
        { title: 'About', href: '#about' },
        { title: 'Contact', href: '#contact' },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-md py-4'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    className="flex items-center gap-2 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                >
                    <Anchor className="text-secondary-color" size={32} />
                    <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-primary-color' : 'text-primary-color'}`}>
                        Sea2Serve
                    </span>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-10 items-center">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.title}
                            href={link.href}
                            className={`font-medium relative text-lg transition-colors ${isScrolled ? 'text-gray-700 hover:text-secondary-color' : 'text-gray-800 hover:text-secondary-color'
                                }`}
                            whileHover={{ y: -2 }}
                        >
                            {link.title}
                            <motion.span
                                className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-secondary-color origin-center"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                    ))}
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-6">
                    <motion.button
                        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={onCartClick}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Cart"
                    >
                        <ShoppingCart className="text-primary-color" size={26} />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-1 -right-1 bg-accent-color text-primary-color text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-white"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-primary-color hover:bg-gray-100 rounded-lg"
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white shadow-xl border-t border-gray-100 overflow-hidden"
                    >
                        <nav className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={link.href}
                                    className="block py-2 text-lg font-medium text-gray-800 hover:text-secondary-color transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.title}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
