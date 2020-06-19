import React from 'react';
import './UserProfile.scss';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {
  // id, firstName, lastName, accountDate, administrator

  render() {
    const { user } = this.props;

    return (
      <div className="UserProfile">
        <h1>User Profile</h1>
        <h2>{ user }</h2>
        <Link to="/userProfile/orders" className="btn btn-primary">Orders</Link>
        <Link to="/userProfile/shoppingCart" className="btn btn-danger" >Shopping Cart</Link>
      </div>
    );
  }
}

export default UserProfile;


// componentDidMount() {
//   productData.getNewestProducts()
//     .then((products) => this.setState({ products }))
//     .catch((error) => console.error(error, 'error from products'));
// }
