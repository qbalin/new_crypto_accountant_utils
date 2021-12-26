declare class CoinList {
    symbolToMap: Record<string, string>;
    constructor(list: {
        id: string;
        symbol: string;
        name: string;
    }[]);
    getId(symbol: string): string;
}
export declare class CoingeckoClient {
    private readonly baseUrl;
    private coinList;
    cache: null | Record<string, any>;
    private fetchingCoinList;
    constructor();
    getCoinList(): Promise<CoinList>;
    getPrice({ at, ticker }: {
        at: Date;
        ticker: string;
    }): Promise<any>;
}
declare const client: CoingeckoClient;
export default client;
