var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var ethers = require('hardhat').ethers;
var expect = require('chai').expect;
describe('TokenChecker', function () {
  var _this = this;
  var accounts, mockERC1155, mockERC20, mockERC721, tokenChecker;
  before(function () {
    return __awaiter(_this, void 0, void 0, function () {
      var MockERC1155, MockERC20, MockERC721, TokenChecker;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, ethers.getSigners()];
          case 1:
            accounts = _a.sent();
            return [4 /*yield*/, ethers.getContractFactory('MockERC20')];
          case 2:
            MockERC20 = _a.sent();
            return [
              4 /*yield*/,
              MockERC20.deploy(
                accounts[0].address,
                ethers.utils.parseEther('1000')
              ),
            ];
          case 3:
            mockERC20 = _a.sent();
            return [4 /*yield*/, ethers.getContractFactory('MockERC721')];
          case 4:
            MockERC721 = _a.sent();
            return [4 /*yield*/, MockERC721.deploy()];
          case 5:
            mockERC721 = _a.sent();
            return [4 /*yield*/, mockERC721.mint(accounts[0].address, 1)];
          case 6:
            _a.sent();
            return [4 /*yield*/, ethers.getContractFactory('MockERC1155')];
          case 7:
            MockERC1155 = _a.sent();
            return [4 /*yield*/, MockERC1155.deploy()];
          case 8:
            mockERC1155 = _a.sent();
            return [
              4 /*yield*/,
              mockERC1155.mint(accounts[0].address, 1, 1000, '0x'),
            ];
          case 9:
            _a.sent();
            return [4 /*yield*/, ethers.getContractFactory('TokenChecker')];
          case 10:
            TokenChecker = _a.sent();
            return [4 /*yield*/, TokenChecker.deploy()];
          case 11:
            tokenChecker = _a.sent();
            return [2 /*return*/];
        }
      });
    });
  });
  it('Should return true if the user has enough ERC20 tokens', function () {
    return __awaiter(this, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              tokenChecker.userHasERC20(
                mockERC20.address,
                accounts[0].address,
                ethers.utils.parseEther('1')
              ),
            ];
          case 1:
            result = _a.sent();
            expect(result).to.equal(true);
            return [2 /*return*/];
        }
      });
    });
  });
  it('Should return false if the user does not have enough ERC20 tokens', function () {
    return __awaiter(this, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              tokenChecker.userHasERC20(
                mockERC20.address,
                accounts[0].address,
                ethers.utils.parseEther('2000')
              ),
            ];
          case 1:
            result = _a.sent();
            expect(result).to.equal(false);
            return [2 /*return*/];
        }
      });
    });
  });
  it('Should return true if the user owns the ERC721 token', function () {
    return __awaiter(this, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              tokenChecker.userOwnsERC721(
                mockERC721.address,
                1,
                accounts[0].address
              ),
            ];
          case 1:
            result = _a.sent();
            expect(result).to.equal(true);
            return [2 /*return*/];
        }
      });
    });
  });
  it('Should return true if the user has enough ERC721 tokens', function () {
    return __awaiter(this, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              tokenChecker.userHasERC721(
                mockERC721.address,
                accounts[0].address,
                1
              ),
            ];
          case 1:
            result = _a.sent();
            expect(result).to.equal(true);
            return [2 /*return*/];
        }
      });
    });
  });
  it('Should return true if the user has enough ERC1155 tokens', function () {
    return __awaiter(this, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              tokenChecker.userHasERC1155(
                mockERC1155.address,
                1,
                accounts[0].address,
                1
              ),
            ];
          case 1:
            result = _a.sent();
            expect(result).to.equal(true);
            return [2 /*return*/];
        }
      });
    });
  });
  it('Should return false if the user does not have enough ERC1155 tokens', function () {
    return __awaiter(this, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              tokenChecker.userHasERC1155(
                mockERC1155.address,
                1,
                accounts[0].address,
                2000
              ),
            ];
          case 1:
            result = _a.sent();
            expect(result).to.equal(false);
            return [2 /*return*/];
        }
      });
    });
  });
});
