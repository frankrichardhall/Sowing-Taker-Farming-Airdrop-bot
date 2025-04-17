const API_BASE_URL = 'https://sowing-api.taker.xyz';
const CONTRACT_ADDRESS = '0xF929AB815E8BfB84Cdab8d1bb53F22eB1e455378';
const CONTRACT_ABI = [
    {
        "constant": false,
        "inputs": [],
        "name": "active",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const HEADERS = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'sec-ch-ua': '"Microsoft Edge";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'Referer': 'https://sowing.taker.xyz/',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
};

module.exports = { API_BASE_URL, CONTRACT_ADDRESS, CONTRACT_ABI, HEADERS };
