import KucoinClient from './api_clients/kucoin';
import EtherscanClient from './api_clients/etherscan';
import CoingeckoClient from './api_clients/coingecko';
import { SupportedBlockchain, SupportedPlatform } from './constants';
import Kucoin from './attributes/kucoin';
import EtherscanLike from './attributes/etherscan_like';
interface Attributes {
    Kucoin: Kucoin;
    EtherscanLike: EtherscanLike;
}
export { KucoinClient, CoingeckoClient, EtherscanClient, SupportedBlockchain, SupportedPlatform, Attributes };
