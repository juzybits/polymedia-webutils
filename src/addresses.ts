export const ADDRESS_REGEX = '0[xX][a-fA-F0-9]{64}';

export function shortenAddress(address: string|undefined, start=4, end=4, prefix='', separator='..'): string {
    return !address ? '' : prefix + address.slice(2, 2+start) + separator + address.slice(-end);
}
