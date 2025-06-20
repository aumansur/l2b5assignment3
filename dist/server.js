"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const post = 5000;
const boststrap = () => {
    app_1.default.listen(post, () => {
        console.log(`Server running on port ${post}`);
    });
};
