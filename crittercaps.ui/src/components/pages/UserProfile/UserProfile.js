import React from 'react';
import './UserProfile.scss';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {
  render() {
    return (
      <div className="UserProfile">
        <h1>User Profile</h1>
        <Link to="/userProfile/orders" className="btn btn-primary">Orders</Link>
        <Link to="/userProfile/shoppingCart" className="btn btn-danger" >Shopping Cart</Link>
      </div>
    );
  }
}

export default UserProfile;
