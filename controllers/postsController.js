const fs = require("node:fs").promises;
const path = require("node:path");
const uuid = require("uuid");

const filePath = path.join(__dirname, "../data", "posts.json");

const getPosts = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const getPost = async (postId) => {
  const posts = await getPosts();
  const post = posts.find((post) => postId == post.id);
  if (!post) {
    throw new Error("POST_NOT_FOUND");
  }
  return post;
};

const addPost = async (post) => {
  const posts = await getPosts();
  const newPost = {
    ...post,
    id: uuid.v4(),
    date: new Date().toISOString().split("T")[0],
  };
  posts.push(newPost);
  await fs.writeFile(filePath, JSON.stringify(posts));
  return posts;
};

module.exports = { getPosts, getPost, addPost };
