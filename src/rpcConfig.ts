import { NetworkName } from './network';
import defaultEndpoints from './rpcConfig.json';

const rpcConfigUrl = 'https://raw.githubusercontent.com/juzybits/polymedia-webutils/main/src/rpcConfig.json';

type RpcConfig = {
    fullnode: string,
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
    websocket = false,
    noFetch = false,
    customEndpoints = {},
}: {
    network: NetworkName,
    websocket?: boolean
    customEndpoints?: Partial<RpcEndpoints>, // overwrite some or all endpoints
    noFetch?: boolean, // read directly from rpcConfig.json rather than fetching from URL
}): Promise<RpcConfig>
{
    const baseEndpoints = noFetch ? defaultEndpoints : await fetchRpcEndpoints();
    const endpoints = {...baseEndpoints, ...customEndpoints};
    return {
        fullnode: websocket ? endpoints[`${network}_websocket`] : endpoints[`${network}_fullnode`],
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
