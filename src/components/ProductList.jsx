import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <img src={product.thumbnail} alt={product.title} />
          <h2>{product.title}</h2>
          <p>${product.price}</p>
          <Link to={`/product/${product.id}`}>Ver detalles</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
