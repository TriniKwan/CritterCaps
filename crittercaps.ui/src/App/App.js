import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import './App.scss';

import firebaseConnection from '../helpers/data/connection';
import Home from '../components/pages/Home/Home';
import Products from '../components/pages/Products/Products';
import UserProfile from '../components/pages/UserProfile/UserProfile';
import Orders from '../components/pages/Orders/Orders';
import ShoppingCart from '../components/pages/ShoppingCart/ShoppingCart';
import SingleProduct from '../components/pages/SingleProduct/SingleProduct';
import NavBar from '../components/shared/Navbar/Navbar';
import Dashboard from '../components/pages/Dashboard/Dashboard';
import EditProduct from '../components/pages/EditProduct/EditProduct';

import authData from '../helpers/data/authData';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
    administrator: false,
    uid: '',
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (sessionStorage.getItem('token')) {
          this.setState({ authed: true });
          this.setState({ uid: user.uid });
        }
      } else {
        this.setState({ authed: false });
        this.setState({ uid: '' });
      }
    });
    this.getUserData();
  }

  getUserData = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (sessionStorage.getItem('token')) {
          const userUid = authData.getUid();
          authData.getUserByUid(userUid)
            .then((userData) => this.setState({ administrator: userData.administrator }))
            .catch((error) => console.error(error, 'error from get user Data'));
        } else {
          this.setState({ administrator: false });
        }
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
    this.getUserData();
  }

  render() {
    const { authed, administrator, uid } = this.state;

    return (
      <div className="App">
        <Router>
          <NavBar authed={authed} administrator={administrator} />
          <Switch>
            <Route path="/" exact component={Home} authed={authed} />
            <Route path="/products" exact component={Products} authed={authed} administrator={administrator} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} authed={authed} administrator={administrator} ></PrivateRoute>
            <PrivateRoute path="/userProfile" exact component={UserProfile} authed={authed} />
            <PrivateRoute path="/userProfile/orders" exact component={Orders} authed={authed} />
            <Route path="/userProfile/shoppingCart" render={(props) => (<ShoppingCart {...props} authed={authed} uid={uid} />)} />
            <PrivateRoute path="products/new" exact />
            <Route path="/products/:productId" exact component={SingleProduct} authed={authed} />
            <PrivateRoute path="/products/product/:productId/edit" exact component={EditProduct} authed={authed} administrator={administrator} ></PrivateRoute>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
