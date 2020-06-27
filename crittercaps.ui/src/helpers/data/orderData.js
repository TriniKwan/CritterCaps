import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys;

const getOpenOrder = (userId) => new Promise((resolve) => {
  axios.get(`${baseUrl}/api/crittercaps/orders/shoppingCart/${userId}`)
    .then((result) => {
      const openOrder = result.data;
      resolve(openOrder);
    })
    .catch((error) => {
      createNewOrder(userId);
      return (error, 'No order existed, created new');
    });
});

const addItem = (orderId, productId) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/api/crittercaps/orders/addItem/orderId/${orderId}/productId/${productId}`)
    .then((result) => {
      const openOrder = result.data;
      resolve(openOrder);
    })
    .catch((error) => reject(error));
});

const createNewOrder = (userId) => axios.post(`${baseUrl}/api/crittercaps/orders/order/new/userId/${userId}`);

export default {
  getOpenOrder,
  addItem,
  createNewOrder,
};
