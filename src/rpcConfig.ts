import { NetworkName } from './network';
import defaultEndpoints from './rpcConfig.json';

const rpcConfigUrl = 'https://raw.githubusercontent.com/juzybits/polymedia-webutils/main/src/rpcConfig.json';

type ConnectionOptions = { // mirrors sui/sdk/typescript/src/rpc/connection.ts
    fullnode: string,
    websocket: string,
    faucet: string,
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

export async function loadRpcConfig({
    network,
    noFetch = false,
    customEndpoints = {},
}: {
    network: NetworkName,
    customEndpoints?: Partial<RpcEndpoints>, // overwrite some or all endpoints
    noFetch?: boolean, // read directly from rpcConfig.json rather than fetching from URL
}): Promise<ConnectionOptions>
{
    const baseEndpoints = noFetch ? defaultEndpoints : await fetchRpcEndpoints();
    const endpoints = {...baseEndpoints, ...customEndpoints};
    return {
        fullnode: endpoints[`${network}_fullnode`],
        websocket: endpoints[`${network}_websocket`],
        faucet: endpoints[`${network}_faucet`],
    };
}

async function fetchRpcEndpoints(url: string = rpcConfigUrl): Promise<RpcEndpoints> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching RPC config: ${response.statusText}`);
    }
    const data: RpcEndpoints = await response.json();
    return data;
}
