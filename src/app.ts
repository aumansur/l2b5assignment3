import express, { NextFunction, Request, Response } from "express";
import { booksRouter } from "./app/controllers/book.controllers";
// import itemRoutes from "./routes/itemRoutes";
// import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to book library app");
});

// Routes
app.use("/api/", booksRouter);

// Global error handler (should be after routes)
// app.use(errorHandler);
//global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message || "Something went wrong",
  });
  next();
});

export default app;
