import app from "./app";
const post =5000


const boststrap =  () => {
    app.listen(post, () => {
      console.log(`Server running on port ${post}`);
    }); 
}