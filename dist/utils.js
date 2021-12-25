"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.partition = exports.beginningOfYear = exports.rateLimit = exports.Heap = exports.time = exports.uniq = exports.groupBy = exports.fetchJson = void 0;
var fetchJson = function (_a) {
    var url = _a.url, _b = _a.method, method = _b === void 0 ? 'GET' : _b, _c = _a.headers, headers = _c === void 0 ? {} : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var response;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: method,
                        headers: __assign({ 'content-type': 'application/json' }, headers),
                        mode: 'cors'
                    })];
                case 1:
                    response = _e.sent();
                    _d = {};
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, (_d.data = _e.sent(),
                        _d.response = response,
                        _d)];
            }
        });
    });
};
exports.fetchJson = fetchJson;
var groupBy = function (collection, predicate) { return collection
    .reduce(function (memo, entry) {
    var _a;
    // eslint-disable-next-line no-param-reassign
    memo[_a = predicate(entry)] || (memo[_a] = []);
    memo[predicate(entry)].push(entry);
    return memo;
}, {}); };
exports.groupBy = groupBy;
var partition = function (collection, predicate) { return collection.reduce(function (memo, entry) {
    if (predicate(entry)) {
        memo[0].push(entry);
    }
    else {
        memo[1].push(entry);
    }
    return memo;
}, [[], []]); };
exports.partition = partition;
var uniq = function (collection) { return Array.from(new Set(collection)); };
exports.uniq = uniq;
var time = function (description, fn) {
    var start = +new Date();
    fn();
    var end = +new Date();
    console.log("".concat(description ? "".concat(description, ": ") : '').concat(end - start, "ms"));
};
exports.time = time;
time.startTime = +new Date();
time.start = (function () { time.startTime = +new Date(); });
time.end = (function () { console.log("".concat(+new Date() - time.startTime, "ms")); });
var Heap = /** @class */ (function () {
    function Heap() {
        this.array = [];
    }
    Heap.prototype.value = function (index) {
        return this.array[index].indexingValue;
    };
    Heap.prototype.peek = function () {
        var _a;
        return ((_a = this.array[0]) === null || _a === void 0 ? void 0 : _a.element) || null;
    };
    Object.defineProperty(Heap.prototype, "size", {
        get: function () {
            return this.array.length;
        },
        enumerable: false,
        configurable: true
    });
    Heap.prototype.heapifyUp = function () {
        var currentIndex = this.size - 1;
        var parentIndex = Heap.parentIndex(currentIndex);
        while (parentIndex >= 0 && this.value(currentIndex) > this.value(parentIndex)) {
            this.swap(parentIndex, currentIndex);
            currentIndex = parentIndex;
            parentIndex = Heap.parentIndex(currentIndex);
        }
    };
    Heap.prototype.heapifyDown = function () {
        if (this.size < 1) {
            return;
        }
        var currentIndex = 0;
        while (this.hasLeftChild(currentIndex)) {
            var maxChildIndex = Heap.leftChildIndex(currentIndex);
            var maxChildValue = this.value(maxChildIndex);
            if (this.hasRightChild(currentIndex)
                && this.value(Heap.rightChildIndex(currentIndex)) > maxChildValue) {
                maxChildIndex = Heap.rightChildIndex(currentIndex);
                maxChildValue = this.value(maxChildIndex);
            }
            if (maxChildValue > this.value(currentIndex)) {
                this.swap(currentIndex, maxChildIndex);
                currentIndex = maxChildIndex;
            }
            else {
                break;
            }
        }
    };
    Heap.prototype.push = function (element, indexingValue) {
        this.array.push({ indexingValue: indexingValue, element: element });
        this.heapifyUp();
    };
    Heap.prototype.pop = function () {
        var value = this.peek();
        this.array[0] = this.array[this.size - 1];
        this.array.pop();
        this.heapifyDown();
        return value;
    };
    Heap.prototype.swap = function (index1, index2) {
        var temp = this.array[index2];
        this.array[index2] = this.array[index1];
        this.array[index1] = temp;
    };
    Heap.prototype.hasLeftChild = function (index) {
        return Heap.leftChildIndex(index) < this.size;
    };
    Heap.prototype.hasRightChild = function (index) {
        return Heap.rightChildIndex(index) < this.size;
    };
    Heap.leftChildIndex = function (parentIndex) {
        return parentIndex * 2 + 1;
    };
    Heap.rightChildIndex = function (parentIndex) {
        return parentIndex * 2 + 2;
    };
    Heap.parentIndex = function (childIndex) {
        return Math.floor((childIndex - 1) / 2);
    };
    return Heap;
}());
exports.Heap = Heap;
var QueueNode = /** @class */ (function () {
    function QueueNode(value) {
        this.value = value;
        this.previous = null;
        this.next = null;
    }
    return QueueNode;
}());
var Queue = /** @class */ (function () {
    function Queue() {
        this.head = null;
        this.tail = null;
    }
    Object.defineProperty(Queue.prototype, "isEmpty", {
        get: function () {
            return this.head === null;
        },
        enumerable: false,
        configurable: true
    });
    Queue.prototype.enqueue = function (element) {
        var newNode = new QueueNode(element);
        newNode.next = this.tail;
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.previous = newNode;
            this.tail = newNode;
        }
    };
    Queue.prototype.dequeue = function () {
        if (!this.head || !this.tail) {
            return null;
        }
        var node = this.head;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return node.value;
        }
        this.head = node.previous;
        this.head.next = null;
        return node.value;
    };
    return Queue;
}());
var rateLimit = function (_a) {
    var _b = _a.callsPerMinute, callsPerMinute = _b === void 0 ? 60 : _b, fn = _a.fn;
    var queue = new Queue();
    var idle = true;
    var dequeueAfterTimeout = function () {
        var functionQueued = queue.dequeue();
        setTimeout(function () {
            functionQueued();
            if (queue.isEmpty) {
                idle = true;
            }
            else {
                dequeueAfterTimeout();
            }
        }, 60000 / callsPerMinute);
    };
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve) {
            queue.enqueue(function () { return resolve(fn.apply(void 0, args)); });
            if (idle) {
                idle = false;
                dequeueAfterTimeout();
            }
        });
    };
};
exports.rateLimit = rateLimit;
var beginningOfYear = function () {
    var currentYear = (new Date()).getFullYear().toString();
    return new Date(currentYear);
};
exports.beginningOfYear = beginningOfYear;
