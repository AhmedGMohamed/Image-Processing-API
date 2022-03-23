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
//importing the required libraries
var express_1 = __importDefault(require("express"));
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = __importDefault(require("fs"));
var fs_2 = require("fs");
var path_1 = __importDefault(require("path"));
var resizer = express_1.default.Router();
resizer.get("/", function (req, res) {
    //storing the request query and getting the values
    var query = req.query;
    var imgName = query.name;
    var width = parseInt(query.width);
    var height = parseInt(query.height);
    /**
     * @description uses the sharp library to resize the image using user inputs
     * @param {string} fileName
     * @param {number} imgwidth
     * @param {number} imgheight
     **/
    var resize = function (fileName, imgwidth, imgheight) {
        //Checks if the given file name exists in the images folder
        fs_1.default.access("".concat(path_1.default.resolve(), "\\src\\images\\").concat(fileName, ".jpg"), fs_1.default.constants.R_OK | fs_1.default.constants.W_OK, function (err) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err) {
                    res.send("Wrong filename given, please Input a valid filename");
                }
                else {
                    /**
                     * Checks if the cache folder exists, if it does, it proceeds to
                     * the next step, if not it creates the folder.
                     **/
                    fs_1.default.access("".concat(path_1.default.resolve(), "\\cache\\"), fs_1.default.constants.R_OK | fs_1.default.constants.W_OK, function (err) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!err) return [3 /*break*/, 2];
                                    return [4 /*yield*/, fs_2.promises.mkdir("".concat(path_1.default.resolve(), "\\cache\\"))];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    //Checks if the file name, width and height are all present in the query
                    if (typeof fileName === "string" &&
                        !isNaN(imgwidth) &&
                        !isNaN(imgheight)) {
                        /**
                         * Checks if the image is already processed and is in the cache, if it's in the
                         * cache it sends it to the user, otherwise it starts the resizing process.
                         */
                        fs_1.default.access("".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-").concat(imgwidth, "x").concat(imgheight, ".jpg"), fs_1.default.constants.R_OK | fs_1.default.constants.W_OK, function (err) { return __awaiter(void 0, void 0, void 0, function () {
                            var data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 3];
                                        return [4 /*yield*/, (0, sharp_1.default)("".concat(path_1.default.resolve(), "\\src\\images\\").concat(fileName, ".jpg"))
                                                .resize({
                                                width: imgwidth,
                                                height: imgheight
                                            })
                                                .toBuffer()];
                                    case 1:
                                        data = _a.sent();
                                        //Creating a jpg file and storing the data from the buffer in it
                                        return [4 /*yield*/, fs_2.promises.writeFile("".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-").concat(imgwidth, "x").concat(imgheight, ".jpg"), data)];
                                    case 2:
                                        //Creating a jpg file and storing the data from the buffer in it
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        //Sending back the processed image to the user
                                        res.sendFile("".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-").concat(imgwidth, "x").concat(imgheight, ".jpg"));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    else if (
                    //Checks if the file name and width only are present in the query
                    typeof fileName === "string" &&
                        !isNaN(imgwidth) &&
                        isNaN(imgheight)) {
                        fs_1.default.access("".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-").concat(imgwidth, "x_.jpg"), fs_1.default.constants.R_OK | fs_1.default.constants.W_OK, function (err) { return __awaiter(void 0, void 0, void 0, function () {
                            var data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 3];
                                        return [4 /*yield*/, (0, sharp_1.default)("".concat(path_1.default.resolve(), "\\src\\images\\").concat(fileName, ".jpg"))
                                                .resize({ width: imgwidth })
                                                .toBuffer()];
                                    case 1:
                                        data = _a.sent();
                                        //Creating a jpg file and storing the data from the buffer in it
                                        return [4 /*yield*/, fs_2.promises.writeFile("".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-").concat(imgwidth, "x_.jpg"), data)];
                                    case 2:
                                        //Creating a jpg file and storing the data from the buffer in it
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        //Sending back the processed image to the user
                                        res.sendFile("".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-").concat(imgwidth, "x_.jpg"));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    else if (
                    //checks if the file name and height only are present in the query
                    typeof fileName === "string" &&
                        isNaN(imgwidth) &&
                        !isNaN(imgheight)) {
                        fs_1.default.access("".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-_x").concat(imgheight, ".jpg"), fs_1.default.constants.R_OK | fs_1.default.constants.W_OK, function (err) { return __awaiter(void 0, void 0, void 0, function () {
                            var data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 3];
                                        return [4 /*yield*/, (0, sharp_1.default)("".concat(path_1.default.resolve(), "\\src\\images\\").concat(fileName, ".jpg"))
                                                .resize({ height: imgheight })
                                                .toBuffer()];
                                    case 1:
                                        data = _a.sent();
                                        //Creating a jpg file and storing the data from the buffer in it
                                        return [4 /*yield*/, fs_2.promises.writeFile("".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-_x").concat(imgheight, ".jpg"), data)];
                                    case 2:
                                        //Creating a jpg file and storing the data from the buffer in it
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        //Sending back the processed image to the user
                                        res.sendFile("".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-_x").concat(imgheight, ".jpg"));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    else {
                        //sends a respond to the user stating that some query inputs are missing
                        res.send('Incorrect query parameters, Please include the file name (using "name = {string}")' +
                            '& either width (using "width={number}") or height (using "height={number}") or both.');
                    }
                }
                return [2 /*return*/];
            });
        }); });
    };
    resize(imgName, width, height);
});
exports.default = resizer;
