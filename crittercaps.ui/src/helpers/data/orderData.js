import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys;

const getOpenOrder = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/orders/shoppingCart/${userId}`)
    .then((result) => {
      const openOrder = result.data;
      resolve(openOrder);
    })
    .catch((error) => reject(error));
});

const getAllOrders = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/orders`)
    .then((result) => {
      const allOrders = result.data;
      resolve(allOrders);
    })
    .catch((error) => reject(error));
});

export default { getOpenOrder, getAllOrders };
