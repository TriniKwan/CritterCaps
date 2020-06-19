import firebase from 'firebase';
import 'firebase/auth';
import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys;

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token'); if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  } return request;
}, (err) => Promise.reject(err));

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/users/uid/${uid}`)
    .then((result) => {
      const user = result.data;

      resolve(user);
    })
    .catch((error) => reject(error));
});

const getUserByEmail = (email) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/users/email/${email}`)
    .then((result) => {
      const user = result.data;
      resolve(user);
    })
    .catch((error) => reject(error));
});

const registerUser = (newUserInfo) => axios.post(`${baseUrl}/api/crittercaps/users/new`, newUserInfo);

const loginUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((cred) => {
  // get token from firebase
    cred.user.getIdToken()
    // save the token to the session storage
      .then((token) => sessionStorage.setItem('token', token));
  });
};

const logoutUser = () => firebase.auth().signOut();

const getUid = () => firebase.auth().currentUser.uid;

export default {
  getUid,
  loginUser,
  logoutUser,
  registerUser,
  getUserByUid,
  getUserByEmail,
};
