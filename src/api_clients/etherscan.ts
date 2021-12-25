import EtherscanBaseClient from './etherscan_like';
import { SupportedBlockchain } from '../constants';

class Client extends EtherscanBaseClient {
  constructor({ etherscanLikeApiKey }:
    { etherscanLikeApiKey: string }) {
    super({
      apiKey: etherscanLikeApiKey,
      baseUrl: 'https://api.etherscan.io/api',
      chainName: SupportedBlockchain.Ethereum,
    });
  }
}

export default Client;
