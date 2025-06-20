import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: { type: Schema.Types.Number, required: true },
    dueDate: { type: Schema.Types.Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
