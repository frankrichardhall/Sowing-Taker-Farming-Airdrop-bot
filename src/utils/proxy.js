function normalizeProxy(proxy) {
    if (!proxy) return null;
    if (!proxy.startsWith('http://') && !proxy.startsWith('https://')) {
        proxy = `http://${proxy}`;
    }
    return proxy;
}

module.exports = { normalizeProxy };
