const { ethers } = require('ethers');
const { apiRequest } = require('./apiRequest');
const { API_BASE_URL } = require('../config/constants');

async function generateNonce(wallet) {
    const response = await apiRequest(
        `${API_BASE_URL}/wallet/generateNonce`,
        'POST',
        { walletAddress: ethers.utils.getAddress(wallet.address) }
    );
    if (response.code === 200) {
        if (response.result?.nonce) {
            return response.result.nonce;
        } else if (typeof response.result === 'string') {
            const match = response.result.match(/Nonce: (.*)$/m);
            if (match && match[1]) return match[1];
        }
    }
    throw new Error('Failed to generate nonce');
}

async function login(wallet, nonce) {
    const address = ethers.utils.getAddress(wallet.address);
    const message = `Taker quest needs to verify your identity to prevent unauthorized access. Please confirm your sign-in details below:\n\naddress: ${address}\n\nNonce: ${nonce}`;
    const signature = await new ethers.Wallet(wallet.privateKey).signMessage(message);

    const response = await apiRequest(
        `${API_BASE_URL}/wallet/login`,
        'POST',
        { address, signature, message }
    );

    if (response.code === 200) {
        return response.result.token;
    }

    throw new Error('Login failed: ' + response.message);
}

module.exports = { generateNonce, login };
