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

const deleteLineItem = (orderId, productId) => axios.delete(`${baseUrl}/api/critterCaps/orders/removeItem/orderId/${orderId}/productId/${productId}`);

export default { getOpenOrder, deleteLineItem };
