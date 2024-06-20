import axios from "axios";

const catFactInstance = axios.create({
    baseURL: 'https://catfact.ninja',
    timeout: 1000,
});


const randomUserInstance = axios.create({
    baseURL: 'https://randomuser.me/api',
    timeout: 1000,
});

export {catFactInstance, randomUserInstance};