import { NetworkName } from './network';

export type ExplorerItem = 'address' | 'object' | 'package';

export function linkToExplorer(network: NetworkName, kind: ExplorerItem, address: string): string {
    const baseUrl = network === 'localnet'
    ? 'http://localhost:3000'
    : 'https://suiexplorer.com';
    const networkLabel = network === 'localnet' ? 'local' : network;
    return `${baseUrl}/${kind}/${address}?network=${networkLabel}`;
}