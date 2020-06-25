import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys;

const getOpenOrder = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/shoppingCart/${userId}`)
    .then((result) => {
      const openOrder = result.data;
      resolve(openOrder);
    })
    .catch((error) => reject(error));
});

const getIndividualSales = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/orders/${userId}/dashboard/total`)
    .then((result) => {
      const individualSalesTotal = result.data;
      console.log(individualSalesTotal);
      resolve(individualSalesTotal);
    })
    .catch((error) => reject(error));
});

export default { getOpenOrder, getIndividualSales };
