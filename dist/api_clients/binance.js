var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import crypto from 'crypto';
import { fetchJson } from '../utils';
/* eslint-disable no-underscore-dangle */
const signature = (secret, url, body, method) => {
    const upperCasedMethod = method.toUpperCase();
    const actualBody = upperCasedMethod === 'GET' ? '' : body;
    // create the prehash string by concatenating required parts
    const what = url.searchParams.toString() + actualBody;
    // create a sha256 hmac with the secret
    const hmac = crypto.createHmac('sha256', secret);
    // sign the require message with the hmac
    // and finally hex encode the result
    return hmac.update(what).digest('hex');
};
class BinanceClient {
    constructor({ secret, apiKey }) {
        this.baseUrl = 'https://api.binance.com';
        this.secret = secret;
        this.apiKey = apiKey;
    }
    _call({ url, method, body, timestamp, }) {
        url.searchParams.set('timestamp', timestamp.toString());
        const sig = signature(this.secret, url, body, method);
        url.searchParams.set('signature', sig);
        console.log('BinanceClient call:', url.href);
        const headers = {
            'X-MBX-APIKEY': this.apiKey,
        };
        return fetchJson({ url: url.href, method, headers });
    }
    static isPaginatedResult(data) {
        return Array.isArray(data);
    }
    call({ requestPath, since = new Date('1970'), until = new Date(), method = 'GET', body = '', }) {
        return __awaiter(this, void 0, void 0, function* () {
            let collection = [];
            const url = new URL(`${this.baseUrl}${requestPath}`);
            let { data: { data }, } = yield this._call({
                url,
                method,
                body,
                timestamp: Date.now(),
            });
            // If what is returned is a single object, i.e. it does not have pagination info, we're done
            if (!BinanceClient.isPaginatedResult(data)) {
                return data;
            }
            collection = collection.concat(data.items);
            let lastEntry = collection[collection.length - 1];
            let { currentPage } = data; // Should be 1
            while (data.items.length > 0 && new Date(lastEntry.createdAt) >= since) {
                currentPage += 1;
                url.searchParams.set('currentPage', currentPage);
                /* eslint-disable-next-line no-await-in-loop */
                const res = yield this._call({
                    url,
                    method,
                    body,
                    timestamp: Date.now(),
                });
                data = res.data.data;
                collection = collection.concat(data.items);
                lastEntry = collection[collection.length - 1];
            }
            return collection.filter((entry) => {
                if (!entry.createdAt) {
                    return true;
                }
                const createdAt = new Date(entry.createdAt);
                return createdAt >= since && createdAt <= until;
            });
        });
    }
}
export default BinanceClient;
/* eslint-enable no-underscore-dangle */
