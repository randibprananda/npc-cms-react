import axios from 'axios';

const token = window.localStorage.getItem('token-npc');

const Api = axios.create({
  baseURL: process.env.REACT_APP_MODE == "dev" ? process.env.REACT_APP_API_BASE_URL_STAGING : process.env.REACT_APP_API_BASE_URL_PROD,
  headers: { Authorization: 'Bearer ' + token },
});

export default Api;
