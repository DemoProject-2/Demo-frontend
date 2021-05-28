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

function setAuthToken(token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
function clearAuthToken(token) {
    http.defaults.headers.common["Authorization"] = "";
}

export {
    setAuthToken,
    clearAuthToken,
    http
};