import EtherscanBaseClient from './etherscan_like';
import { SupportedBlockchain } from '../constants';

class Client extends EtherscanBaseClient {
  constructor({ etherscanLikeApiKey }:
    { etherscanLikeApiKey: string }) {
    super({
      apiKey: etherscanLikeApiKey,
      baseUrl: 'https://api.polygonscan.com/api',
      chainName: SupportedBlockchain.Polygon,
    });
  }
}

export default Client;
