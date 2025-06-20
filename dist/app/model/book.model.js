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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    author: {
        type: String,
        required: [true, "Author is required"],
    },
    available: {
        type: Boolean,
        required: [true, "Availability is required"],
    },
    copies: {
        type: Number,
        required: [true, "Copies are required"],
        min: [0, "Copies must be a positive number"],
        // Default to 1 copy if not specified
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    genre: {
        type: String,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
        required: [true, "Genre is required"],
    },
}, {
    timestamps: true,
});
// static method If copies become 0, update available to false
bookSchema.statics.updateAvailability = function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book)
            return;
        // Step 1: কমিয়ে দাও copies
        book.copies -= quantity;
        // Step 2: যদি 0 বা কম হয়ে যায়, available = false
        if (book.copies <= 0) {
            book.copies = 0; // নিচে না নামতে দাও
            book.available = false;
        }
        // Step 3: যদি 0 এর বেশি হয়, available = true (optional)
        else if (book.copies > 0) {
            book.available = true;
        }
        yield book.save();
    });
};
bookSchema.pre("save", function (next) {
    if (this.copies === 0) {
        this.available = false;
    }
    next();
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
