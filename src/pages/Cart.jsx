import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cartItems, onRemoveFromCart, onUpdateQuantity }) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <span>{item.name}</span>
                </div>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="btn btn-secondary"
                    style={{ padding: '2px 8px', fontSize: '1rem', lineHeight: '1.2' }}
                    title="Decrease quantity"
                  >
                    -
                  </button>
                  <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="btn btn-secondary"
                    style={{ padding: '2px 8px', fontSize: '1rem', lineHeight: '1.2' }}
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  onClick={() => onRemoveFromCart(item.id)}
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
