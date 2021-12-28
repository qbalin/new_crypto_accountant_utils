import KucoinClient from './api_clients/kucoin';
import EtherscanClient from './api_clients/etherscan';
import PolygonscanClient from './api_clients/polygonscan';
import BscscanClient from './api_clients/bscscan';
import CoinbaseClient from './api_clients/coinbase';
import CoingeckoClient from './api_clients/coingecko';

import { SupportedBlockchain, SupportedPlatform } from './constants';

import KucoinAttributes from './attributes/kucoin';
import EtherscanLikeAttributes from './attributes/etherscan_like';
import CoinbaseAttributes from './attributes/coinbase';

interface Attributes {
  Kucoin: KucoinAttributes,
  EtherscanLike: EtherscanLikeAttributes,
  Coinbase: CoinbaseAttributes,
}

export {
  KucoinClient,
  CoingeckoClient,
  PolygonscanClient,
  BscscanClient,
  CoinbaseClient,
  EtherscanClient,
  SupportedBlockchain,
  SupportedPlatform,
  Attributes
};