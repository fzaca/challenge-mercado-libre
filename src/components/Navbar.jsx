import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import SearchBar from './SearchBar';
import ThemeController from './ThemeController';

const Navbar = ({ onSearch }) => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.length;
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="navbar bg-base-100 flex flex-col sm:flex-row sm:justify-between items-center">
      <div className="flex justify-between w-full sm:w-auto items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">About</Link></li>
          </ul>
        </div>
        <div className="sm:hidden flex items-center space-x-2">
          <ThemeController />
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">{totalItems}</span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-300 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">{totalItems} Items</span>
                <span className="text-info">Subtotal: ${totalPrice.toFixed(2)}</span>
                <div className="card-actions">
                  <Link to="/cart" className="btn btn-primary btn-block">View cart</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchBar onSearch={onSearch} className="navbar-center w-full sm:w-auto mt-2 sm:mt-0" />
      <div className="navbar-end hidden sm:flex items-center space-x-4 w-auto">
        <ThemeController />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item">{totalItems}</span>
            </div>
          </div>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-300 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">{totalItems} Items</span>
              <span className="text-info">Subtotal: ${totalPrice.toFixed(2)}</span>
              <div className="card-actions">
                <Link to="/cart" className="btn btn-primary btn-block">View cart</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
