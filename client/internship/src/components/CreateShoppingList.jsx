import React, { useState, useEffect } from 'react';
import '../styles/CreateShoppingList.css';
import Select from 'react-select';

const ShoppingListForm = () => {
  const [shoppers, setShoppers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedShopper, setSelectedShopper] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchShoppersAndItems = async () => {
      try {
        const shoppersResponse = await fetch('http://localhost:3001/shopper');
        const shoppersData = await shoppersResponse.json();

        const itemsResponse = await fetch('http://localhost:3001/item');
        const itemsData = await itemsResponse.json();

        setShoppers(shoppersData);
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchShoppersAndItems();
  }, []);

  const handleShopperChange = (selectedOption) => {
    console.log("Selected Shopper:", selectedOption);
    setSelectedShopper(selectedOption);
  };
  
  
  

  const handleItemChange = (selectedOptions) => {
    console.log("Selected Items:", selectedOptions);
    const selectedItemsIds = selectedOptions.map((option) => option.value);
  
    // Check for undefined items before processing
    if (selectedItemsIds.includes(undefined)) {
      setErrorMessage('Please select valid items.');
    } else {
      const itemInListsCount = selectedItemsIds.filter((itemId) => selectedItems.includes(itemId)).length;
  
      if (itemInListsCount >= 3) {
        setErrorMessage('This item is already in the lists of 3 shoppers.');
      } else {
        setErrorMessage('');
        setSelectedItems(selectedItemsIds);
      }
    }
  };
  
  
  
  

  const handleSubmit = async (event) => {
    console.log('Submitting with data:', { shopperId: selectedShopper, itemIds: selectedItems });

    event.preventDefault();
    

  
    if (!selectedShopper) {
      setErrorMessage('Please select a shopper.');
      return;
    }
  
    if (selectedItems.length === 0) {
      setErrorMessage('Please select at least one item.');
      return;
    }
  
    try {
      // Assuming you have an API endpoint to save the shopping list
      const response = await fetch('http://localhost:3001/shoppingList/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shopperId: selectedShopper,
          itemIds: selectedItems,
        }),
      });
  
      if (response.ok) {
        // Clear the form after successful submission
        setSelectedShopper('');
        setSelectedItems([]);
        setErrorMessage('');
        console.log('Shopping list saved successfully!');
      } else {
        // Handle error scenario
        console.error('Failed to save shopping list.');
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };
  
  return (
    <div className="shopping-list-form-container">
      <h2>Create Shopping List</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Shopper:</label>
          <select
  className="multi-select-dropdown"
  value={selectedShopper}
  onChange={(e) => handleShopperChange(e.target.value)}
>
  <option value="">Select a shopper</option>
  {shoppers.map((shopper) => (
    <option key={shopper.id} value={shopper.id}>
      {shopper.name}
    </option>
  ))}
</select>



        </div>
        <div>
          <label>Select Items:</label>
          <Select
  isMulti
  options={items.map((item) => ({ value: item.id, label: item.name }))}
  value={selectedItems.map((itemId) => ({ value: itemId, label: items.find((item) => item.id === itemId)?.name || '' }))}
  onChange={handleItemChange}
/>


        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">Save List</button>
      </form>
    </div>
  );
};

export default ShoppingListForm;
