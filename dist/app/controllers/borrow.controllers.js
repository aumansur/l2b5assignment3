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
exports.borrowRouter = void 0;
const express_1 = require("express");
const borrow_model_1 = require("../model/borrow.model");
const book_model_1 = require("../model/book.model");
exports.borrowRouter = (0, express_1.Router)();
exports.borrowRouter.post("/borrows", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const foundBook = yield book_model_1.Book.findById(book);
        if (!foundBook) {
            res.status(404).json({ success: false, message: "Book not found" });
            return;
        }
        if (foundBook.copies < quantity) {
            res
                .status(400)
                .json({ success: false, message: "Not enough copies available" });
            return;
        }
        const borrow = new borrow_model_1.Borrow({ book, quantity, dueDate });
        yield borrow.save();
        yield book_model_1.Book.updateAvailability(book, quantity);
        res.status(201).json({
            success: true,
            message: "Borrow created and book availability updated",
            data: borrow,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while borrowing",
            error,
        });
    }
}));
exports.borrowRouter.get("/borrows", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrows = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrows,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving borrows",
            error,
        });
    }
}));
