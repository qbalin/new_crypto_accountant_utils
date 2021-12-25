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
var fetchSixPerSecond = (0, utils_1.rateLimit)({ callsPerMinute: 360, fn: utils_1.fetchJson });
var KucoinClient = /** @class */ (function () {
    function KucoinClient(_a) {
        var secret = _a.secret, apiKey = _a.apiKey, apiPassphrase = _a.apiPassphrase;
        this.baseUrl = 'https://api.kucoin.com';
        this.secret = secret;
        this.apiKey = apiKey;
        this.apiPassphrase = apiPassphrase;
    }
    KucoinClient.signature = function (secret, timestamp, requestPath, body, method) {
        var upperCasedMethod = method.toUpperCase();
        var actualBody = upperCasedMethod === 'GET' ? '' : body;
        // create the prehash string by concatenating required parts
        var what = timestamp + upperCasedMethod + requestPath + actualBody;
        // create a sha256 hmac with the secret
        var hmac = crypto_1.default.createHmac('sha256', secret);
        // sign the require message with the hmac
        // and finally base64 encode the result
        return hmac.update(what).digest('base64');
    };
    KucoinClient.encryptedPassphrase = function (secret, passphrase) {
        // create a sha256 hmac with the secret
        var hmac = crypto_1.default.createHmac('sha256', secret);
        // sign the require message with the hmac
        // and finally base64 encode the result
        return hmac.update(passphrase).digest('base64');
    };
    KucoinClient.prototype.headers = function (url, body, method) {
        if (body === void 0) { body = ''; }
        if (method === void 0) { method = 'GET'; }
        var timestamp = Date.now();
        return {
            'KC-API-KEY': this.apiKey,
            'KC-API-PASSPHRASE': KucoinClient.encryptedPassphrase(this.secret, this.apiPassphrase),
            'KC-API-KEY-VERSION': '2',
            'KC-API-TIMESTAMP': timestamp.toString(),
            'KC-API-SIGN': KucoinClient.signature(this.secret, timestamp, "".concat(url.pathname).concat(url.search), body, method),
        };
    };
    KucoinClient.prototype.ledgers = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.since, since = _c === void 0 ? (0, utils_1.beginningOfYear)() : _c, _d = _b.until, until = _d === void 0 ? new Date() : _d;
        return __awaiter(this, void 0, void 0, function () {
            var results, url, now, oneDay, endAt, startAt, response;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (since > until) {
                            throw new Error("since ".concat(since, " should be before until ").concat(until));
                        }
                        results = [];
                        url = new URL(this.baseUrl);
                        now = new Date();
                        oneDay = 1000 * 3600 * 24;
                        endAt = new Date(Math.min(+until, +now));
                        startAt = new Date(Math.max(+new Date(+endAt - oneDay), +since));
                        // let startAt = since;
                        // const startAt = new Date('2021-11-06');
                        url.pathname = '/api/v1/accounts/ledgers';
                        url.searchParams.set('endAt', endAt.valueOf().toString());
                        url.searchParams.set('startAt', startAt.valueOf().toString());
                        return [4 /*yield*/, fetchSixPerSecond({ url: url.href, headers: this.headers(url) })];
                    case 1:
                        response = (_e.sent()).data;
                        console.log(url.href);
                        results.push.apply(results, response.data.items);
                        _e.label = 2;
                    case 2:
                        if (!(since < startAt)) return [3 /*break*/, 7];
                        endAt = new Date(+endAt - oneDay);
                        startAt = new Date(Math.max(+new Date(+endAt - oneDay), +since));
                        url.searchParams.set('endAt', endAt.valueOf().toString());
                        url.searchParams.set('startAt', startAt.valueOf().toString());
                        url.searchParams.set('currentPage', '1');
                        return [4 /*yield*/, fetchSixPerSecond({ url: url.href, headers: this.headers(url) })];
                    case 3:
                        // eslint-disable-next-line no-await-in-loop
                        response = (_e.sent()).data;
                        console.log(url.href);
                        results.push.apply(results, response.data.items);
                        _e.label = 4;
                    case 4:
                        if (!(response.data.currentPage < response.data.totalPage)) return [3 /*break*/, 6];
                        url.searchParams.set('currentPage', response.data.currentPage + 1);
                        return [4 /*yield*/, fetchSixPerSecond({ url: url.href, headers: this.headers(url) })];
                    case 5:
                        // eslint-disable-next-line no-await-in-loop
                        response = (_e.sent()).data;
                        results.push.apply(results, response.data.items);
                        return [3 /*break*/, 4];
                    case 6: return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, results];
                }
            });
        });
    };
    return KucoinClient;
}());
exports.default = KucoinClient;
