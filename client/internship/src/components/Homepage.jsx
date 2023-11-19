import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Homepage.css';
import { useParams } from 'react-router-dom';





const HomePage = () => {
  const { shopperId } = useParams();
  console.log(shopperId);

  return (
    <div className="homepage-container">
      <h1>Welcome to Shopping Time!</h1>
      <p>
        Discover a seamless shopping experience with Shopping Time. Browse our list of shoppers,
        explore a variety of items, and create personalized shopping lists.
      </p>
     
<div className="get-started-section">
  <h2>Get Started</h2>
  <ul>
    <li>
      
    <Link to="/create-list">Create Shopping List</Link>
    </li>
    
  </ul>
</div>
<div className="explore-section">
  <h2>Explore</h2>
  <ul>
    <li>
      <Link to="/items">Browse Items</Link>
    </li>
    <li>
      <Link to="/shoppers">Explore Shoppers</Link>
    </li>
  </ul>
</div>

    </div>
  );
};

export default HomePage;
