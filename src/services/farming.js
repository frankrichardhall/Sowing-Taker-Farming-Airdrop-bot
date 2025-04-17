const { ethers } = require('ethers');
const { API_BASE_URL, CONTRACT_ADDRESS, CONTRACT_ABI } = require('../config/constants');
const { apiRequest } = require('./apiRequest');
const { userInfoBox, farmingStatusBox, screen } = require('../ui/interface');

async function performSignIn(wallet, token, logBox, logMessage) {
    const response = await apiRequest(
        `${API_BASE_URL}/task/signIn?status=true`,
        'GET',
        null,
        token
    );
    if (response.code === 200) {
        logMessage(logBox, 'Sign-in successful! Started farming.', 'success', wallet.address);
        return true;
    }
    logMessage(logBox, 'Sign-in failed: ' + response.message, 'error', wallet.address);
    return false;
}

async function getUserInfo(wallet, token) {
    const response = await apiRequest(
        `${API_BASE_URL}/user/info`,
        'GET',
        null,
        token
    );
    if (response.code === 200) {
        return response.result;
    }
    throw new Error('Failed to fetch user info: ' + response.message);
}

async function updateUserInfo(wallet, token, logBox) {
    const { logMessage } = require('../utils/logger');
    try {
        const userInfo = await getUserInfo(wallet, token);
        userInfoBox.setContent(
            `{yellow-fg}Wallet Address:{/yellow-fg} {green-fg}${userInfo.walletAddress}{/green-fg}\n` +
            `{yellow-fg}Taker Points:{/yellow-fg} {green-fg}${userInfo.takerPoints}{/green-fg}`
        );
    } catch (err) {
        userInfoBox.setContent(`{red-fg}Error loading user info{/red-fg}`);
        logMessage(logBox, err.message, 'error', wallet.address);
    }
    screen.render();
}

async function updateFarmingStatus(wallet, token, logBox) {
    const { logMessage } = require('../utils/logger');
    try {
        const info = await getUserInfo(wallet, token);
        farmingStatusBox.setContent(
            `{yellow-fg}Wallet:{/yellow-fg} ${wallet.address}\n` +
            `{yellow-fg}Next Time:{/yellow-fg} ${new Date(info.nextTimestamp).toLocaleString()}`
        );
    } catch (err) {
        farmingStatusBox.setContent(`{red-fg}Error updating status{/red-fg}`);
        logMessage(logBox, err.message, 'error', wallet.address);
    }
    screen.render();
}

function startCountdown(wallet, token, nextTimestamp) {
    // Optional: implement countdown
}

async function claimReward(wallet, token, logBox) {
    const { logMessage } = require('../utils/logger');
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://rpc-mainnet.taker.xyz', { chainId: 1125 });
        const signer = new ethers.Wallet(wallet.privateKey, provider);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const tx = await contract.active();
        logMessage(logBox, `Claimed reward with tx: ${tx.hash}`, 'success', wallet.address);
        return true;
    } catch (err) {
        logMessage(logBox, `Claim error: ${err.message}`, 'error', wallet.address);
        return false;
    }
}

module.exports = {
    performSignIn,
    getUserInfo,
    updateUserInfo,
    updateFarmingStatus,
    startCountdown,
    claimReward
};
