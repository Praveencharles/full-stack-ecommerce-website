import { useEffect } from 'react';
import useStore from '../store';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cart, cartTotal, loading, removeFromCart, user } = useStore();

  if (!user) {
    return (
      <div className="empty-state">
        <h2>Please Login to View Cart</h2>
        <Link to="/login" className="btn btn-primary" style={{ marginTop: '1rem' }}>Login</Link>
      </div>
    );
  }

  if (loading || cart === null) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading cart...</div>;
  }

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="empty-state">
          <ShoppingCart size={48} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-page">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                {item.product.image_url ? (
                  <img src={item.product.image_url} alt={item.product.name} />
                ) : (
                  <div style={{ width: '80px', height: '80px', backgroundColor: '#30363d', borderRadius: '4px' }}></div>
                )}
                
                <div className="cart-item-details">
                  <span className="product-category" style={{ display: 'block' }}>{item.product.category.name}</span>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{item.product.name}</h3>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    Qty: {item.quantity} x ${item.product.price}
                  </div>
                </div>
                
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    ${(item.quantity * item.product.price).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="btn btn-danger"
                    style={{ padding: '0.4rem', borderRadius: '50%' }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary glass">
            <h2>Order Summary</h2>
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                <span>Subtotal Items</span>
                <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="cart-total-row">
                <span>Total Amount</span>
                <span style={{ color: 'var(--accent-color)' }}>${cartTotal.toFixed(2)}</span>
              </div>
              
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Ensure ShoppingCart icon is imported
import { ShoppingCart } from 'lucide-react';

export default CartPage;
