const blessed = require('blessed');

const screen = blessed.screen({
    smartCSR: true,
    title: 'Taker Farming Bot'
});

const logBox = blessed.log({
    top: 22,
    left: 0,
    width: '100%',
    height: 60,
    tags: true,
    scrollable: true,
    mouse: true,
    style: { fg: 'white', bg: 'black', border: { fg: 'white' } },
    border: { type: 'line' },
    scrollbar: { ch: ' ', style: { bg: 'blue' } }
});

const headerBox = blessed.box({
    top: 0,
    left: 0,
    width: '100%',
    height: 3,
    content: '{center}SOWING TAKER CHAIN FARMING AIRDROP BOT{/center}',
    tags: true,
    style: { fg: 'cyan', bg: 'black' }
});

const modeBox = blessed.box({
    top: 3,
    left: 0,
    width: '100%',
    height: 3,
    tags: true,
    style: { fg: 'yellow', bg: 'black', border: { fg: 'white' } },
    border: { type: 'line' }
});

const userInfoBox = blessed.box({
    top: 6,
    left: 0,
    width: '100%',
    height: 7,
    tags: true,
    style: { fg: 'white', bg: 'black', border: { fg: 'white' } },
    border: { type: 'line' }
});

const farmingStatusBox = blessed.box({
    top: 13,
    left: 0,
    width: '100%',
    height: 9,
    tags: true,
    style: { fg: 'white', bg: 'black', border: { fg: 'white' } },
    border: { type: 'line' }
});

const statusBox = blessed.box({
    bottom: 0,
    left: 0,
    width: '100%',
    height: 3,
    content: '{center}Press [q] to Quit | [r] to Refresh Tokens | [←] Prev Wallet | [→] Next Wallet{/center}',
    tags: true,
    style: { fg: 'white', bg: 'black', border: { fg: 'white' } },
    border: { type: 'line' }
});

screen.append(headerBox);
screen.append(modeBox);
screen.append(userInfoBox);
screen.append(farmingStatusBox);
screen.append(logBox);
screen.append(statusBox);

module.exports = {
    screen,
    logBox,
    headerBox,
    modeBox,
    userInfoBox,
    farmingStatusBox,
    statusBox
};
