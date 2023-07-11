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
describe('Treasury', function () {
    var provider = hardhat_1.ethers.provider;
    var setup = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, signer, other, Token, token, Treasury, treasury;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    _a = _b.sent(), signer = _a[0], other = _a[1];
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('MockERC20')];
                case 2:
                    Token = _b.sent();
                    return [4 /*yield*/, Token.deploy(signer.address, hardhat_1.ethers.utils.parseEther('1000'))];
                case 3:
                    token = _b.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Treasury')];
                case 4:
                    Treasury = _b.sent();
                    return [4 /*yield*/, Treasury.deploy()];
                case 5:
                    treasury = _b.sent();
                    return [2 /*return*/, { signer: signer, other: other, token: token, treasury: treasury }];
            }
        });
    }); };
    it('receives ETH correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, signer, treasury, value, balanceBefore, balanceAfter;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setup()];
                case 1:
                    _a = _b.sent(), signer = _a.signer, treasury = _a.treasury;
                    value = 10000000000;
                    return [4 /*yield*/, provider.getBalance(treasury.address)];
                case 2:
                    balanceBefore = _b.sent();
                    return [4 /*yield*/, signer.sendTransaction({ to: treasury.address, value: value })];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, provider.getBalance(treasury.address)];
                case 4:
                    balanceAfter = _b.sent();
                    chai_1.expect(balanceBefore).to.equal(0);
                    chai_1.expect(balanceAfter).to.equal(value);
                    return [2 /*return*/];
            }
        });
    }); });
    it('owner can send ETH correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, signer, other, treasury, value, balanceBefore, balanceAfter;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setup()];
                case 1:
                    _a = _b.sent(), signer = _a.signer, other = _a.other, treasury = _a.treasury;
                    value = 10000000000;
                    return [4 /*yield*/, signer.sendTransaction({ to: treasury.address, value: value })];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, provider.getBalance(other.address)];
                case 3:
                    balanceBefore = _b.sent();
                    return [4 /*yield*/, treasury.withdrawNative(other.address, value)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, provider.getBalance(other.address)];
                case 5:
                    balanceAfter = _b.sent();
                    chai_1.expect(balanceAfter).to.equal(balanceBefore.add(value));
                    return [2 /*return*/];
            }
        });
    }); });
    it("other account can't send ETH", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, other, treasury, tx;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setup()];
                case 1:
                    _a = _b.sent(), other = _a.other, treasury = _a.treasury;
                    tx = treasury.connect(other).withdrawNative(other.address, 0);
                    return [4 /*yield*/, chai_1.expect(tx).to.be.revertedWith('Ownable: caller is not the owner')];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('receives ERC20 correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, token, treasury, value, balanceBefore, balanceAfter;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setup()];
                case 1:
                    _a = _b.sent(), token = _a.token, treasury = _a.treasury;
                    value = 1000;
                    return [4 /*yield*/, token.balanceOf(treasury.address)];
                case 2:
                    balanceBefore = _b.sent();
                    return [4 /*yield*/, token.transfer(treasury.address, value)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, token.balanceOf(treasury.address)];
                case 4:
                    balanceAfter = _b.sent();
                    chai_1.expect(balanceAfter).to.equal(balanceBefore.add(value));
                    return [2 /*return*/];
            }
        });
    }); });
    it('owner can send ERC20 correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, signer, token, treasury, value, balanceBefore, balanceAfter;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setup()];
                case 1:
                    _a = _b.sent(), signer = _a.signer, token = _a.token, treasury = _a.treasury;
                    value = 1000;
                    return [4 /*yield*/, token.transfer(treasury.address, value)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, token.balanceOf(signer.address)];
                case 3:
                    balanceBefore = _b.sent();
                    return [4 /*yield*/, treasury.withdrawTokens(token.address, signer.address, value)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, token.balanceOf(signer.address)];
                case 5:
                    balanceAfter = _b.sent();
                    chai_1.expect(balanceAfter).to.equal(balanceBefore.add(value));
                    return [2 /*return*/];
            }
        });
    }); });
    it("other account can't send ERC20", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, other, token, treasury, tx;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setup()];
                case 1:
                    _a = _b.sent(), other = _a.other, token = _a.token, treasury = _a.treasury;
                    tx = treasury
                        .connect(other)
                        .withdrawTokens(token.address, other.address, 0);
                    return [4 /*yield*/, chai_1.expect(tx).to.be.revertedWith('Ownable: caller is not the owner')];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
