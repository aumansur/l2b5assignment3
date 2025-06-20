"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("./app/controllers/book.controllers");
const borrow_controllers_1 = require("./app/controllers/borrow.controllers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("welcome to book library app");
});
app.use(express_1.default.json());
app.use("/api", book_controllers_1.booksRouter);
app.use("/api", borrow_controllers_1.borrowRouter);
// Handle 404 Not Found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "page Not Found",
        error: "The requested resource could not be found",
    });
    next();
});
//global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
    });
    next();
});
exports.default = app;
