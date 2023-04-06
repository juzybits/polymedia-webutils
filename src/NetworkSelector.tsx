import { useMemo, useRef, useState } from 'react';

import { NetworkName, switchNetwork, getSupportedNetworks } from './network';
import { useClickOutside } from './useClickOutside';

export function NetworkSelector({ currentNetwork }: {
    currentNetwork: NetworkName;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const selectorRef = useRef(null);
    useClickOutside(selectorRef, () => setIsOpen(false));

    const supportedNetworks = useMemo(() => {
        return getSupportedNetworks(currentNetwork);
    }, [currentNetwork]);

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

    const NetworkOption: React.FC<{ network: NetworkName }> = ({ network }) => {
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
