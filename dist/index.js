"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedPlatform = exports.SupportedBlockchain = exports.EtherscanClient = exports.CoingeckoClient = exports.KucoinClient = void 0;
var kucoin_1 = __importDefault(require("./api_clients/kucoin"));
exports.KucoinClient = kucoin_1.default;
var etherscan_1 = __importDefault(require("./api_clients/etherscan"));
exports.EtherscanClient = etherscan_1.default;
var coingecko_1 = __importDefault(require("./api_clients/coingecko"));
exports.CoingeckoClient = coingecko_1.default;
var constants_1 = require("./constants");
Object.defineProperty(exports, "SupportedBlockchain", { enumerable: true, get: function () { return constants_1.SupportedBlockchain; } });
Object.defineProperty(exports, "SupportedPlatform", { enumerable: true, get: function () { return constants_1.SupportedPlatform; } });
