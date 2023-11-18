import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage'; 
import ShopperList from './components/ShopperList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shoppers" element={<ShopperList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
