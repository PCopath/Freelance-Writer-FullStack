const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");

// Token Kontrol Middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token yok" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token Geçersiz" });
    req.user = user;
    next();
  });
}

///////////////////////////////////////////////////////////
// Tüm Blogları Getir
router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

///////////////////////////////////////////////////////////
// Tekil Blog Getir (Detail Page için)
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ message: "Blog bulunamadı" });

  res.json(blog);
});

///////////////////////////////////////////////////////////
// Blog Ekle
router.post("/", verifyToken, async (req, res) => {
  const newBlog = new Blog({
    title: req.body.title,
    content: req.body.content,
  });

  const savedBlog = await newBlog.save();
  res.json(savedBlog);
});

///////////////////////////////////////////////////////////
// Blog Sil
router.delete("/:id", verifyToken, async (req, res) => {
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  res.json(deletedBlog);
});

///////////////////////////////////////////////////////////
// Blog Güncelle
router.put("/:id", verifyToken, async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
    },
    { new: true } // Güncel halini döndür
  );

  res.json(updatedBlog);
});

module.exports = router;
