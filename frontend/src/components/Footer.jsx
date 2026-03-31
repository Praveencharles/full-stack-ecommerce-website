import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Camera, Share2, Mail, MapPin, Phone } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer glass">
      <div className="footer-content">
        <div className="footer-section brand-section">
          <Link to="/" className="nav-brand" style={{ marginBottom: '1rem' }}>
            EG<span>Shop</span>
          </Link>
          <p className="footer-desc">
            Your destination for premium products. Upgrade your lifestyle with our meticulously curated collection.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Facebook"><Globe size={20} /></a>
            <a href="#" className="social-icon" aria-label="Twitter"><MessageCircle size={20} /></a>
            <a href="#" className="social-icon" aria-label="Instagram"><Camera size={20} /></a>
            <a href="#" className="social-icon" aria-label="LinkedIn"><Share2 size={20} /></a>
          </div>
        </div>

        <div className="footer-section links-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Register</Link></li>
          </ul>
        </div>

        <div className="footer-section categories-section">
          <h3 className="footer-heading">Categories</h3>
          <ul>
            <li><Link to="/">Electronics</Link></li>
            <li><Link to="/">Clothing</Link></li>
            <li><Link to="/">Home & Kitchen</Link></li>
            <li><Link to="/">New Arrivals</Link></li>
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="contact-info">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>123 Style Avenue, NY 10001, USA</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>support@charles.dev</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} charles.dev. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
