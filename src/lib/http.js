import axios from 'axios';

const inProduction = process.env.NODE_ENV === 'production';
const DEVELOPMENT_API_PORT = 3030;
let AUTH_TOKEN = '';

const http = axios.create({
    baseURL: inProduction ? 'https://mental-health-database.herokuapp.com' : `http://localhost:${DEVELOPMENT_API_PORT}`,
    headers: {
        token: AUTH_TOKEN
    }
});

function setToken(token) {
    AUTH_TOKEN = token;
}

function clearToken() {
    AUTH_TOKEN = '';
}

export {
    setToken,
    clearToken,
    http
};