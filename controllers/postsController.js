const { getAllPostsDB, getPostDB, addPostDB } = require("../db/queries");
const { getError } = require("../libs/errorsHandler");
const { validationResult, matchedData } = require("express-validator");

async function getPosts(req, res) {
  try {
    const posts = await getAllPostsDB();
    console.log("GET /api/posts: Success");
    res.json(posts);
  } catch (error) {
    console.error(`Error in GET /api/posts: ${error.message}`);
    res.status(500).json({ error: getError("INTERNAL_SERVER_ERROR") });
  }
}

async function getPost(req, res) {
  try {
    const post = await getPostDB(req.params.id);
    console.log(`GET /api/posts/${req.params.id}: Success`);
    res.json(post);
  } catch (error) {
    if (error.code === "POST_NOT_FOUND") {
      console.error(
        `GET /api/posts/${req.params.id}: ${getError("POST_NOT_FOUND")}`
      );
      return res.status(404).json({ error: getError("POST_NOT_FOUND") });
    }
    console.error(`Error in GET /api/posts/${req.params.id}: ${error.message}`);
    res.status(500).json({ error: getError("INTERNAL_SERVER_ERROR") });
  }
}

async function addPost(req, res) {
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
    const post = await addPostDB(matchedData(req));
    console.log("POST /api/posts: Success\n", matchedData(req));
    res.status(201).json(post);
  } catch (error) {
    console.error(`Error in POST /api/posts: ${error.message}`);
    res.status(500).json({ error: getError("INTERNAL_SERVER_ERROR") });
  }
}

module.exports = { getPosts, getPost, addPost };
