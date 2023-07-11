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
describe("MetaContract", function () {
    var _this = this;
    var metaContract;
    var targetContract;
    var provider = hardhat_1.ethers.provider;
    var setup = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, signer, other, MetaContractFactory, TargetContractMockFactory;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    _a = _b.sent(), signer = _a[0], other = _a[1];
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MetaContract")];
                case 2:
                    MetaContractFactory = _b.sent();
                    return [4 /*yield*/, MetaContractFactory.deploy()];
                case 3:
                    metaContract = _b.sent();
                    return [4 /*yield*/, metaContract.deployed()];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("MockTargetContract")];
                case 5:
                    TargetContractMockFactory = _b.sent();
                    return [4 /*yield*/, TargetContractMockFactory.deploy()];
                case 6:
                    targetContract = _b.sent();
                    return [4 /*yield*/, targetContract.deployed()];
                case 7:
                    _b.sent();
                    return [2 /*return*/, { signer: signer, other: other, metaContract: metaContract, targetContract: targetContract }];
            }
        });
    }); };
    it("should execute function on target contract", function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, signer, metaContract, targetContract, value, txData, result, newValue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, setup()];
                    case 1:
                        _a = _b.sent(), signer = _a.signer, metaContract = _a.metaContract, targetContract = _a.targetContract;
                        value = 42;
                        txData = targetContract.interface.encodeFunctionData("setValue", [value]);
                        return [4 /*yield*/, metaContract.executeFunction(targetContract.address, txData)];
                    case 2:
                        result = _b.sent();
                        return [4 /*yield*/, targetContract.getValue()];
                    case 3:
                        newValue = _b.sent();
                        chai_1.expect(newValue).to.equal(value);
                        chai_1.expect(result).to.not.equal(null);
                        return [2 /*return*/];
                }
            });
        });
    });
});
