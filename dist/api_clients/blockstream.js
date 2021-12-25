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
/* eslint-disable camelcase */
// @ts-ignore
var xpub_lib_1 = require("@swan-bitcoin/xpub-lib");
var utils_1 = require("../utils");
var BlockstreamClient = /** @class */ (function () {
    function BlockstreamClient(_a) {
        var extPubKey = _a.extPubKey;
        this.baseUrl = 'https://blockstream.info/api';
        this.extPubKey = extPubKey;
    }
    BlockstreamClient.prototype.getTransactions = function (_a) {
        var _b = _a.since, since = _b === void 0 ? new Date('1970') : _b, _c = _a.addressGapLimit, addressGapLimit = _c === void 0 ? 20 : _c;
        return __awaiter(this, void 0, void 0, function () {
            var transactions, addressCount, currentAddressIndex, addressGap, addresses, currentAddress, newTransactions;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        transactions = {};
                        addressCount = 100;
                        currentAddressIndex = 0;
                        addressGap = 0;
                        addresses = (0, xpub_lib_1.addressesFromExtPubKey)({ extPubKey: this.extPubKey, network: 'mainnet', addressCount: addressCount })
                            .map(function (a) { return a.address; });
                        _d.label = 1;
                    case 1:
                        currentAddress = addresses[currentAddressIndex];
                        return [4 /*yield*/, this.getTransactionsForAddress(currentAddress)];
                    case 2:
                        newTransactions = _d.sent();
                        // eslint-disable-next-line no-loop-func
                        newTransactions.forEach(function (t) {
                            // eslint-disable-next-line no-param-reassign
                            t.vin = t.vin.filter(function (inObj) { return addresses
                                .includes(inObj.prevout.scriptpubkey_address); });
                            // eslint-disable-next-line no-param-reassign
                            t.vout = t.vout.filter(function (outObj) { return addresses.includes(outObj.scriptpubkey_address); });
                            transactions[t.txid] = t;
                        });
                        if (newTransactions.length === 0) {
                            addressGap += 1;
                        }
                        currentAddressIndex += 1;
                        if (currentAddressIndex === addresses.length) {
                            addressCount += 100;
                            addresses = (0, xpub_lib_1.addressesFromExtPubKey)({ extPubKey: this.extPubKey, network: 'mainnet', addressCount: addressCount })
                                .map(function (a) { return a.address; });
                        }
                        _d.label = 3;
                    case 3:
                        if (addressGap < addressGapLimit) return [3 /*break*/, 1];
                        _d.label = 4;
                    case 4: return [2 /*return*/, Object.values(transactions).filter(function (t) { return +new Date(t.status.block_time) >= +since; })];
                }
            });
        });
    };
    BlockstreamClient.prototype.getTransactionsForAddress = function (address) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var url, transactions, oldestTransactionId, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = new URL("".concat(this.baseUrl, "/address/").concat(address, "/txs/chain"));
                        transactions = [];
                        _b.label = 1;
                    case 1: return [4 /*yield*/, (0, utils_1.fetchJson)({ url: url.href })];
                    case 2:
                        data = (_b.sent()).data;
                        transactions.push.apply(transactions, data);
                        oldestTransactionId = (_a = data[data.length]) === null || _a === void 0 ? void 0 : _a.txid;
                        _b.label = 3;
                    case 3:
                        if (oldestTransactionId) return [3 /*break*/, 1];
                        _b.label = 4;
                    case 4: return [2 /*return*/, transactions];
                }
            });
        });
    };
    return BlockstreamClient;
}());
exports.default = BlockstreamClient;
