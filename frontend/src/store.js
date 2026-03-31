import { create } from 'zustand';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const API_URL = 'http://localhost:8000/api';

const useStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('access_token') || null,
  cart: null,
  cartTotal: 0,
  loading: false,

  setToken: (token) => {
    localStorage.setItem('access_token', token);
    try {
      const decodedUser = jwtDecode(token);
      set({ token, user: decodedUser });
      get().fetchCart(); // Fetch cart immediately after login
    } catch {
      set({ token: null, user: null });
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ user: null, token: null, cart: null, cartTotal: 0 });
  },

  initAuth: () => {
    const token = get().token;
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        if (decodedUser.exp * 1000 < Date.now()) {
          // Token expired
          get().logout();
        } else {
          set({ user: decodedUser });
          get().fetchCart();
        }
      } catch {
        get().logout();
      }
    }
  },

  getAuthHeaders: () => {
    const token = get().token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  fetchCart: async () => {
    try {
      const res = await axios.get(`${API_URL}/cart/`, { headers: get().getAuthHeaders() });
      set({ cart: res.data.items, cartTotal: res.data.total_amount });
    } catch (err) {
      console.error('Error fetching cart', err);
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const res = await axios.post(
        `${API_URL}/cart/add/`,
        { product_id: productId, quantity },
        { headers: get().getAuthHeaders() }
      );
      set({ cart: res.data.items, cartTotal: res.data.total_amount });
      return true;
    } catch (err) {
      console.error('Error adding to cart', err);
      return false;
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const res = await axios.delete(`${API_URL}/cart/remove/${itemId}/`, {
        headers: get().getAuthHeaders(),
      });
      set({ cart: res.data.items, cartTotal: res.data.total_amount });
    } catch (err) {
      console.error('Error removing from cart', err);
    }
  },
}));

export default useStore;
