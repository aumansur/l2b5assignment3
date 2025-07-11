# 📚 Library Management API (L2B5 Assignment 3)

This is a Library Management System backend built using **Express**, **TypeScript**, and **MongoDB** via **Mongoose**. The API allows users to manage books and borrowing operations with validations, business logic, filtering, sorting, and aggregation.

---

## 🚀 Live Project

🔗 🔺 Vercel Link: [Live API](https://l2b5-assignment3.vercel.app)
---
## 📓 Github repository

🔗 Github: [Github link](https://github.com/aumansur/l2b5assignment3.git)
---
## 📷 Video explanation
🔗 Video Link: [Video](https://youtu.be/3ayF5TDRWVc)
---

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** (via Mongoose)
- **Vercel** for deployment

---

## ✅ Features

### 📘 Book Management
- Add a new book (`POST /api/books`)
- Get all books with filter/sort/limit (`GET /api/books`)
- Get single book by ID (`GET /api/books/:id`)
- Update book (`PUT /api/books/:id`)
- Delete book (`DELETE /api/books/:id`)

### 📕 Borrow Management
- Borrow a book (`POST /api/borrow`)
  - Automatically decrease book's copies
  - Mark book as unavailable if `copies === 0`
  - Business logic handled via Mongoose static method
- Borrowed Books Summary (`GET /api/borrow`)
  - Aggregation pipeline to show total borrowed per book with title and ISBN

---

## 🧠 Business Logic Highlights

- ✅ **Validation:** All fields are validated using Mongoose schema.
- ✅ **Copies Management:** Borrowing a book reduces its available copies.
- ✅ **Auto Available Toggle:** If copies = 0, `available` becomes false.
- ✅ **Static Method Used:** `Book.updateAvailability()` handles availability logic.
- ✅ **Aggregation Used:** Summary of borrowed books with grouping.
- ✅ **Mongoose Middleware:** `pre` middleware for when user create book  copies =0 then `available` is set to false.

---

## ⚙️ Setup Instructions

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/aumansur/l2b5assignment3.git
cd l2b5-assignment3

```
### 2. ✅ Install Dependencies

```bash
npm install
```
### 3. ✅ Environment Variables
Create a `.env` file in the root directory and add your MongoDB connection string:

``` 
PORT =
MONGODB_URL =
 ````
 ### ✅ 4. Run Project Locally
```bash
npm run dev
```


### 📘 Books API Endpoints

| Method | Endpoint         | Description                               |
|--------|------------------|-------------------------------------------|
| POST   | `/api/books`     | Create new book                           |
| GET    | `/api/books`     | Get all books (supports filter/sort/limit)|
| GET    | `/api/books/:id` | Get single book by ID                     |
| PUT    | `/api/books/:id` | Update book information                   |
| DELETE | `/api/books/:id` | Delete a book                             |
### 📕 Borrow API Endpoints

| Method | Endpoint         | Description                                                                 |
|--------|------------------|-----------------------------------------------------------------------------|
| POST   | `/api/borrow`     | Borrow a book (deduct copies, update availability using static method)      |
| GET    | `/api/borrow`     | Borrowed books summary (with total quantity per book using aggregation)     |

---