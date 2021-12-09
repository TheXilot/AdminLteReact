import axios from 'axios';

const API_ENDPOINTS = {
    // ADD_USER: () => 'http://localhost:5000/auth/',
    GET_USER: (id) => `http://localhost:5000/auth/${id}`
};

async function getUser(id) {
    const r = await axios.get(API_ENDPOINTS.GET_USER(id));
    console.log('getUser axios : ', r);
    return r;
}
export {getUser};
