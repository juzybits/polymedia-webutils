import { NetworkName, makeSuiExplorerUrl, shortenSuiAddress } from '@polymedia/suits';

/**
 * Create an external link like:
 * `<a target='_blank' rel='noopener noreferrer nofollow' href={href}>{text}</a>`
 */
export const LinkExternal: React.FC<{
    href: string;
    text: string;
    nofollow?: boolean;
}> = ({
    href,
    text,
    nofollow = true
}) => {
    return <a
        target='_blank'
        rel={`noopener noreferrer ${nofollow ? 'nofollow' : ''}`}
        href={href}
    >
        {text}
    </a>
}

/**
 * Create an external link to an address the Sui Explorer
 */
export const LinkToExplorerAddr: React.FC<{
    network: NetworkName;
    addr: string;
}> = ({
    network,
    addr,
}) => {
    return <LinkExternal
        href={makeSuiExplorerUrl(network, 'address', addr)}
        text={shortenSuiAddress(addr)}
    />;
}

/**
 * Create an external link to an object the Sui Explorer
 */
export const LinkToExplorerObj: React.FC<{
    network: NetworkName;
    objId: string;
}> = ({
    network,
    objId,
}) => {
    return <LinkExternal
        href={makeSuiExplorerUrl(network, 'object', objId)}
        text={shortenSuiAddress(objId)}
    />;
}

/**
 * Create an external link to a package the Sui Explorer
 */
export const LinkToExplorerPkg: React.FC<{
    network: NetworkName;
    pkgId: string;
}> = ({
    network,
    pkgId,
}) => {
    return <LinkExternal
        href={makeSuiExplorerUrl(network, 'package', pkgId)}
        text={shortenSuiAddress(pkgId)}
    />;
}


/**
 * Create an external link to a transaction block the Sui Explorer
 */
export const LinkToExplorerTxn: React.FC<{
    network: NetworkName;
    txnId: string;
}> = ({
    network,
    txnId,
}) => {
    return <LinkExternal
        href={makeSuiExplorerUrl(network, 'txblock', txnId)}
        text={shortenSuiAddress(txnId)}
    />;
}
