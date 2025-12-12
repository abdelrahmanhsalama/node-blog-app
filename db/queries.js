const pool = require("./pool");
const { getError } = require("../libs/errorsHandler");

async function getAllPostsDB() {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY id ASC");
  return rows;
}

async function getPostDB(postId) {
  const { rows } = await pool.query("SELECT * FROM posts WHERE uuid = $1", [
    postId,
  ]);
  if (rows.length === 0) {
    const error = new Error(getError("POST_NOT_FOUND"));
    error.code = "POST_NOT_FOUND";
    throw error;
  }
  return rows[0];
}

async function addPostDB({ title, content, image }) {
  const { rows } = await pool.query(
    "INSERT INTO posts (title, author, date, content, image) VALUES ($1, 'Abdelrahman', $2, $3, $4) RETURNING *",
    [title, new Date().toISOString().split("T")[0], content, image]
  );

  if (!rows[0]) {
    const error = new Error(getError("POST_CREATE_FAILED"));
    error.code = "POST_CREATE_FAILED";
    throw error;
  }

  return rows[0];
}

module.exports = { getAllPostsDB, getPostDB, addPostDB };
