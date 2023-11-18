import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ShoppingList.css';

const ShoppingList = () => {
  const { shopperId } = useParams();
  const [shoppingList, setShoppingList] = useState({ items: [], shopper: {} });

  useEffect(() => {
    // Fetch the shopping list with the shopper's information
    const fetchData = async () => {
      try {
        const shoppingListResponse = await axios.get(`http://localhost:3001/shoppingList/${shopperId}`);
        setShoppingList(shoppingListResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [shopperId]);

  return (
    <div className="shopping-list-container">
      <h2>Shopping List for Shopper {shoppingList.shopper.name}</h2>
      {Array.isArray(shoppingList.items) && shoppingList.items.length > 0 ? (
        <ul className="shopping-list">
          {shoppingList.items.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No items in the shopping list.</p>
      )}
    </div>
  );
};

export default ShoppingList;
