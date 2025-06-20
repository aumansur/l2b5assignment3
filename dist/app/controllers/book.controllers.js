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
exports.booksRouter = void 0;
const express_1 = require("express");
const book_model_1 = require("../model/book.model");
exports.booksRouter = (0, express_1.Router)();
exports.booksRouter.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //tryCatch block to handle errors
    try {
        const body = req.body;
        const book = new book_model_1.Book(body);
        yield book.save();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating book",
            error: error,
        });
    }
}));
exports.booksRouter.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const sortOption = {};
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        if (sortBy) {
            sortOption[sortBy] = sort === "desc" ? -1 : 1;
        }
        const limitValue = limit ? parseInt(limit) : 10;
        const books = yield book_model_1.Book.find(query).sort(sortOption).limit(limitValue);
        res.status(201).json({
            success: true,
            message: "Books retrieved  successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving books",
            error: error,
        });
    }
}));
exports.booksRouter.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findById(bookId);
        res.status(201).json({
            success: true,
            message: "Book retrieved  successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving book",
            error: error,
        });
    }
}));
exports.booksRouter.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, body, { new: true });
        res.status(201).json({
            success: true,
            message: "Book updated   successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating book",
            error: error,
        });
    }
}));
exports.booksRouter.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: "Book Deleted  successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting book",
            error: error,
        });
    }
}));
