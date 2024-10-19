import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
let posts = [];
let id = -1;

// Middleware for parsing URL-encoded data (form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing JSON data (application/json)
app.use(bodyParser.json());

app.post("/api/create", (req, res) => {
  const post = {
    id: ++id,
    type: req.body.type,
    author: req.body.author,
    title: req.body.title,
    date: new Date().toDateString(),
    content: req.body.content,
  };
  posts.push(post);
  res.json(post);
});

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// Start the server on port 4000 and log a success message.
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
