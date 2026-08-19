const express = require("express");
const app = express();

const PORT = 5000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

let blogs = [];
let idCounter = 1;

app.post("/api/blogs", (req, res) => {
  const { title, description, author } = req.body;

  if (!title || !description || !author) {
    return res.status(400).json({
      success: false,
      message: "Title, description, and author are required",
      data: null,
    });
  }

  const newBlog = {
    id: idCounter++,
    title,
    description,
    author,
  };

  blogs.push(newBlog);

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data: newBlog,
  });
});

app.get("/api/blogs", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

app.get("/api/blogs/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
      data: null,
    });
  }

  res.status(200).json({
    success: true,
    message: "Blog fetched successfully",
    data: blog,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
