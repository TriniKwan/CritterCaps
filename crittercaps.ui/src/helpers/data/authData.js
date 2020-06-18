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

// this function will have to be modified to take in user information and add it to the database.
// API will also have to be made to take in a POST for adding users.
const registerUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((cred) => {
    const userInfo = { uid: cred.user.uid }; // get token from firebase
    cred.user.getIdToken()
    // save the token to the session storage
      .then((token) => sessionStorage.setItem('token', token))
    // save the user to the the api
      .then(() => axios.post(`${baseUrl}/users`, userInfo));
  });
};

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
  getUid, loginUser, logoutUser, registerUser, getUserByUid,
};
