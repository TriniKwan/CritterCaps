import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys;

const getNewestProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/products/newest`)
    .then((result) => {
      const newestProducts = result.data;

      resolve(newestProducts);
    })
    .catch((error) => reject(error));
});

const getAllAvailableProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/products/available`)
    .then((result) => {
      const availableProducts = result.data;

      resolve(availableProducts);
    })
    .catch((error) => reject(error));
});

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/products`)
    .then((result) => {
      const allProducts = result.data;

      resolve(allProducts);
    })
    .catch((error) => reject(error));
});

const getSingleProduct = (productId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/products/product/${productId}`)
    .then((result) => {
      const singleProduct = result.data;

      resolve(singleProduct);
    })
    .catch((error) => reject(error));
});

const updateSingleProduct = (productId, newProductObj) => axios.put(`${baseUrl}/api/crittercaps/products/product/${productId}/edit`, newProductObj);

const addProduct = (productObj) => axios.post(`${baseUrl}/api/crittercaps/products`, productObj);

const getTotalInventoryByCategory = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/products/categoryTotals`)
    .then((result) => {
      const categoryTotals = result.data;

      resolve(categoryTotals);
    })
    .catch((error) => reject(error));
});

const getTotalSalesForEachProduct = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/products/sales/itemTotal`)
    .then((result) => {
      const productTotals = result.data;

      resolve(productTotals);
    })
    .catch((error) => reject(error));
});

export default {
  getNewestProducts,
  getAllAvailableProducts,
  getSingleProduct,
  updateSingleProduct,
  addProduct,
  getAllProducts,
  getTotalInventoryByCategory,
  getTotalSalesForEachProduct,
};
