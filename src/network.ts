import { NetworkName } from '@polymedia/suits';

const defaultNetwork: NetworkName = 'mainnet';
const allNetworks: NetworkName[] = ['localnet', 'devnet', 'testnet', 'mainnet'];

export function isLocalhost(): boolean {
    const hostname = window.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1';
}

export function loadNetwork(): NetworkName
{
    // Read 'network' URL parameter
    const params = new URLSearchParams(window.location.search);
    const networkFromUrl = params.get('network');

    if (networkFromUrl) {
        // Delete the 'network' parameter from the query string
        params.delete('network');
        const newQuery = params.toString();
        const newUrl = window.location.pathname + (newQuery ? '?' + newQuery : '') + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);

        // Use network from query string, if valid
        if (isNetworkName(networkFromUrl)) {
            localStorage.setItem('polymedia.network', networkFromUrl);
            return networkFromUrl;
        }
    }

    // Use network from local storage, if valid
    const networkFromLocal = localStorage.getItem('polymedia.network');
    if (isNetworkName(networkFromLocal)) {
        return networkFromLocal;
    }

    // Use default network
    localStorage.setItem('polymedia.network', defaultNetwork);
    return defaultNetwork;
}

export function switchNetwork(
    newNetwork: NetworkName,
    onSwitch?: (newNetwork: NetworkName) => void
) {
    localStorage.setItem('polymedia.network', newNetwork);
    if (typeof onSwitch !== 'undefined') {
        onSwitch(newNetwork);
    } else {
        window.location.reload();
    }
}

function isNetworkName(value: string | null): value is NetworkName {
    return value !== null && allNetworks.includes(value as NetworkName);
}
