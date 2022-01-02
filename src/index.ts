import KucoinClient from './platforms/kucoin/api_client';
import EtherscanClient from './platforms/ethereum/api_client';
import PolygonscanClient from './platforms/polygon/api_client';
import BscscanClient from './platforms/binance_smart_chain/api_client';
import CoinbaseClient from './platforms/coinbase/api_client';
import CoingeckoClient from './platforms/coingecko/api_client';

import { SupportedBlockchain, SupportedPlatform } from './constants';

import KucoinAttributes from './platforms/kucoin/attributes';
import EtherscanLikeAttributes from './platforms/etherscan_like/attributes';
import CoinbaseAttributes from './platforms/coinbase/attributes';

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