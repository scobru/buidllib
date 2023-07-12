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
describe("Factory", function () {
    var _this = this;
    var setup = function () { return __awaiter(_this, void 0, void 0, function () {
        var Factory, SimpleStorage, _a, owner, addr1, factory, simpleStorage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MockFactory")];
                case 1:
                    Factory = _b.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MockTargetContract")];
                case 2:
                    SimpleStorage = _b.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 3:
                    _a = _b.sent(), owner = _a[0], addr1 = _a[1];
                    return [4 /*yield*/, Factory.deploy(owner.address)];
                case 4:
                    factory = _b.sent();
                    return [4 /*yield*/, factory.deployed()];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, SimpleStorage.deploy()];
                case 6:
                    simpleStorage = _b.sent();
                    return [4 /*yield*/, simpleStorage.deployed()];
                case 7:
                    _b.sent();
                    return [2 /*return*/, { owner: owner, addr1: addr1, factory: factory, simpleStorage: simpleStorage }];
            }
        });
    }); };
    it("Should correctly create a new contract", function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, factory, owner, contracts;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, setup()];
                    case 1:
                        _a = _b.sent(), factory = _a.factory, owner = _a.owner;
                        return [4 /*yield*/, factory.createContract(owner.address)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, factory.getContracts()];
                    case 3:
                        contracts = _b.sent();
                        chai_1.expect(contracts.length).to.equal(1);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should allow the owner to deactivate and activate a contract", function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, factory, owner, contracts, contractAddress, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, setup()];
                    case 1:
                        _a = _d.sent(), factory = _a.factory, owner = _a.owner;
                        return [4 /*yield*/, factory.createContract(owner.address)];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, factory.getContracts()];
                    case 3:
                        contracts = _d.sent();
                        contractAddress = contracts[0];
                        return [4 /*yield*/, factory.deactivateContract(contractAddress)];
                    case 4:
                        _d.sent();
                        _b = chai_1.expect;
                        return [4 /*yield*/, factory.isContractCreated(contractAddress)];
                    case 5:
                        _b.apply(void 0, [_d.sent()]).to.equal(false);
                        return [4 /*yield*/, factory.activateContract(contractAddress)];
                    case 6:
                        _d.sent();
                        _c = chai_1.expect;
                        return [4 /*yield*/, factory.isContractCreated(contractAddress)];
                    case 7:
                        _c.apply(void 0, [_d.sent()]).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should revert if non-owner tries to deactivate or activate a contract", function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, factory, owner, addr1, contracts, contractAddress, factoryFromAddr1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, setup()];
                    case 1:
                        _a = _b.sent(), factory = _a.factory, owner = _a.owner, addr1 = _a.addr1;
                        return [4 /*yield*/, factory.createContract(owner.address)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, factory.getContracts()];
                    case 3:
                        contracts = _b.sent();
                        contractAddress = contracts[0];
                        factoryFromAddr1 = factory.connect(addr1);
                        return [4 /*yield*/, chai_1.expect(factoryFromAddr1.deactivateContract(contractAddress)).to.be.revertedWith("Ownable: caller is not the owner")];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, chai_1.expect(factoryFromAddr1.activateContract(contractAddress)).to.be.revertedWith("Ownable: caller is not the owner")];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
