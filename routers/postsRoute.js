const express = require("express");
const router = express.Router();
const {
  retrievePosts,
  retrievePost,
  addPost,
} = require("../controllers/handlePosts");

router.get("/", async (req, res) => {
  try {
    const posts = await retrievePosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await retrievePost(req.params.id);
    res.json(post);
  } catch (error) {
    if (error.message == "Post not found!") {
      console.log(error);
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Raw body:", req.body);
    const posts = await addPost(req.body);
    res.status(201).json(posts);
  } catch (error) {
    if (error.message == "Missing title or content") {
      return res.status(500).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
