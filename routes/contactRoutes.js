const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// İletişim Formu Kaydet
router.post("/", async (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  await newContact.save();
  res.json({ message: "Mesaj kaydedildi" });
});

module.exports = router;
