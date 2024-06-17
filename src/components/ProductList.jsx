import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  return (
    <div className="flex flex-col w-full">
      {products.map(product => (
        <React.Fragment key={product.id}>
          <Link to={`/product/${product.id}`} className="card card-side bg-base-100 shadow-xl hover:bg-accent transition m-2 p-2 bg-primary">
            <ImageWithLoader src={product.thumbnail} alt={product.title} />
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold">{truncateTitle(product.title, 40)}</h2>
              <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

const ImageWithLoader = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
  };

  return (
    <div className="relative w-24 h-24">
      {loading && <span className="loading loading-ring loading-lg absolute inset-0 m-auto"></span>}
      <img 
        src={src} 
        alt={alt} 
        className={`mask mask-squircle w-full h-full object-cover ${loading ? 'hidden' : ''}`} 
        onLoad={handleLoad} 
        onError={handleError}
      />
    </div>
  );
};

export default ProductList;
