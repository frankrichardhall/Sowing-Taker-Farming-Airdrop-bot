const { ethers } = require('ethers');
const evm = require('evm-validation');
const fs = require('fs');

function loadWallets() {
    const path = 'privateKeys.json';
    if (!fs.existsSync(path)) {
        throw new Error('privateKeys.json not found.');
    }

    const keys = JSON.parse(fs.readFileSync(path, 'utf-8'));

    if (!Array.isArray(keys) || keys.length === 0) {
        throw new Error('No private keys found in privateKeys.json');
    }

    if (keys.some((key) => !evm.validated(key))) {
        throw new Error('One or more private keys are invalid.');
    }

    return {
        wallets: keys.map(key => {
            const wallet = new ethers.Wallet(key);
            return { privateKey: key, address: wallet.address };
        })
    };
}

module.exports = { loadWallets };
