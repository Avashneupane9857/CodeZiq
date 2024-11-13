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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Judge0_Exec = void 0;
const Judge0_Exec = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, language } = req.body;
    console.log(code);
    if (!code) {
        res.status(200).json({ msg: "Run with some code bro" });
    }
    try {
        const output = "hello world";
        res.status(200).json({
            msg: "Code reached i think",
            lang: language,
            output: output
        });
        return;
    }
    catch (e) {
        res.status(400).json({ msg: "Some error in catch block now" });
        return;
    }
});
exports.Judge0_Exec = Judge0_Exec;
