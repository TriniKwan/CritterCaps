import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getAllProductTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/productTypes`)
    .then((result) => {
      const allProductTypes = result.data;
      resolve(allProductTypes);
    })
    .catch((errFromGetAllProductTypes) => reject(errFromGetAllProductTypes));
});

export default { getAllProductTypes };
