const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/multer");

// helper: upload buffer to cloudinary using upload_stream
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" }, // cloudinary folder name
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(buffer);
  });
};

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await uploadToCloudinary(req.file.buffer);

    return res.json({ url: result.secure_url });
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

module.exports = router;
