const axios = require('axios');
const { HEADERS } = require('../config/constants');

async function apiRequest(url, method = 'GET', data = null, authToken = null) {
    const config = {
        method,
        url,
        headers: { ...HEADERS },
    };
    if (data) config.data = data;
    if (authToken) config.headers['authorization'] = `Bearer ${authToken}`;
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}

module.exports = { apiRequest };
