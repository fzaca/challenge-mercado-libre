import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateCartQuantity } = useContext(CartContext);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity >= 1) {
      updateCartQuantity(productId, quantity);
    }
  };

  const handleBuy = () => {
    setModalOpen(true);
    clearCart();
  };

  const closeModal = () => {
    setModalOpen(false);
    navigate('/');
  };

  return (
    <div className="relative">
      <div className="card w-full bg-base-300 shadow-xl glass p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            {cart.map(product => (
              <div key={product.id} className="cart-item flex items-center mb-4">
                <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover rounded mr-4 mask mask-squircle" />
                <div className="flex-1">
                  <Link to={`/product/${product.id}`} className="text-lg font-semibold hover:underline">
                    {product.title}
                  </Link>
                  <p className="text-gray-700">${(product.price * product.quantity).toFixed(2)}</p>
                  <div className="flex items-center">
                    <span className="mr-2">Qty:</span>
                    <input 
                      type="number" 
                      min="1" 
                      value={product.quantity} 
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                      className="input input-bordered w-16"
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="btn btn-outline btn-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4">
              <div className="text-primary-content">
                <div className="stat">
                <div className="stat-title">Total</div>
                  <div className="stat-value text-primary">${total.toFixed(2)}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={clearCart} className="btn btn-outline">
                Empty Cart 
              </button>
              <button onClick={handleBuy} className="btn btn-primary">
                Buy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="modal-box bg-accent">
            <h3 className="font-bold text-lg">Successful purchase!</h3>
            <p className="py-4">Thank you for your purchase. Click the button below to return to the homepage.</p>
            <div className="modal-action">
              <button className="btn btn-secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
