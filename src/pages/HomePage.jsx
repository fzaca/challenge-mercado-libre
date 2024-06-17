import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import useFetch from '../hooks/useFetch';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const { data: products, loading, error } = useFetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);

  return (
    <div className="home-page">
      <SearchBar onSearch={setQuery} />
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching products</p>}
      {products && <ProductList products={products.results} />}
    </div>
  );
};

export default HomePage;
