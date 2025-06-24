import { Request, Response, Router } from 'express';
import { Borrow } from '../model/borrow.model';
import { Book } from '../model/book.model';

export const borrowRouter = Router();

borrowRouter.post(
  '/borrow',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { book, quantity, dueDate } = req.body;

      const foundBook = await Book.findById(book);
      if (!foundBook) {
        res.status(404).json({ success: false, message: 'Book not found' });
        return;
      }

      if (foundBook.copies < quantity) {
        res
          .status(400)
          .json({ success: false, message: 'Not enough copies available' });
        return;
      }

      const borrow = new Borrow({ book, quantity, dueDate });
      await borrow.save();

      await Book.updateAvailability(book, quantity);

      res.status(201).json({
        success: true,
        message: 'Borrow created and book availability updated',
        data: borrow,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error while borrowing',
        error,
      });
    }
  },
);

borrowRouter.get(
  '/borrow',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const borrows = await Borrow.aggregate([
        {
          $group: {
            _id: '$book',
            totalQuantity: { $sum: '$quantity' },
          },
        },
        {
          $lookup: {
            from: 'books',
            localField: '_id',
            foreignField: '_id',
            as: 'bookDetails',
          },
        },
        {
          $unwind: '$bookDetails',
        },
        {
          $project: {
            _id: 0,
            totalQuantity: 1,
            book: {
              title: '$bookDetails.title',
              isbn: '$bookDetails.isbn',
            },
          },
        },
      ]);
      res.status(200).json({
        success: true,
        message: 'Borrowed books summary retrieved successfully',
        data: borrows,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving borrows',
        error,
      });
    }
  },
);
