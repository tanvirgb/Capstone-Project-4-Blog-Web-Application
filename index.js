import express from "express";

const app = express();
const port = 4000;

app.use(express.static("public")); // Serve static files on port 4000 (default  port 4000 if not specified)
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
