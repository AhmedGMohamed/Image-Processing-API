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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizerHeight = exports.resizerWidth = exports.resizerWidthHeight = void 0;
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
/**
 * @description functions using the sharp library to resize the image using width & height
 * and storing the data in a buffer
 * @param {string} fileName
 * @param {number} imgWidth
 * @param {number} imgHeight
 * @return {Promise<void>}
 */
function resizerWidthHeight(fileName, imgWidth, imgHeight) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, sharp_1.default)("".concat(path_1.default.resolve(), "\\src\\images\\").concat(fileName, ".jpg"))
                        .resize({ width: imgWidth, height: imgHeight })
                        .toBuffer()];
                case 1:
                    data = _a.sent();
                    //Creating a jpg file and storing the data from the buffer in it
                    return [4 /*yield*/, fs_1.promises.writeFile("".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-").concat(imgWidth, "x").concat(imgHeight, ".jpg"), data)];
                case 2:
                    //Creating a jpg file and storing the data from the buffer in it
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.resizerWidthHeight = resizerWidthHeight;
/**
 * @description function using the sharp library to resize the image using width only
 * and storing the data in a buffer
 * @param {string} fileName
 * @param {number} imgWidth
 * @return {Promise<void>}
 */
function resizerWidth(fileName, imgWidth) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, sharp_1.default)("".concat(path_1.default.resolve(), "\\src\\images\\").concat(fileName, ".jpg"))
                        .resize({ width: imgWidth })
                        .toBuffer()];
                case 1:
                    data = _a.sent();
                    //Creating a jpg file and storing the data from the buffer in it
                    return [4 /*yield*/, fs_1.promises.writeFile("".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-").concat(imgWidth, "x_.jpg"), data)];
                case 2:
                    //Creating a jpg file and storing the data from the buffer in it
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.resizerWidth = resizerWidth;
/**
 * @description functions using the sharp library to resize the image using height only
 * and storing the data in a buffer
 * @param {string} fileName
 * @param {number} imgHeight
 * @return {Promise<void>}
 */
function resizerHeight(fileName, imgHeight) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, sharp_1.default)("".concat(path_1.default.resolve(), "\\src\\images\\").concat(fileName, ".jpg"))
                        .resize({ height: imgHeight })
                        .toBuffer()];
                case 1:
                    data = _a.sent();
                    //Creating a jpg file and storing the data from the buffer in it
                    return [4 /*yield*/, fs_1.promises.writeFile("".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-_x").concat(imgHeight, ".jpg"), data)];
                case 2:
                    //Creating a jpg file and storing the data from the buffer in it
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.resizerHeight = resizerHeight;