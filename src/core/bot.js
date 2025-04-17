const { screen, modeBox, userInfoBox, farmingStatusBox, logBox } = require('../ui/interface');
const { logMessage } = require('../utils/logger');
const { loadWallets } = require('../wallet/manager');
const { generateNonce, login } = require('../services/api');
const { performSignIn, updateUserInfo, updateFarmingStatus } = require('../services/farming');

async function runBot() {
    const { wallets } = loadWallets();
    const tokens = {};
    let currentWalletIndex = 0;

    logMessage(logBox, `Starting Taker Auto-Farming Bot for ${wallets.length} wallet(s)`, 'info');

    for (const wallet of wallets) {
        try {
            logMessage(logBox, `Using proxy: None`, 'info', wallet.address);
            const nonce = await generateNonce(wallet);
            const token = await login(wallet, nonce);
            tokens[wallet.address] = token;
            logMessage(logBox, 'Login successful! Token received.', 'success', wallet.address);
        } catch (error) {
            logMessage(logBox, 'Login failed: ' + error.message, 'error', wallet.address);
        }
    }

    if (Object.keys(tokens).length === 0) {
        logMessage(logBox, 'No wallets authenticated. Exiting...', 'error');
        return;
    }

    const firstWallet = wallets[currentWalletIndex];
    await updateUserInfo(firstWallet, tokens[firstWallet.address], logBox);
    await updateFarmingStatus(firstWallet, tokens[firstWallet.address], logBox);

    screen.key(['q', 'C-c'], () => {
        logMessage(logBox, 'Shutting down bot...', 'warning');
        process.exit(0);
    });

    screen.render();
}

module.exports = { runBot };
