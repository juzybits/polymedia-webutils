import { NetworkName } from '@polymedia/suits';
import { useRef, useState } from 'react';
import { switchNetwork } from './network';
import { useClickOutside } from './useClickOutside';

export function NetworkSelector({
    currentNetwork,
    supportedNetworks = ['localnet', 'devnet', 'testnet', 'mainnet'],
    onSwitch,
}: {
    currentNetwork: NetworkName;
    supportedNetworks?: NetworkName[];
    onSwitch?: (newNetwork: NetworkName) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const selectorRef = useRef(null);
    useClickOutside(selectorRef, () => { setIsOpen(false) });

    const SelectedOption: React.FC = () => {
        return <div className='network-option selected' /* onMouseEnter={() => setIsOpen(true)} */ >
            <span className='text' onClick={() => { setIsOpen(true) }}>
                {currentNetwork}
            </span>
        </div>;
    };

    const NetworkOptions: React.FC = () => {
        const otherNetworks = supportedNetworks.filter(net => net !== currentNetwork);
        return <div className='network-options'>
            {otherNetworks.map(net => (
                <NetworkOption key={net} network={net} />
            ))}
        </div>;
    };

    const NetworkOption: React.FC<{ network: NetworkName }> = ({ network }) => {
        return <div className='network-option'>
            <span className='text'
                onClick={() => {
                    switchNetwork(network, onSwitch);
                    setIsOpen(false);
                }}
            >
                {network}
            </span>
        </div>;
    };

    return <div
        id='network-selector'
        ref={selectorRef}
        onMouseLeave={() => {setIsOpen(false)}}
    >
        <SelectedOption />
        {isOpen && <NetworkOptions />}
    </div>;
}
