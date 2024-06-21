import axios from 'axios';

const catFactInstance = axios.create({
  baseURL: 'https://catfact.ninja',
});

const randomUserInstance = axios.create({
  baseURL: 'https://randomuser.me/api',
});

export { catFactInstance, randomUserInstance };
