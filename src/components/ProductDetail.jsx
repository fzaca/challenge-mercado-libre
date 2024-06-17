import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`https://api.mercadolibre.com/items/${id}`);
  const { data: descriptionData } = useFetch(`https://api.mercadolibre.com/items/${id}/description`);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  if (loading) return <p className="loading loading-ring loading-lg"></p>;
  if (error) return <p>Error loading product</p>;

  const description = descriptionData ? descriptionData.plain_text : product.description;

  return (
    <div className="product-detail container mx-auto p-4">
      <div className="card w-full bg-base-300 shadow-xl">
        <figure>
          <img
            src={product.pictures && product.pictures.length > 0 ? product.pictures[currentImage].url : product.thumbnail}
            alt={product.title}
            className="object-cover w-full h-96 rounded"
          />
        </figure>
        <div className="carousel flex justify-center">
          {product.pictures && product.pictures.length > 0 ? (
            product.pictures.map((picture, index) => (
            <div
                key={index}
                className={`carousel-item cursor-pointer ${currentImage === index ? 'border-2 border-primary box-border' : 'box-border'}`}
                onClick={() => setCurrentImage(index)}
                style={{ width: '6rem', height: '6rem' }}
              >
                <img src={picture.url} alt={product.title} className="object-cover h-24 w-24" />
              </div>
            ))
          ) : (
            <div className="carousel-item">
              <img src={product.thumbnail} alt={product.title} className="object-cover h-24 w-24" />
            </div>
          )}
        </div>
        <div className="card-body">
          <h1 className="card-title text-2xl font-bold">{product.title}</h1>
          <p className="text-lg text-gray-700">${product.price.toFixed(2)}</p>
          <div className="flex items-center mb-4">
            <span className="mr-2">Cantidad:</span>
            <input 
              type="number" 
              min="1" 
              max={product.available_quantity} 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              className="input input-bordered w-24"
            />
          </div>
          <button 
            onClick={() => addToCart(product, quantity)} 
            className="btn btn-primary mb-4"
          >
            Añadir al carrito
          </button>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="stat-title">Condición</div>
              <div className="stat-value">{product.condition === 'new' ? 'Nuevo' : 'Usado'}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
              </div>
              <div className="stat-title">Disponibilidad</div>
              <div className="stat-value">{product.available_quantity}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
              </div>
              <div className="stat-title">Vendidos</div>
              <div className="stat-value">{product.sold_quantity}</div>
            </div>
          </div>


          <div className="stats shadow mt-4">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="stat-title">Ubicación</div>
              <div className="stat-value">{product.seller_address.city.name}, {product.seller_address.state.name}</div>
            </div>
        </div>

          <div className="stats shadow mt-4">
            {product.attributes.map((attribute) => (
              <div key={attribute.id} className="stat">
                <div className="stat-title">{attribute.name}</div>
                <div className="stat-value">{attribute.value_name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
