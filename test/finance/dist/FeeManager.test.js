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
exports.__esModule = true;
var hardhat_1 = require("hardhat");
var chai_1 = require("chai");
describe("FeeManager", function () {
    var _this = this;
    var accounts;
    var feeManager;
    var mockERC20;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var MockERC20, MockConcreteFeeManager;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    accounts = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MockERC20")];
                case 2:
                    MockERC20 = _a.sent();
                    return [4 /*yield*/, MockERC20.deploy(accounts[0].address, hardhat_1.ethers.utils.parseEther("1000"))];
                case 3:
                    mockERC20 = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MockConcreteFeeManager")];
                case 4:
                    MockConcreteFeeManager = _a.sent();
                    return [4 /*yield*/, MockConcreteFeeManager.deploy(mockERC20.address, hardhat_1.ethers.utils.parseEther("0.01"), hardhat_1.ethers.utils.parseEther("0.01"), accounts[1].address)];
                case 5:
                    feeManager = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should pay ERC20 fee", function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mockERC20.approve(feeManager.address, hardhat_1.ethers.utils.parseEther("0.01"))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, chai_1.expect(feeManager.triggerERC20Fee()).to.emit(feeManager, "ERC20FeePaid")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should pay native fee", function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chai_1.expect(function () { return feeManager.triggerNativeFee({ value: hardhat_1.ethers.utils.parseEther("0.01") }); }).to.changeEtherBalance(accounts[1], hardhat_1.ethers.utils.parseEther("0.01"))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, chai_1.expect(feeManager.triggerNativeFee({ value: hardhat_1.ethers.utils.parseEther("0.01") })).to.emit(feeManager, "NativeFeePaid")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
