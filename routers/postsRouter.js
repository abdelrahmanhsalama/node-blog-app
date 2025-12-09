const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  addPost,
} = require("../controllers/postsController");
const { getError } = require("../libs/errorHandler");

router.get("/", async (req, res) => {
  try {
    const posts = await getPosts();
    console.log("GET /api/posts: Success");
    res.json(posts);
  } catch (error) {
    console.error(`Error in GET /api/posts: ${error.message}`);
    res.status(500).json({ error: getError("INTERNAL_SERVER_ERROR") });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await getPost(req.params.id);
    console.log(`GET /api/posts/${req.params.id}: Success`);
    res.json(post);
  } catch (error) {
    if (error.message === "POST_NOT_FOUND") {
      console.error(
        `GET /api/posts/${req.params.id}: ${getError("POST_NOT_FOUND")}`
      );
      return res.status(404).json({ error: getError("POST_NOT_FOUND") });
    }
    console.error(`Error in GET /api/posts/${req.params.id}: ${error.message}`);
    res.status(500).json({ error: getError("INTERNAL_SERVER_ERROR") });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.title || !req.body.content) {
    console.error("Missing required fields in POST /");
    return res.status(400).json({
      error: getError("MISSING_REQUIRED_FIELDS"),
    });
  }

  try {
    const posts = await addPost(req.body);
    console.log("POST /api/posts: Success\n", req.body);
    res.status(201).json(posts);
  } catch (error) {
    console.error(`Error in POST /api/posts: ${error.message}`);
    res.status(500).json({ error: getError("INTERNAL_SERVER_ERROR") });
  }
});

module.exports = router;
