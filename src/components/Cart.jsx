import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateCartQuantity } = useContext(CartContext);

  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity >= 1) {
      updateCartQuantity(productId, quantity);
    }
  };

  return (
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
            <h3 className="text-lg font-bold">Total: ${total.toFixed(2)}</h3>
          </div>
          <div className="flex justify-between mt-4">
            <button onClick={clearCart} className="btn btn-outline">
              Empty Cart 
            </button>
            <Link to="/checkout" className="btn btn-primary">
              Buy
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
