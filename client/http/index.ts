import axios from 'axios';

export const URL = 'http://localhost:5050';

const $api = axios.create({
	withCredentials: true,
	baseURL: `${URL}/api`,
});

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export default $api;