import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', ...new Set(productsData.map((item) => item.category))];

  const filteredProducts = products.filter((product) => {
    return selectedCategory === 'All' || product.category === selectedCategory;
  });

  if (loading) {
    return <div className="state-message">Loading products...</div>;
  }

  return (
    <div>
      <div className="filter-bar">
        <label htmlFor="category-select" style={{ alignSelf: 'center', fontWeight: '500' }}>
          Filter by Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="state-message">
          <p>No products found in this category.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
