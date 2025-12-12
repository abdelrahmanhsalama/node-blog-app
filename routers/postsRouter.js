const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  addPost,
} = require("../controllers/postsController");
const { validatePost } = require("../middleware/validators");

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", validatePost, addPost);

module.exports = router;
