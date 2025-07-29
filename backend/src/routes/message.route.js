import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
// Cloudinary setup as in your config
const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);




router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto", // handles images, docs, etc.
    });
    // Add file info to the message or return URL
    res.json({ url: result.secure_url, type: req.file.mimetype, name: req.file.originalname });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
