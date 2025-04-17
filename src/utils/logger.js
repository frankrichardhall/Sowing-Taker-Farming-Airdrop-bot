function logMessage(logBox, message, type = 'info', walletAddress = '') {
    if (!logBox || typeof logBox.log !== 'function') {
        console.error('[Logger Error] logBox is invalid or not initialized');
        return;
    }

    const timestamp = new Date().toLocaleTimeString();
    const prefix = walletAddress ? `[${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}] ` : '';
    let coloredMessage;
    switch (type) {
        case 'error':
            coloredMessage = `{red-fg}[${timestamp}] ${prefix}${message}{/red-fg}`;
            break;
        case 'success':
            coloredMessage = `{green-fg}[${timestamp}] ${prefix}${message}{/green-fg}`;
            break;
        case 'warning':
            coloredMessage = `{yellow-fg}[${timestamp}] ${prefix}${message}{/yellow-fg}`;
            break;
        default:
            coloredMessage = `{white-fg}[${timestamp}] ${prefix}${message}{/white-fg}`;
    }

    logBox.log(coloredMessage);
}

module.exports = { logMessage };
