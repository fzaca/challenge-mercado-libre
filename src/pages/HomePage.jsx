import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import useFetch from '../hooks/useFetch';

const HomePage = ({ searchQuery }) => {
  const [query, setQuery] = useState(searchQuery || '');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;
  const { data: products, loading, error } = useFetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&offset=${(page - 1) * itemsPerPage}&limit=${itemsPerPage}`);

  useEffect(() => {
    if (products && products.paging) {
      setTotalPages(Math.ceil(products.paging.total / itemsPerPage));
    }
  }, [products]);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="home-page">
      {loading && <span className="loading loading-dots loading-lg"></span>}
      {error && <p>Error fetching products</p>}
      {products && <ProductList products={products.results} />}
      <div className="join mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <input
            key={pageNumber}
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label={pageNumber}
            checked={page === pageNumber}
            onChange={() => handlePageChange(pageNumber)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
