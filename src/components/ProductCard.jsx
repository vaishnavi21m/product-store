import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <div className="product-meta">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-rating">★ {product.rating}</span>
        </div>
      </div>
      <div className="card-actions">
        <Link to={`/product/${product.id}`} className="btn btn-secondary" style={{ flex: 1 }}>
          Details
        </Link>
        <button
          onClick={() => onAddToCart(product)}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
