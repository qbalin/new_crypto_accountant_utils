"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var kucoin_1 = __importDefault(require("./api_clients/kucoin"));
var coingecko_1 = __importDefault(require("./api_clients/coingecko"));
exports.default = { KucoinClient: kucoin_1.default, CoingeckoClient: coingecko_1.default };
