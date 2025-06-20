import mongoose from "mongoose";
import app from "./app";
const post = 5000;

async function main() {
  await mongoose.connect(
    "mongodb+srv://assignment3:admin123@cluster0.in4eta4.mongodb.net/book-library?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Connected to mongodb using to mongoose");
  app.listen(post, () => {
    console.log(`Server running on port ${post}`);
  });
}
main();
