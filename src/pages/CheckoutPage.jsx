import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CheckoutPage = () => {
  const { clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    alert('Compra realizada con éxito');
    clearCart();
  };

  return (
    <div className="checkout-page">
      <h2>Finalizar Compra</h2>
      <button onClick={handleCheckout}>Confirmar Compra</button>
    </div>
  );
};

export default CheckoutPage;
