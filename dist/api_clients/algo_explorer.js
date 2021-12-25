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
var utils_1 = require("../utils");
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.getTransactions = function (_a) {
        var walletAddress = _a.walletAddress, _b = _a.since, since = _b === void 0 ? new Date('1970') : _b;
        return __awaiter(this, void 0, void 0, function () {
            var url, nextCursor, transactions, data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = new URL(this.baseUrl);
                        url.pathname += '/transactions';
                        url.searchParams.set('address', walletAddress.toUpperCase());
                        url.searchParams.set('after-time', since.toISOString());
                        transactions = [];
                        _c.label = 1;
                    case 1: return [4 /*yield*/, (0, utils_1.fetchJson)({ url: url.href })];
                    case 2:
                        data = (_c.sent()).data;
                        transactions.push.apply(transactions, data.transactions);
                        nextCursor = data['next-token'];
                        url.searchParams.set('next', nextCursor);
                        _c.label = 3;
                    case 3:
                        if (nextCursor) return [3 /*break*/, 1];
                        _c.label = 4;
                    case 4: return [2 /*return*/, transactions.filter(function (t) { return t['round-time'] * 1000 >= +since; })];
                }
            });
        });
    };
    Client.getAssets = function (_a) {
        var assetIds = _a.assetIds;
        return __awaiter(this, void 0, void 0, function () {
            var url, assets, i, assetId, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = new URL(this.baseUrl);
                        url.pathname += '/assets';
                        assets = [];
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < assetIds.length)) return [3 /*break*/, 4];
                        assetId = assetIds[i];
                        url.searchParams.set('asset-id', assetId.toString());
                        return [4 /*yield*/, (0, utils_1.fetchJson)({ url: url.href })];
                    case 2:
                        data = (_b.sent()).data;
                        assets.push.apply(assets, data.assets);
                        _b.label = 3;
                    case 3:
                        i += 1;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, assets];
                }
            });
        });
    };
    Client.baseUrl = 'https://algoexplorerapi.io/idx2/v2';
    return Client;
}());
exports.default = Client;
