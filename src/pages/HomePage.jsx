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

  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(
          <button
            key={i}
            className={`join-item btn ${page === i ? 'btn-active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (i === 2 || i === totalPages - 1) {
        pages.push(
          <button key={i} className="join-item btn btn-disabled">...</button>
        );
      }
    }
    return pages;
  };

  return (
    <div className="home-page">
      {loading && <span className="loading loading-dots loading-lg"></span>}
      {error && <p>Error fetching products</p>}
      {products && <ProductList products={products.results} />}
      <div className="join mt-4">
        {renderPagination()}
      </div>
    </div>
  );
};

export default HomePage;
