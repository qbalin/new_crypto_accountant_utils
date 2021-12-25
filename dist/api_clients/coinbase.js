"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var utils_1 = require("../utils");
// 3 calls per second conservatively: https://help.coinbase.com/en/pro/other-topics/api/faq-on-api
var fetchJson = (0, utils_1.rateLimit)({ fn: utils_1.fetchJson, callsPerMinute: 180 });
var signature = function (secret, timestamp, requestPath, body, method) {
    var upperCasedMethod = method.toUpperCase();
    var actualBody = upperCasedMethod === 'GET' ? '' : body;
    // create the prehash string by concatenating required parts
    var what = timestamp + upperCasedMethod + requestPath + actualBody;
    // decode the base64 secret
    var key = Buffer.from(secret, 'base64');
    // create a sha256 hmac with the secret
    var hmac = crypto_1.default.createHmac('sha256', key);
    // sign the require message with the hmac
    // and finally base64 encode the result
    return hmac.update(what).digest('base64');
};
var Client = /** @class */ (function () {
    function Client(_a) {
        var secret = _a.secret, apiKey = _a.apiKey, apiPassphrase = _a.apiPassphrase;
        this.baseUrl = 'https://api.pro.coinbase.com';
        this.secret = secret;
        this.apiKey = apiKey;
        this.apiPassphrase = apiPassphrase;
    }
    Client.prototype.privateCall = function (_a) {
        var url = _a.url, method = _a.method, body = _a.body, timestamp = _a.timestamp;
        console.log('CoinbaseClient call:', url.href);
        var headers = {
            'CB-ACCESS-KEY': this.apiKey,
            'CB-ACCESS-PASSPHRASE': this.apiPassphrase,
            'CB-ACCESS-TIMESTAMP': timestamp,
            'CB-ACCESS-SIGN': signature(this.secret, timestamp, "".concat(url.pathname).concat(url.search), body, method),
            'User-Agent': 'me',
        };
        return fetchJson({ url: url.href, method: method, headers: headers });
    };
    Client.isPaginatedResult = function (data) {
        return Array.isArray(data);
    };
    Client.prototype.call = function (_a) {
        var requestPath = _a.requestPath, _b = _a.since, since = _b === void 0 ? new Date('1970') : _b, _c = _a.until, until = _c === void 0 ? new Date() : _c, _d = _a.method, method = _d === void 0 ? 'GET' : _d, _e = _a.body, body = _e === void 0 ? {} : _e;
        return __awaiter(this, void 0, void 0, function () {
            var collection, url, _f, data, headers, lastEntry, cbAfterAsDate, res;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        collection = [];
                        url = new URL("".concat(this.baseUrl).concat(requestPath));
                        return [4 /*yield*/, this.privateCall({
                                url: url,
                                method: method,
                                body: body,
                                timestamp: (Date.now() / 1000).toString(),
                            })];
                    case 1:
                        _f = _g.sent(), data = _f.data, headers = _f.response.headers;
                        // If what is returned is a single object, we're done
                        if (!Client.isPaginatedResult(data)) {
                            return [2 /*return*/, data];
                        }
                        collection = collection.concat(data);
                        lastEntry = collection[collection.length - 1];
                        _g.label = 2;
                    case 2:
                        if (!(data.length > 0 && new Date(lastEntry.created_at) >= since)) return [3 /*break*/, 4];
                        cbAfterAsDate = new Date(headers.get('cb-after'));
                        if (Number.isNaN(cbAfterAsDate.valueOf())) {
                            url.searchParams.set('after', headers.get('cb-after'));
                        }
                        else {
                            url.searchParams.set('after', cbAfterAsDate.toISOString());
                        }
                        return [4 /*yield*/, this.privateCall({
                                url: url,
                                method: method,
                                body: body,
                                timestamp: (Date.now() / 1000).toString(),
                            })];
                    case 3:
                        res = _g.sent();
                        data = res.data;
                        headers = res.response.headers;
                        collection = collection.concat(data);
                        lastEntry = collection[collection.length - 1];
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, collection.filter(function (entry) {
                            if (!entry.created_at) {
                                return true;
                            }
                            var createdAt = new Date(entry.created_at);
                            return createdAt >= since && createdAt <= until;
                        })];
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
