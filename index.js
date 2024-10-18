import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
let posts = [];

// Middleware for parsing URL-encoded data (form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing JSON data (application/json)
app.use(bodyParser.json());

// app.post("/api/create", (req, res) => {
//   const post = {
//     id: ++id,
//     type: req.body.type || "Not specified",
//     author: req.body.author || "Anonymous",
//     title: req.body.title,
//     date: new Date().toISOString(),
//     content: req.body.content,
//   };
//   posts.push(post);
//   res.json(post);
// });

// Start the server on port 4000 and log a success message.
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
