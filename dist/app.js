"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import itemRoutes from "./routes/itemRoutes";
// import { errorHandler } from "./middlewares/errorHandler";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("welcome to book library app");
});
// Routes
// app.use("/api/items", itemRoutes);
// Global error handler (should be after routes)
// app.use(errorHandler);
exports.default = app;
