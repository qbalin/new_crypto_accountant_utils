interface Transaction {
    txid: string;
    vin: {
        prevout: {
            scriptpubkey_address: string;
        };
    }[];
    vout: {
        scriptpubkey_address: string;
    }[];
    status: {
        block_time: number;
    };
}
declare class BlockstreamClient {
    private readonly extPubKey;
    private readonly baseUrl;
    constructor({ extPubKey }: {
        extPubKey: string;
    });
    getTransactions({ since, addressGapLimit }: {
        since?: Date;
        addressGapLimit?: number;
    }): Promise<Transaction[]>;
    private getTransactionsForAddress;
}
export default BlockstreamClient;
