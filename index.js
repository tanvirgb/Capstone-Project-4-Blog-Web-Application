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

app.get("/api/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  } else {
    res.json(posts[postIndex]);
  }
});

app.patch("/api/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }
  const post = posts[postIndex];

  const updatedPost = {
    id: id,
    type: req.body.type || post.type,
    author: req.body.author || post.author,
    title: req.body.title || post.title,
    date: new Date().toDateString(),
    content: req.body.content || post.content,
  };

  posts[postIndex] = updatedPost;
  res.json(updatedPost);
});

// Start the server on port 4000 and log a success message.
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
