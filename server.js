const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test Endpoint
app.get("/", (req, res) => {
  res.send("Backend çalışıyor 🚀");
});

// Blog Routes
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Contact Routes
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.log("MongoDB bağlantı hatası:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));
