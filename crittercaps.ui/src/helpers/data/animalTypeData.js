import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys;

const getAllAnimalTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/animals`)
    .then((result) => {
      const allAnimalTypes = result.data;
      resolve(allAnimalTypes);
    })
    .catch((errFromGetAllAnimalTypes) => reject(errFromGetAllAnimalTypes));
});

export default { getAllAnimalTypes };
