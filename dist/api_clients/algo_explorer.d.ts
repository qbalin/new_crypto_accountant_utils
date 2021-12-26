declare class Client {
    private static readonly baseUrl;
    static getTransactions({ walletAddress, since }: {
        walletAddress: string;
        since?: Date;
    }): Promise<any[]>;
    static getAssets({ assetIds }: {
        assetIds: number[];
    }): Promise<Record<string, any>[]>;
}
export default Client;
