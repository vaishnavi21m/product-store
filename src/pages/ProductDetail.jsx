import React from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="state-message">
        <h3>Product Not Found</h3>
        <p>The product you are looking for does not exist.</p>
        <br />
        <Link to="/" className="btn btn-secondary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="btn btn-secondary" style={{ marginBottom: '16px' }}>
        &larr; Back to Products
      </Link>

      <div className="detail-container">
        <img src={product.image} alt={product.name} className="detail-image" />
        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h2>{product.name}</h2>
          <div className="product-rating">Rating: ★ {product.rating}</div>
          <div className="detail-price">${product.price.toFixed(2)}</div>
          <p className="detail-desc">{product.description}</p>

          <button
            onClick={() => onAddToCart(product)}
            className="btn btn-primary"
            style={{ width: '180px', marginTop: '12px' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
