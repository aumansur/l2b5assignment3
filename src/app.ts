import express, { NextFunction, Request, Response } from 'express';
import { booksRouter } from './app/controllers/book.controllers';
import { borrowRouter } from './app/controllers/borrow.controllers';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.get('/', (req: Request, res: Response) => {
  res.send('welcome to book library app');
});

app.use(express.json());
app.use('/api', booksRouter);
app.use('/api', borrowRouter);

// Handle 404 Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'page Not Found',
    error: 'The requested resource could not be found',
  });
  next();
});

//global error handler

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message || 'Something went wrong',
  });
  next();
});

export default app;
