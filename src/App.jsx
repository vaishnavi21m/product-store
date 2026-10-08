import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import './index.css';

function App() {
  // Cart state stored in memory (resets on page refresh)
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <Router>
      <Navbar cartCount={cartItems.length} />
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductList onAddToCart={handleAddToCart} />} />
          <Route
            path="/product/:id"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
