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
var url_1 = require("url");
var utils_1 = require("../utils");
var fetchJson = (0, utils_1.rateLimit)({ callsPerMinute: 300, fn: utils_1.fetchJson });
var Client = /** @class */ (function () {
    function Client(_a) {
        var apiKey = _a.apiKey, baseUrl = _a.baseUrl, chainName = _a.chainName;
        this.chainName = chainName;
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }
    Client.isPaginatedResult = function (data) {
        return Array.isArray(data);
    };
    Client.prototype.call = function (_a) {
        var requestPath = _a.requestPath, _b = _a.since, since = _b === void 0 ? new Date('1970') : _b, _c = _a.until, until = _c === void 0 ? new Date() : _c, _d = _a.method, method = _d === void 0 ? 'GET' : _d;
        return __awaiter(this, void 0, void 0, function () {
            var collection, url, data, lastEntry;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        collection = [];
                        url = new url_1.URL("".concat(this.baseUrl).concat(requestPath));
                        // Etehrscan can never return more than 10k results, so pagination is achieved with block lookup
                        url.searchParams.set('page', '1');
                        url.searchParams.set('offset', '10000');
                        url.searchParams.set('startblock', url.searchParams.get('startblock') || '0');
                        url.searchParams.set('endblock', url.searchParams.get('endblock') || '99999999');
                        url.searchParams.set('sort', 'desc');
                        return [4 /*yield*/, this.privateCall({
                                url: url,
                                method: method,
                            })];
                    case 1:
                        data = (_e.sent()).data.result;
                        // If what is returned is a single object, i.e. it does not have pagination info, we're done
                        if (!Client.isPaginatedResult(data)) {
                            return [2 /*return*/, data];
                        }
                        collection = collection.concat(data);
                        lastEntry = collection[collection.length - 1];
                        _e.label = 2;
                    case 2:
                        if (!(data.length
                            && data.length >= 10000
                            && new Date(parseInt(lastEntry.timeStamp, 10) * 1000) >= since)) return [3 /*break*/, 4];
                        url.searchParams.set('endblock', (parseInt(lastEntry.blockNumber, 10) - 1).toString());
                        return [4 /*yield*/, this.privateCall({
                                url: url,
                                method: method,
                            })];
                    case 3:
                        /* eslint-disable-next-line no-await-in-loop */
                        data = (_e.sent()).data.result;
                        collection = collection.concat(data);
                        lastEntry = collection[collection.length - 1];
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, collection.filter(function (entry) {
                            var createdAt = new Date(parseInt(entry.timeStamp, 10) * 1000);
                            return createdAt >= since && createdAt <= until;
                        })];
                }
            });
        });
    };
    Client.prototype.privateCall = function (_a) {
        var url = _a.url, method = _a.method;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                url.searchParams.set('apikey', this.apiKey);
                console.log('EtherScanLikeClient call:', url.href);
                return [2 /*return*/, fetchJson({ url: url.href, method: method })];
            });
        });
    };
    return Client;
}());
exports.default = Client;
