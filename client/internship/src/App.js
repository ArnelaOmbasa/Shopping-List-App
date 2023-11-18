import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage'; 
import ShopperList from './components/ShopperList';
import ItemList from './components/ItemList';
import ShoppingList from './components/ShoppingList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shoppers" element={<ShopperList />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/shopping-list/:shopperId" element={<ShoppingList />} />

      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
