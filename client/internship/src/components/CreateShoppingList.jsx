import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateShoppingList = () => {
  // State for storing the list of items from the server
  const [items, setItems] = useState([]);
  // State for storing selected items for the shopping list
  const [selectedItems, setSelectedItems] = useState([]);
  // State for storing the shopper's name
  const [shopperName, setShopperName] = useState('');

  // Fetch the list of items from the server when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3001/item')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  // Handle selecting or deselecting an item
  const handleItemSelect = (itemId) => {
    if (!selectedItems.includes(itemId)) {
      // Select the item if not already selected
      setSelectedItems([...selectedItems, itemId]);
    } else {
      // Deselect the item if already selected
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    }
  };

  // Handle creating the shopping list
  const handleCreateList = async () => {
    try {
      // Perform logic to create a shopping list on the server-side
      // Send a request to the server with selectedItems and shopperName
      const createdList = await axios.post('http://localhost:3000/shoppingList/create', {
        shopperName,
        items: selectedItems,
      });

      // Log the created shopping list to the console (for demonstration purposes)
      console.log('Shopping list created:', createdList.data);
    } catch (error) {
      console.error('Error creating shopping list:', error);
    }
  };

  return (
    <div>
      <h2>Create Shopping List</h2>
      {/* Input for shopper's name */}
      <label htmlFor="shopperName">Shopper Name:</label>
      <input
        type="text"
        id="shopperName"
        value={shopperName}
        onChange={(e) => setShopperName(e.target.value)}
      />

      {/* List of items for selection */}
      <p>Select items for your shopping list:</p>
      <ul>
        {items.map((item) => (
          <li
            key={item._id}
            onClick={() => handleItemSelect(item._id)}
            style={{ cursor: 'pointer', textDecoration: selectedItems.includes(item._id) ? 'line-through' : 'none' }}
          >
            {item.name}
          </li>
        ))}
      </ul>

      {/* Button to trigger the creation of the shopping list */}
      <button onClick={handleCreateList}>Create Shopping List</button>
    </div>
  );
};

export default CreateShoppingList;
