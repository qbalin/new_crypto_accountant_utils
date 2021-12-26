import EtherscanBaseClient from './etherscan_like';
declare class Client extends EtherscanBaseClient {
    constructor({ etherscanLikeApiKey }: {
        etherscanLikeApiKey: string;
    });
}
export default Client;
