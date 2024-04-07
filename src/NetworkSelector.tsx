import { useRef, useState } from 'react';
import { BaseNetworkName, switchNetwork } from './network';
import { useClickOutside } from './useClickOutside';

export function NetworkSelector<NetworkName extends BaseNetworkName>({
    currentNetwork,
    supportedNetworks,
    onSwitch,
    classes = ''
}: {
    currentNetwork: NetworkName;
    supportedNetworks: readonly NetworkName[];
    onSwitch?: (newNetwork: NetworkName) => void;
    classes?: string,
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
            <span className='text' onClick={() => {
                switchNetwork(network, supportedNetworks, onSwitch);
                setIsOpen(false);
            }}>
                {network}
            </span>
        </div>;
    };

    return <div
        className={'network-selector ' + classes}
        ref={selectorRef}
        onMouseLeave={() => {setIsOpen(false)}}
    >
        <SelectedOption />
        {isOpen && <NetworkOptions />}
    </div>;
}
