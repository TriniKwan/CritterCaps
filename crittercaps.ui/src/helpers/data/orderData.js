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

// const deleteLineItem = (lineItemtId) => axios.delete(`${baseUrl}/Order/deleteItem/&{lineItemtId}.json`); (don't forget to export the function)

export default { getOpenOrder };
