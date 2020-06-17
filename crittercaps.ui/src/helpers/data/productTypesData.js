import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys;

const getAllProductTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/productTypes`)
    .then((result) => {
      const allProductTypes = result.data;
      resolve(allProductTypes);
    })
    .catch((errFromGetAllProductTypes) => reject(errFromGetAllProductTypes));
});

const getSingleProductTypeWithProducts = (productType) => axios.get(`${baseUrl}/api/crittercaps/productTypes/productType/${productType}/products`);

const getSingleProductType = (productType) => axios.get(`${baseUrl}/api/crittercaps/productTypes/productType/${productType}`);

export default { getAllProductTypes, getSingleProductTypeWithProducts, getSingleProductType };
