import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://raspdb.firebaseio.com/'
});

export default instance;