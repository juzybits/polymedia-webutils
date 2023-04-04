import { useRef, useState } from 'react';
import { useClickOutside } from './useClickOutside';

const defaultNetwork = 'devnet';
let supportedNetworks = ['devnet', 'testnet'];

// Add 'localnet' to supportedNetworks
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
if (isLocalhost) supportedNetworks.unshift('localnet');

export const currentNetwork = loadNetwork();

// Make currentNetwork the first element in supportedNetworks
supportedNetworks = supportedNetworks.filter(net => net !== currentNetwork);
supportedNetworks.unshift(currentNetwork);

export const NetworkSelector: React.FC = () =>
{
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef(null);
    useClickOutside(selectorRef, () => setIsOpen(false));

    const ClosedSelector: React.FC = () => {
        return <div
            className='network-option'
            // onMouseEnter={() => setIsOpen(true)}
            onClick={() => setIsOpen(true)}
        >
            {currentNetwork}
        </div>;
    };

    const OpenSelector: React.FC = () => {
        return <>
            {supportedNetworks.map((net) => (
                <NetworkOption key={net} network={net} />
            ))}
        </>;
    };

    const NetworkOption: React.FC<{ network: string }> = ({ network }) => {
        const isSelected = network === currentNetwork;
        return <div
            className={`network-option ${isSelected ? 'selected' : ''}`}
            onClick={isSelected ? undefined : () => switchNetwork(network)}
        >
            {network == currentNetwork ? '>' : ''}
            {network}
        </div>;
    };

    return <div
        id='network-selector'
        ref={selectorRef}
        onMouseLeave={() => setIsOpen(false)}
    >
        <div className='network-options'>
            {isOpen ? <OpenSelector /> : <ClosedSelector />}
        </div>
    </div>;
}

function loadNetwork(): string
{
    // Read 'network' URL parameter
    const params = new URLSearchParams(window.location.search);
    const networkFromUrl = params.get('network');
    // Delete query string
    window.history.replaceState({}, document.title, window.location.pathname);

    // Use network from query string, if valid
    if (networkFromUrl && supportedNetworks.includes(networkFromUrl)) {
        localStorage.setItem('polymedia.network', networkFromUrl);
        return networkFromUrl;
    }

    // Use network from local storage, if valid
    const networkFromLocal = localStorage.getItem('polymedia.network');
    if (networkFromLocal && supportedNetworks.includes(networkFromLocal)) {
        return networkFromLocal;
    }

    // Use default network
    localStorage.setItem('polymedia.network', defaultNetwork);
    return defaultNetwork;
};

function switchNetwork(newNetwork: string)
{
    localStorage.setItem('polymedia.network', newNetwork);
    window.location.reload();
};

