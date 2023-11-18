// ItemList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/item') // Update the URL with your backend endpoint
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
    <div className="item-list-container">
      <h2>List of Items</h2>
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
