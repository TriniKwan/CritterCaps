import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys;

const getOpenOrder = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/shoppingCart/${userId}`)
    .then((result) => {
      const openOrder = result.data;
      resolve(openOrder);
    })
    .catch((error) => reject(error, 'error from getOpenOrder'));
});

const addItem = (orderId, productId) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/api/crittercaps/orders/addItem/orderId/${orderId}/productId/${productId}`)
    .then((result) => {
      const openOrder = result.data;
      resolve(openOrder);
    })
    .catch((error) => reject(error));
});

const createNewOrder = (userId) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/api/crittercaps/orders/order/new/userId/${userId}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const getSales = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/orders/dashboard/total`)
    .then((result) => {
      const individualSalesTotal = result.data;
      resolve(individualSalesTotal);
    })
    .catch((error) => reject(error));
});

const getSalesForMonth = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/orders/dashboard/total/monthly`)
    .then((result) => {
      const monthlySalesTotal = result.data;
      resolve(monthlySalesTotal);
    })
    .catch((error) => reject(error));
});

const deleteLineItem = (orderId, productId) => axios.delete(`${baseUrl}/api/critterCaps/orders/removeItem/orderId/${orderId}/productId/${productId}`);

const getAllOrders = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/critterCaps/orders`)
    .then((result) => {
      const allProducts = result.data;

      resolve(allProducts);
    })
    .catch((error) => reject(error));
});

export default {
  getOpenOrder,
  getSales,
  getSalesForMonth,
  addItem,
  createNewOrder,
  deleteLineItem,
  getAllOrders,
};
