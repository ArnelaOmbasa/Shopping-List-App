// ShopperList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ShopperList.css';
import { Link } from 'react-router-dom';

const ShopperList = () => {
  const [shoppers, setShoppers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/shopper')
      .then(response => {
        setShoppers(response.data);
      })
      .catch(error => {
        console.error('Error fetching shoppers:', error);
      });
  }, []);

  return (
    <div className="shoppper-list-container">
      <h2>List of Shoppers</h2>
      {shoppers.length === 0 ? (
        <p>No shoppers available.</p>
      ) : (
        <ul className="shoppper-list">
          {shoppers.map((shopper) => (
            <li key={shopper._id}>
              <Link to={`/shopping-list/${shopper._id}`}>
                {shopper.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopperList;
