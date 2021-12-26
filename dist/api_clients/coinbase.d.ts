import { HttpMethod } from '../utils';
declare class Client {
    private readonly baseUrl;
    private readonly secret;
    private readonly apiKey;
    private readonly apiPassphrase;
    constructor({ secret, apiKey, apiPassphrase }: {
        secret: string;
        apiKey: string;
        apiPassphrase: string;
    });
    private privateCall;
    static isPaginatedResult(data: any): boolean;
    call({ requestPath, since, until, method, body, }: {
        requestPath: string;
        since?: Date;
        until?: Date;
        method?: HttpMethod;
        body?: Record<string, any>;
    }): Promise<any>;
}
export default Client;
