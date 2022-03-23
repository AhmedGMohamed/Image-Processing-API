"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var app = (0, express_1.default)();
var port = 8080;
app.get("/", function (req, res) {
    res.send("Main page visited");
});
app.use("/api", index_1.default);
//starts the server on the specified port
app.listen(port, function () {
    console.log("Server started at localhost:".concat(port));
});
exports.default = app;
