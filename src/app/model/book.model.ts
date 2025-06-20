import mongoose, { model, Schema } from "mongoose";
import { BookStaticMethod, IBook } from "../interface/book.interface";

const bookSchema = new Schema<IBook, BookStaticMethod>(
  {
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
  },
  {
    timestamps: true,
  }
);
// static method If copies become 0, update available to false

bookSchema.statics.updateAvailability = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);
  if (!book) return;

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

  await book.save();
};

bookSchema.pre("save", function (next) {
  if (this.copies === 0) {
    this.available = false;
  }
  next();
});

export const Book = model<IBook, BookStaticMethod>("Book", bookSchema);
