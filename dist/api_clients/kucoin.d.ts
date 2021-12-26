declare class KucoinClient {
    private readonly baseUrl;
    private readonly secret;
    private readonly apiKey;
    private readonly apiPassphrase;
    constructor({ secret, apiKey, apiPassphrase }: {
        secret: string;
        apiKey: string;
        apiPassphrase: string;
    });
    private static signature;
    private static encryptedPassphrase;
    private headers;
    ledgers({ since, until }?: {
        since?: Date;
        until?: Date;
    }): Promise<any[]>;
}
export default KucoinClient;
