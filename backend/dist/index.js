"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*

build simple backend yesma req body aaucha code and langugage tei J0 ko API mah forward garney ani jun
response aaucha tei with status code send garney and or kei response aaye pani output dine ani teslai frontend bata output section mah fetch garcha
*/
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Judge0_Exec_1 = require("./Judge0_Exec");
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config({});
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.json({
        msg: "Server is healthy"
    });
});
app.post("/judge0", Judge0_Exec_1.Judge0_Exec);
app.listen(port, () => {
    console.log("Seerv is lstn in port ", port);
});
