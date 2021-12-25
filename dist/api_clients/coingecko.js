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
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line max-classes-per-file
var utils_1 = require("../utils");
var rateLimitedFetchJson = (0, utils_1.rateLimit)({ fn: utils_1.fetchJson, callsPerMinute: 50 });
var padWithOneZero = function (n) { return (n < 10 ? "0".concat(n) : n.toString()); };
var convertDate = function (date) {
    var month = padWithOneZero(date.getMonth() + 1);
    var day = padWithOneZero(date.getDate());
    return "".concat(day, "-").concat(month, "-").concat(date.getFullYear());
};
var CoinList = /** @class */ (function () {
    function CoinList(list) {
        this.symbolToMap = list.reduce(function (memo, value) {
            // eslint-disable-next-line no-param-reassign
            memo[value.symbol] = value.id;
            return memo;
        }, {});
    }
    CoinList.prototype.getId = function (symbol) {
        return this.symbolToMap[symbol]
            || this.symbolToMap[symbol.toLowerCase()]
            || this.symbolToMap[symbol.toUpperCase()];
    };
    return CoinList;
}());
var CoingeckoClient = /** @class */ (function () {
    function CoingeckoClient() {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
        this.coinList = null;
        this.cache = null;
        this.fetchingCoinList = false;
    }
    CoingeckoClient.prototype.getCoinList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.coinList) {
                            return [2 /*return*/, this.coinList];
                        }
                        this.fetchingCoinList = true;
                        url = new URL(this.baseUrl);
                        url.pathname += '/coins/list';
                        url.searchParams.set('include_platform', 'false');
                        return [4 /*yield*/, rateLimitedFetchJson({ url: url.href, headers: { accept: 'application/json' } })];
                    case 1:
                        data = (_a.sent()).data;
                        this.coinList = new CoinList(data);
                        this.fetchingCoinList = false;
                        return [2 /*return*/, this.coinList];
                }
            });
        });
    };
    CoingeckoClient.prototype.getPrice = function (_a) {
        var at = _a.at, ticker = _a.ticker;
        return __awaiter(this, void 0, void 0, function () {
            var coinId, url, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.fetchingCoinList) return [3 /*break*/, 2];
                        // eslint-disable-next-line no-await-in-loop
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 1:
                        // eslint-disable-next-line no-await-in-loop
                        _b.sent();
                        return [3 /*break*/, 0];
                    case 2: return [4 /*yield*/, this.getCoinList()];
                    case 3:
                        coinId = (_b.sent()).getId(ticker);
                        if (!coinId) {
                            throw new Error("Coin with ticker ".concat(ticker, " is not listed on Coingecko"));
                        }
                        url = new URL(this.baseUrl);
                        url.pathname += "/coins/".concat(coinId, "/history");
                        url.searchParams.set('localization', 'false');
                        url.searchParams.set('date', convertDate(at));
                        return [4 /*yield*/, rateLimitedFetchJson({ url: url.href, headers: { accept: 'application/json' } })];
                    case 4:
                        data = (_b.sent()).data;
                        return [2 /*return*/, data.market_data.current_price.usd];
                }
            });
        });
    };
    return CoingeckoClient;
}());
exports.default = new CoingeckoClient();
