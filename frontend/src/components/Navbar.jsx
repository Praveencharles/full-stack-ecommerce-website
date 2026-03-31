import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User as UserIcon } from 'lucide-react';
import useStore from '../store';

function Navbar() {
  const { user, cart, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemsCount = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        EG<span>Shop</span>
      </Link>
      
      <div className="nav-links">
        <Link to="/" className="btn btn-secondary" style={{ border: 'none' }}>Home</Link>
        <Link to="/cart" className="btn btn-primary" style={{ position: 'relative' }}>
          <ShoppingCart size={18} />
          Cart
          {cartItemsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'var(--danger-color)',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {cartItemsCount}
            </span>
          )}
        </Link>
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border-color)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <UserIcon size={16} />
              {user.username || 'User'}
            </span>
            <button onClick={handleLogout} className="btn btn-secondary">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border-color)' }}>
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/signup" className="btn btn-primary" style={{ backgroundColor: '#fff', color: '#000' }}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
