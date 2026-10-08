import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cartItems, onRemoveFromCart }) {
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="state-message">
        <h2>Your Cart is Empty</h2>
        <p style={{ marginTop: '8px', marginBottom: '16px' }}>
          You have no items in your shopping cart.
        </p>
        <Link to="/" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Shopping Cart</h2>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={`${item.id}-${index}`}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <span>{item.name}</span>
                </div>
              </td>
              <td>{item.category}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>1</td>
              <td>
                <button
                  onClick={() => onRemoveFromCart(index)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <div>
          <strong>Total Items:</strong> {totalItems}
        </div>
        <div>
          <span className="cart-total">Total: ${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Cart;
