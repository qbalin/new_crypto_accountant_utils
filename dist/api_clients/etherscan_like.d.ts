import { HttpMethod } from '../utils';
declare abstract class Client {
    readonly chainName: string;
    readonly baseUrl: string;
    readonly apiKey: string;
    constructor({ apiKey, baseUrl, chainName, }: {
        apiKey: string;
        baseUrl: string;
        chainName: string;
    });
    static isPaginatedResult(data: any): boolean;
    normalTransactions({ walletAddress, since }: {
        walletAddress: string;
        since: Date;
    }): Promise<{
        [key: string]: any;
        timeStamp: string;
    }[]>;
    internalTransactions({ walletAddress, since }: {
        walletAddress: string;
        since: Date;
    }): Promise<{
        [key: string]: any;
        timeStamp: string;
    }[]>;
    tokenTransactions({ walletAddress, since }: {
        walletAddress: string;
        since: Date;
    }): Promise<{
        [key: string]: any;
        timeStamp: string;
    }[]>;
    call({ requestPath, since, until, method, }: {
        requestPath: string;
        since?: Date;
        until?: Date;
        method?: HttpMethod;
    }): Promise<{
        [key: string]: any;
        timeStamp: string;
    }[]>;
    private privateCall;
}
export default Client;
