import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartModal from './components/CartModal'; // Now behaves as Drawer
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Updated Mock Data to match requirements
    const mockProducts = [
        {
            _id: '1',
            name: 'Seer Fish/Anjal (Whole)',
            imageURL: 'https://i.pinimg.com/736x/f0/e5/18/f0e51881ff4ff58b64f5c16643bbeb67.jpg', // Whole Seer Fish
            freshness: 'Fresh Today',
            pricePerKg: 820,
            description: 'Premium whole Seer Fish on ice, sourced directly from the catch.',
            stock: 50
        },
        {
            _id: '2',
            name: 'Pomfret/Manji',
            imageURL: 'https://packmymeat.com/wp-content/uploads/2024/01/20240118_202139-min.png', // Silver Pomfret
            freshness: 'Fresh Today',
            pricePerKg: 680,
            description: 'Whole Silver Pomfret, cleaned and fresh from the market.',
            stock: 30
        },
        {
            _id: '3',
            name: 'Mackerel/Bangude',
            imageURL: 'https://imgs.search.brave.com/pN_mILvKFCRP-yfseuY8qsmceIpJq0eQ-w5v1tdzIao/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGljaW91cy5pbi9i/bG9nL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIxLzEwL2luZGlh/bi1tYWMtNzUweDc1/MC5qcGc', // Raw Mackerel
            freshness: 'Fresh Today',
            pricePerKg: 260,
            description: 'Fresh raw Mackerel, rich in Omega-3, straight from the net.',
            stock: 100
        },
        {
            _id: '4',
            name: 'Sardine/Mathi',
            imageURL: 'https://m.media-amazon.com/images/I/51dgW6Mp8ML._SX679_.jpg', // Fresh Sardines
            freshness: 'Fresh Today',
            pricePerKg: 180,
            description: 'Fresh raw Sardines, small and nutrient-packed.',
            stock: 80
        },
        {
            _id: '5',
            name: 'King Fish/Viswan',
            imageURL: 'https://media.istockphoto.com/id/1460324692/photo/raw-mackerel-scomber-fish-with-ingredients-for-cooking-in-baking-dish-white-background-top.jpg?s=612x612&w=0&k=20&c=ewslNiBjx_MOoAmMJDqeo29zCKfkEYogPCgwKvuvY28=', // Raw King Fish
            freshness: 'Fresh Today',
            pricePerKg: 900,
            description: 'Large raw King Fish, high quality and fresh.',
            stock: 25
        },
        {
            _id: '6',
            name: 'Tuna/Kere Meen',
            imageURL: 'https://imgs.search.brave.com/jbCmA0g0C_JJpcy54nK8yGvaNd9wEK-2efbPhfgopLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDUv/OTMwLzQ5OC9zbWFs/bC9mcmVzaC1maXNo/LXdpdGgtaGVyYnMt/c3BpY2VzLXJvc2Vt/YXJ5LWFuZC1sZW1v/bi1yYXctZmlzaC1z/ZWFmb29kLW9uLWJs/YWNrLXBsYXRlLWJh/Y2tncm91bmQtdG9w/LXZpZXctbG9uZ3Rh/aWwtdHVuYS1lYXN0/ZXJuLWxpdHRsZS10/dW5hLWZpc2gtZnJl/ZS1waG90by5KUEc', // Raw Tuna
            freshness: '1 Day Old',
            pricePerKg: 550,
            description: 'Fresh raw Tuna steak, deep red meat quality.',
            stock: 40
        }
    ];

    useEffect(() => {
        // Attempt to fetch from backend
        axios.get('http://localhost:5000/api/fish')
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setProducts(res.data);
                } else {
                    // If backend returns empty array (db empty), use mock
                    console.log('Backend returned empty, using mock data');
                    setProducts(mockProducts);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log('Backend not connected, using mock data');
                setProducts(mockProducts);
                setLoading(false);
            });
    }, []);

    const addToCart = (productWithQty) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === productWithQty._id);
            if (existingItem) {
                return prevCart.map(item =>
                    item._id === productWithQty._id
                        ? { ...item, quantity: item.quantity + productWithQty.quantity }
                        : item
                );
            }
            return [...prevCart, productWithQty];
        });
        setIsCartOpen(true);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.pricePerKg * item.quantity), 0);
    };

    const handleCheckout = (details) => {
        const orderData = {
            ...details,
            cartItems: cart,
            totalAmount: calculateTotal(),
            paymentMethod: 'Cash on Delivery'
        };

        axios.post('http://localhost:5000/api/orders', orderData)
            .then(res => {
                alert('Order placed successfully! Order ID: ' + res.data._id);
                setCart([]);
                setIsCartOpen(false);
            })
            .catch(err => {
                // Simulation success alert if backend fails
                alert('Order placed successfully! (Offline Mode)');
                console.log('Order Details:', orderData);
                setCart([]);
                setIsCartOpen(false);
            });
    };

    return (
        <div className="App min-h-screen flex flex-col">
            <Header
                cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
                onCartClick={() => setIsCartOpen(true)}
            />

            <main className="flex-grow">
                <Hero onOrderClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })} />
                <TrustSection />
                <ProductGrid
                    products={products}
                    onAddToCart={addToCart}
                    loading={loading}
                />
            </main>

            <Footer />

            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cart}
                totalAmount={calculateTotal()}
                onCheckout={handleCheckout}
            />
        </div>
    );
}

export default App;
