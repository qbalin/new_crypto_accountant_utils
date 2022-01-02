import EtherscanBaseClient from '../etherscan_like/api_client';
import { SupportedBlockchain } from '../../constants';

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
