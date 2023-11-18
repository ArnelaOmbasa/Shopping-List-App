import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage'; 
import ShopperList from './components/ShopperList';
import ItemList from './components/ItemList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shoppers" element={<ShopperList />} />
        <Route path="/items" element={<ItemList />} />
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
