const defaultNetwork: NetworkName = 'mainnet';
const allNetworks: NetworkName[] = ['localnet', 'devnet', 'testnet', 'mainnet'];

export type NetworkName = 'localnet' | 'devnet' | 'testnet' | 'mainnet';

export function getSupportedNetworks(showFirst?: NetworkName): NetworkName[]
{
    let supportedNetworks: NetworkName[] = [...allNetworks];

    // Remove 'localnet' from supportedNetworks if not on localhost
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocalhost) supportedNetworks.shift();

    // Make showFirst the first element in supportedNetworks
    if (showFirst) {
        supportedNetworks = supportedNetworks.filter(net => net !== showFirst);
        supportedNetworks.unshift(showFirst);
    }

    return supportedNetworks;
}

export function loadNetwork(): NetworkName
{
    const supportedNetworks = getSupportedNetworks();

    // Read 'network' URL parameter
    const params = new URLSearchParams(window.location.search);
    const networkFromUrl = params.get('network');
    // Delete query string
    window.history.replaceState({}, document.title, window.location.pathname);

    // Use network from query string, if valid
    if (isNetworkName(networkFromUrl) && supportedNetworks.includes(networkFromUrl)) {
        localStorage.setItem('polymedia.network', networkFromUrl);
        return networkFromUrl;
    }

    // Use network from local storage, if valid
    const networkFromLocal = localStorage.getItem('polymedia.network');
    if (isNetworkName(networkFromLocal) && supportedNetworks.includes(networkFromLocal)) {
        return networkFromLocal;
    }

    // Use default network
    localStorage.setItem('polymedia.network', defaultNetwork);
    return defaultNetwork;
}

export function switchNetwork(newNetwork: string)
{
    localStorage.setItem('polymedia.network', newNetwork);
    window.location.reload();
};

function isNetworkName(value: string | null): value is NetworkName {
    return value !== null && allNetworks.includes(value as NetworkName);
}
