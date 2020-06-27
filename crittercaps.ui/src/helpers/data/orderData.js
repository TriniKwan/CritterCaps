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
      resolve(individualSalesTotal);
    })
    .catch((error) => reject(error));
});

const getIndividualSalesForMonth = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/orders/${userId}/dashboard/total/monthly`)
    .then((result) => {
      const individualMonthlySalesTotal = result.data;
      resolve(individualMonthlySalesTotal);
    })
    .catch((error) => reject(error));
});

export default { getOpenOrder, getIndividualSales, getIndividualSalesForMonth };
