import { NetworkName } from './network';

const rpcConfigUrl = 'https://raw.githubusercontent.com/juzybits/polymedia-webutils/main/src/rpcConfig.json';

type RpcConfig = {
    fullnode: string,
    faucet: string,
}
export async function loadRpcConfig(network: NetworkName): Promise<RpcConfig> {
    const endpoints = await fetchRpcEndpoints();
    return {
        fullnode: endpoints[`${network}_fullnode`],
        faucet: endpoints[`${network}_faucet`],
    };
}

type RpcEndpoints = {
    localnet_fullnode: string;
    localnet_websocket: string;
    localnet_faucet: string;

    devnet_fullnode: string;
    devnet_websocket: string;
    devnet_faucet: string;

    testnet_fullnode: string;
    testnet_websocket: string;
    testnet_faucet: string;
}
async function fetchRpcEndpoints(url: string = rpcConfigUrl): Promise<RpcEndpoints> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching RPC config: ${response.statusText}`);
    }
    const data: RpcEndpoints = await response.json();
    return data;
}
