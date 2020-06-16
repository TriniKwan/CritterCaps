import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <h1>Home</h1>
        <Link to="/products" className="btn btn-primary">Products</Link>
        <Link to="/userProfile" className="btn btn-secondary">User Profile</Link>
      </div>
    );
  }
}

export default Home;
