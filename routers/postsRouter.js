const express = require("express");
const { body, validationResult, matchedData } = require("express-validator");
const router = express.Router();
const {
  getPosts,
  getPost,
  addPost,
} = require("../controllers/postsController");
const { getError } = require("../libs/errorsHandler");
const { validatePost } = require("../middleware/validators");

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

router.post("/", validatePost, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error(
      "Error in POST /api/posts: Validation failed!\nDetails:\n",
      errors.array()
    );
    return res.status(400).json({
      error: getError("VALIDATION_ERROR"),
      details: errors.array(),
    });
  }

  try {
    const posts = await addPost(matchedData(req));
    console.log("POST /api/posts: Success\n", matchedData(req));
    res.status(201).json(posts);
  } catch (error) {
    console.error(`Error in POST /api/posts: ${error.message}`);
    res.status(500).json({ error: getError("INTERNAL_SERVER_ERROR") });
  }
});

module.exports = router;
