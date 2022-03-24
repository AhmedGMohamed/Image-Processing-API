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
var fs_1 = __importDefault(require("fs"));
var fs_2 = require("fs");
var path_1 = __importDefault(require("path"));
var resizer_1 = require("../../modules/resizer");
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
     * @param {number} imgWidth
     * @param {number} imgHeight
     **/
    var resize = function (fileName, imgWidth, imgHeight) {
        //Checks if the user gave a file name exists in the images folder
        fs_1.default.access("".concat(path_1.default.resolve(), "\\src\\images\\").concat(fileName, ".jpg"), fs_1.default.constants.R_OK | fs_1.default.constants.W_OK, function (err) { return __awaiter(void 0, void 0, void 0, function () {
            var filePath_1, filePath_2, filePath_3;
            return __generator(this, function (_a) {
                if (err) {
                    //Sends an error to the user telling them to provide a correct file name
                    res
                        .status(400)
                        .send("Wrong filename given, please Input a valid filename using (name={fileName})" +
                        " where {fileName} is the name of your file without the extension");
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
                    //Checks if the file name, width and height are all present in the query and with the correct values
                    if (typeof fileName === "string" &&
                        !isNaN(imgWidth) &&
                        imgWidth > 0 &&
                        !isNaN(imgHeight) &&
                        imgHeight > 0) {
                        filePath_1 = "".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-").concat(imgWidth, "x").concat(imgHeight, ".jpg");
                        /**
                         * Checks if the image is already processed and is in the cache folder, if it's
                         * in the cache it sends it to the user, otherwise it starts the resizing process.
                         */
                        fs_1.default.access(filePath_1, fs_1.default.constants.R_OK | fs_1.default.constants.W_OK, function (err) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 2];
                                        //Calls the function that does the resizing using the file name, width & height
                                        return [4 /*yield*/, (0, resizer_1.resizerWidthHeight)(fileName, imgWidth, imgHeight)];
                                    case 1:
                                        //Calls the function that does the resizing using the file name, width & height
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        //Sending back the processed image to the user
                                        res.sendFile(filePath_1);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    else if (
                    //Checks if the file name and width only are present in the query
                    typeof fileName === "string" &&
                        !isNaN(imgWidth) &&
                        imgWidth > 0 &&
                        isNaN(imgHeight)) {
                        filePath_2 = "".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-").concat(imgWidth, "x_.jpg");
                        /**
                         * Checks if the image is already processed and is in the cache, if it's in the
                         * cache it sends it to the user, otherwise it starts the resizing process.
                         */
                        fs_1.default.access(filePath_2, fs_1.default.constants.R_OK | fs_1.default.constants.W_OK, function (err) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 2];
                                        //calling the function that does the resizing with the file name and width only
                                        return [4 /*yield*/, (0, resizer_1.resizerWidth)(fileName, imgWidth)];
                                    case 1:
                                        //calling the function that does the resizing with the file name and width only
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        //Sending back the processed image to the user
                                        res.sendFile(filePath_2);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    else if (
                    //checks if the file name and height only are present in the query
                    typeof fileName === "string" &&
                        isNaN(imgWidth) &&
                        !isNaN(imgHeight) &&
                        imgHeight > 0) {
                        filePath_3 = "".concat(path_1.default.resolve(), "\\cache\\").concat(fileName, "-_x").concat(imgHeight, ".jpg");
                        /**
                         * Checks if the image is already processed and is in the cache, if it's in the
                         * cache it sends it to the user, otherwise it starts the resizing process.
                         */
                        fs_1.default.access(filePath_3, fs_1.default.constants.R_OK | fs_1.default.constants.W_OK, function (err) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 2];
                                        //calling the function that does the resizing with the file name and height
                                        return [4 /*yield*/, (0, resizer_1.resizerHeight)(fileName, imgHeight)];
                                    case 1:
                                        //calling the function that does the resizing with the file name and height
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        //Sending back the processed image to the user
                                        res.sendFile(filePath_3);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    else if (imgWidth <= 0 || imgHeight <= 0) {
                        //Checks if the user provided invalid width and height inputs
                        switch (imgWidth <= 0 //Checks if the width was the invalid input, if it is, report to the user that the width is invalid, otherwise the height is invalid
                        ) {
                            case true:
                                res
                                    .status(400)
                                    .send("Invalid width given, please include a width higher than zero.");
                                break;
                            case false:
                                res
                                    .status(400)
                                    .send("Invalid height given, please include a height higher than zero.");
                                break;
                            default:
                                res.status(400).send("Unknown error");
                                break;
                        }
                    }
                    else {
                        //sends a respond to the user stating that some query inputs are missing
                        res
                            .status(400)
                            .send('Incorrect query parameters, Please include the file name (using "name = {string}")' +
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
