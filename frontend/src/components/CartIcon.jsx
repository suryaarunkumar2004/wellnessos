import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  const itemCount = cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  return (
    <button 
      onClick={() => navigate('/cart')}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="Open cart"
    >
      <FaShoppingCart className="text-xl text-gray-700" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
