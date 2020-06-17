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

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/products`)
    .then((result) => {
      const allProducts = result.data;
      resolve(allProducts);
    })
    .catch((errFromAllProducts) => reject(errFromAllProducts));
});

const getSingleProduct = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/products/product/{productId}`)
    .then((result) => {
      const singleProduct = result.data;
      resolve(singleProduct);
    })
    .catch((errFromSingleProduct) => reject(errFromSingleProduct));
});

export default { getNewestProducts, getAllProducts, getSingleProduct };
