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
var provider = hardhat_1.ethers.provider;
describe('FeeManager', function () {
    var initialSupply = hardhat_1.ethers.utils.parseEther('1000');
    var feePercentage = 1000; // 10%
    var setup = function (mode) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, signer, other, Token, token, FeeManager, feeManager;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    _a = _b.sent(), signer = _a[0], other = _a[1];
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('MockERC20')];
                case 2:
                    Token = _b.sent();
                    return [4 /*yield*/, Token.deploy(signer.address, initialSupply)];
                case 3:
                    token = _b.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('FeeManager')];
                case 4:
                    FeeManager = _b.sent();
                    if (!(mode == 'native')) return [3 /*break*/, 7];
                    return [4 /*yield*/, FeeManager.deploy(hardhat_1.ethers.constants.AddressZero, signer.address, feePercentage)];
                case 5:
                    feeManager = _b.sent();
                    return [4 /*yield*/, feeManager.deployed()];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 7:
                    if (!(mode == 'erc20')) return [3 /*break*/, 10];
                    return [4 /*yield*/, FeeManager.deploy(token.address, signer.address, feePercentage)];
                case 8:
                    feeManager = _b.sent();
                    return [4 /*yield*/, feeManager.deployed()];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [2 /*return*/, { signer: signer, other: other, token: token, feeManager: feeManager }];
            }
        });
    }); };
    it('pays native fee correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, signer, other, feeManager, initialBalance, initialBalanceSigner, tx, txReceipt, gasUsed, fee, amountSubFee, expectedBalance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, setup('native')];
                case 1:
                    _a = _d.sent(), signer = _a.signer, other = _a.other, feeManager = _a.feeManager;
                    return [4 /*yield*/, provider.getBalance(other.address)];
                case 2:
                    initialBalance = _d.sent();
                    return [4 /*yield*/, provider.getBalance(signer.address)];
                case 3:
                    initialBalanceSigner = _d.sent();
                    return [4 /*yield*/, feeManager.connect(other).payNativeFee({ value: hardhat_1.ethers.utils.parseEther('1') })];
                case 4:
                    tx = _d.sent();
                    return [4 /*yield*/, tx.wait()];
                case 5:
                    txReceipt = _d.sent();
                    gasUsed = txReceipt.gasUsed.mul(tx.gasPrice);
                    fee = hardhat_1.ethers.utils.parseEther('1').mul(feePercentage).div(10000);
                    amountSubFee = Number(hardhat_1.ethers.utils.parseEther('1')) * feePercentage / 10000;
                    expectedBalance = initialBalance.sub(hardhat_1.ethers.utils.parseEther('1')).sub(gasUsed);
                    _b = chai_1.expect;
                    return [4 /*yield*/, provider.getBalance(other.address)];
                case 6:
                    _b.apply(void 0, [_d.sent()]).to.equal(expectedBalance);
                    // Check feeRecipient's balance
                    _c = chai_1.expect;
                    return [4 /*yield*/, provider.getBalance(signer.address)];
                case 7:
                    // Check feeRecipient's balance
                    _c.apply(void 0, [_d.sent()]).to.equal(String(initialBalanceSigner.add(String(amountSubFee))));
                    return [2 /*return*/];
            }
        });
    }); });
    it('pays ERC20 fee correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, signer, other, token, feeManager, initialBalance, feeAmount, fee, expectedBalance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, setup('erc20')];
                case 1:
                    _a = _d.sent(), signer = _a.signer, other = _a.other, token = _a.token, feeManager = _a.feeManager;
                    return [4 /*yield*/, token.balanceOf(signer.address)];
                case 2:
                    initialBalance = _d.sent();
                    return [4 /*yield*/, token.transfer(other.address, initialBalance)];
                case 3:
                    _d.sent();
                    feeAmount = hardhat_1.ethers.utils.parseEther('2');
                    return [4 /*yield*/, token.connect(other).approve(feeManager.address, feeAmount)];
                case 4:
                    _d.sent();
                    // Other pays ERC20 fee
                    return [4 /*yield*/, feeManager.connect(other).payERC20Fee(feeAmount)];
                case 5:
                    // Other pays ERC20 fee
                    _d.sent();
                    fee = feeAmount.mul(feePercentage).div(10000);
                    expectedBalance = initialBalance.sub(fee);
                    _b = chai_1.expect;
                    return [4 /*yield*/, token.balanceOf(other.address)];
                case 6:
                    _b.apply(void 0, [_d.sent()]).to.equal(expectedBalance);
                    // Check feeRecipient's balance
                    _c = chai_1.expect;
                    return [4 /*yield*/, token.balanceOf(signer.address)];
                case 7:
                    // Check feeRecipient's balance
                    _c.apply(void 0, [_d.sent()]).to.equal(fee);
                    return [2 /*return*/];
            }
        });
    }); });
});
