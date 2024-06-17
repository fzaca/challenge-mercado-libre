import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cart.map(product => (
        <div key={product.id} className="cart-item">
          <img src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <button onClick={() => removeFromCart(product.id)}>Eliminar</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={clearCart}>Vaciar Carrito</button>
      <button>Finalizar Compra</button>
    </div>
  );
};

export default Cart;
