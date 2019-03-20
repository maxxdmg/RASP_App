import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://raspio.herokuapp.com'
});

export default instance;