import { NetworkName } from '@polymedia/suits';
import { useRef, useState } from 'react';
import { switchNetwork } from './network';
import { useClickOutside } from './useClickOutside';

export function NetworkSelector({
    currentNetwork,
    supportedNetworks = ['mainnet', 'testnet', 'devnet', 'localnet'],
    onSwitch,
}: {
    currentNetwork: NetworkName;
    supportedNetworks?: NetworkName[];
    onSwitch?: (newNetwork: NetworkName) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const selectorRef = useRef(null);
    useClickOutside(selectorRef, () => { setIsOpen(false) });

    const ClosedSelector: React.FC = () => {
        return <div className='network-option' /* onMouseEnter={() => setIsOpen(true)} */ >
            <span className='text' onClick={() => { setIsOpen(true) }}>
                {currentNetwork}
            </span>
        </div>;
    };

    // Make the current network the first element in supportedNetworks
    supportedNetworks = supportedNetworks.filter(net => net !== currentNetwork);
    supportedNetworks.unshift(currentNetwork);

    const OpenSelector: React.FC = () => {
        return <>
            {supportedNetworks.map(net => (
                <NetworkOption key={net} network={net} />
            ))}
        </>;
    };

    const NetworkOption: React.FC<{ network: NetworkName }> = ({ network }) => {
        const isSelected = network === currentNetwork;
        return <div className={`network-option ${isSelected ? 'selected' : ''}`}>
            <span className='text'
                onClick={isSelected ? undefined : () => {
                    switchNetwork(network, onSwitch);
                    setIsOpen(false);
                }}
            >
                {network == currentNetwork ? '>' : ''}
                {network}
            </span>
        </div>;
    };

    return <div
        id='network-selector'
        ref={selectorRef}
        // onMouseLeave={() => setIsOpen(false)}
    >
        <div className='network-options'>
            {isOpen ? <OpenSelector /> : <ClosedSelector />}
        </div>
    </div>;
}
