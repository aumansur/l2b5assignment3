import { Request, Response, Router } from "express";
import { Book } from "../model/book.model";

export const booksRouter = Router();

booksRouter.post("/books", async (req: Request, res: Response) => {
  //tryCatch block to handle errors
  try {
    const body = req.body;
    const book = new Book(body);
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating book",
      error: error,
    });
  }
});

booksRouter.get("/books", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;
    const sortOption: any = {};
    const query: any = {};
    if (filter) {
      query.genre = filter;
    }
    if (sortBy) {
      sortOption[sortBy as string] = sort === "desc" ? -1 : 1;
    }
    const limitValue = limit ? parseInt(limit as string) : 10;
    const books = await Book.find(query).sort(sortOption).limit(limitValue);

    res.status(201).json({
      success: true,
      message: "Books retrieved  successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving books",
      error: error,
    });
  }
});
booksRouter.get("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(201).json({
      success: true,
      message: "Book retrieved  successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving book",
      error: error,
    });
  }
});
booksRouter.put("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;
    const book = await Book.findByIdAndUpdate(bookId, body, { new: true });

    res.status(201).json({
      success: true,
      message: "Book updated   successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating book",
      error: error,
    });
  }
});

booksRouter.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    await Book.findByIdAndDelete(bookId);

    res.status(201).json({
      success: true,
      message: "Book Deleted  successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting book",
      error: error,
    });
  }
});
