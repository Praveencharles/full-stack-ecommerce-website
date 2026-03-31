import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../store';
import useStore from '../store';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  
  const { addToCart, user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchProducts('');
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories/`);
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  };

  const fetchProducts = async (categorySlug) => {
    setLoading(true);
    try {
      let url = `${API_URL}/products/`;
      if (categorySlug) {
        url += `?category=${categorySlug}`;
      }
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (slug) => {
    setActiveCategory(slug);
    fetchProducts(slug);
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    await addToCart(productId, 1);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>Discover Premium Products</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Upgrade your lifestyle with our curated collection</p>
      </div>

      <div className="categories-filter">
        <button 
          className={`btn filter-btn ${activeCategory === '' ? 'active' : ''}`}
          onClick={() => handleFilter('')}
        >
          All
        </button>
        {categories.map(cat => (
          <button 
            key={cat.id} 
            className={`btn filter-btn ${activeCategory === cat.slug ? 'active' : ''}`}
            onClick={() => handleFilter(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading products...</div>
      ) : (
        <div className="grid-container">
          {products.map(product => (
            <div className="product-card glass" key={product.id}>
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="product-image" />
              ) : (
                <div className="product-image" style={{ backgroundColor: '#2a2f37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#8b949e' }}>No Image</span>
                </div>
              )}
              
              <div className="product-info">
                <span className="product-category">{product.category.name}</span>
                <h3 className="product-title">{product.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div className="product-price">${product.price}</div>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleAddToCart(product.id)}
                    style={{ padding: '0.5rem', borderRadius: '50%' }}
                    title="Add to Cart"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
              <h2>No products found</h2>
              <p>Try selecting a different category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
