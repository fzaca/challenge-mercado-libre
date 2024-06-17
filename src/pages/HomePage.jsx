import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import useFetch from '../hooks/useFetch';

const HomePage = ({ searchQuery }) => {
  const [query, setQuery] = useState(searchQuery || '');
  const { data: products, loading, error } = useFetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div className="home-page">
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching products</p>}
      {products && <ProductList products={products.results} />}
    </div>
  );
};

export default HomePage;
