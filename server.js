import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

// Serve static files on port 3000 (default  port 3000 if not specified)
app.use(express.static("public"));

// Middleware for parsing URL-encoded data (form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing JSON data (application/json)
app.use(bodyParser.json());

// GET route for the homepage. Renders the index.ejs file.
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/posts", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/api/posts`);
    console.log(response.data);
    res.render("post.ejs", { posts: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts");
  }
});

app.post("/post", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/api/create`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating a new post");
  }
});

// Start the server on port 3000 and log a success message.
app.listen(3000, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
