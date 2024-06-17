import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <div className="flex flex-col w-full">
      {products.map(product => (
        <React.Fragment key={product.id}>
          <Link to={`/product/${product.id}`} className="grid h-20 card bg-base-300 rounded-box place-items-center p-4 hover:bg-base-200 transition">
            <div className="flex items-center w-full">
              <ImageWithLoader src={product.thumbnail} alt={product.title} />
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{product.title}</span>
                <span className="text-sm text-gray-500">${product.price}</span>
              </div>
            </div>
          </Link>
          <div className="divider"></div>
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
    <div className="relative w-16 h-16 mr-4">
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
