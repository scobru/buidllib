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
var utils_1 = require("ethers/lib/utils");
describe("MetaContractChecker", function () {
    var _this = this;
    var metaContract;
    var erc20Token;
    var erc721Token;
    var erc1155Token;
    var provider = hardhat_1.ethers.provider;
    var setup = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, owner, other, MetaContractCheckerFactory, MockERC20Factory, MockERC721Factory, MockERC1155Factory;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    _a = _b.sent(), owner = _a[0], other = _a[1];
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MetaContractChecker")];
                case 2:
                    MetaContractCheckerFactory = _b.sent();
                    return [4 /*yield*/, MetaContractCheckerFactory.deploy()];
                case 3:
                    metaContract = _b.sent();
                    return [4 /*yield*/, metaContract.deployed()];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MockERC20")];
                case 5:
                    MockERC20Factory = _b.sent();
                    return [4 /*yield*/, MockERC20Factory.deploy(owner.address, hardhat_1.ethers.utils.parseEther('1000'))];
                case 6:
                    erc20Token = _b.sent();
                    return [4 /*yield*/, erc20Token.deployed()];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MockERC721")];
                case 8:
                    MockERC721Factory = _b.sent();
                    return [4 /*yield*/, MockERC721Factory.deploy()];
                case 9:
                    erc721Token = _b.sent();
                    return [4 /*yield*/, erc721Token.deployed()];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, erc721Token.mint(owner.address, 1)];
                case 11:
                    _b.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MockERC1155")];
                case 12:
                    MockERC1155Factory = _b.sent();
                    return [4 /*yield*/, MockERC1155Factory.deploy()];
                case 13:
                    erc1155Token = _b.sent();
                    return [4 /*yield*/, erc1155Token.deployed()];
                case 14:
                    _b.sent();
                    return [4 /*yield*/, erc1155Token.mint(owner.address, 1, utils_1.parseEther('1000'), '0x')];
                case 15:
                    _b.sent();
                    return [2 /*return*/, { owner: owner, other: other, metaContract: metaContract, erc20Token: erc20Token, erc721Token: erc721Token, erc1155Token: erc1155Token }];
            }
        });
    }); };
    it("should execute function on target contract with ERC20 check", function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, owner, metaContract, erc20Token, MockContractFactory, targetContract, transferAmount, value, txData, result, newValue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, setup()];
                    case 1:
                        _a = _b.sent(), owner = _a.owner, metaContract = _a.metaContract, erc20Token = _a.erc20Token;
                        return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MockTargetContract")];
                    case 2:
                        MockContractFactory = _b.sent();
                        return [4 /*yield*/, MockContractFactory.deploy()];
                    case 3:
                        targetContract = _b.sent();
                        return [4 /*yield*/, targetContract.deployed()];
                    case 4:
                        _b.sent();
                        transferAmount = hardhat_1.ethers.utils.parseEther("50");
                        return [4 /*yield*/, erc20Token.transfer(targetContract.address, transferAmount)];
                    case 5:
                        _b.sent();
                        value = 42;
                        txData = targetContract.interface.encodeFunctionData("setValue", [value]);
                        return [4 /*yield*/, metaContract
                                .connect(owner)
                                .executeFunction20Check(targetContract.address, txData, erc20Token.address, owner.address, transferAmount)];
                    case 6:
                        result = _b.sent();
                        return [4 /*yield*/, targetContract.getValue()];
                    case 7:
                        newValue = _b.sent();
                        chai_1.expect(newValue).to.equal(value);
                        // Check the execution result is not equal to null
                        chai_1.expect(result).to.not.equal(null);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should execute function on target contract with ERC721 check", function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, owner, metaContract, erc721Token, MockContractFactory, targetContract, value, txData, result, newValue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, setup()];
                    case 1:
                        _a = _b.sent(), owner = _a.owner, metaContract = _a.metaContract, erc721Token = _a.erc721Token;
                        return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MockTargetContract")];
                    case 2:
                        MockContractFactory = _b.sent();
                        return [4 /*yield*/, MockContractFactory.deploy()];
                    case 3:
                        targetContract = _b.sent();
                        return [4 /*yield*/, targetContract.deployed()];
                    case 4:
                        _b.sent();
                        value = 42;
                        txData = targetContract.interface.encodeFunctionData("setValue", [value]);
                        return [4 /*yield*/, metaContract
                                .connect(owner)
                                .executeFunction721Check(targetContract.address, txData, erc721Token.address, owner.address, 1)];
                    case 5:
                        result = _b.sent();
                        return [4 /*yield*/, targetContract.getValue()];
                    case 6:
                        newValue = _b.sent();
                        chai_1.expect(newValue).to.equal(value);
                        // Check the execution result is not equal to null
                        chai_1.expect(result).to.not.equal(null);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should execute function on target contract with ERC1155 check", function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, owner, metaContract, erc1155Token, MockContractFactory, targetContract, value, txData, result, newValue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, setup()];
                    case 1:
                        _a = _b.sent(), owner = _a.owner, metaContract = _a.metaContract, erc1155Token = _a.erc1155Token;
                        return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MockTargetContract")];
                    case 2:
                        MockContractFactory = _b.sent();
                        return [4 /*yield*/, MockContractFactory.deploy()];
                    case 3:
                        targetContract = _b.sent();
                        return [4 /*yield*/, targetContract.deployed()];
                    case 4:
                        _b.sent();
                        value = 42;
                        txData = targetContract.interface.encodeFunctionData("setValue", [value]);
                        return [4 /*yield*/, metaContract
                                .connect(owner)
                                .executeFunction1155Check(targetContract.address, txData, erc1155Token.address, 1, owner.address, utils_1.parseEther("1"))];
                    case 5:
                        result = _b.sent();
                        return [4 /*yield*/, targetContract.getValue()];
                    case 6:
                        newValue = _b.sent();
                        chai_1.expect(newValue).to.equal(value);
                        // Check the execution result is not equal to null
                        chai_1.expect(result).to.not.equal(null);
                        return [2 /*return*/];
                }
            });
        });
    });
});
