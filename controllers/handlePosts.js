const fs = require("node:fs").promises;
const path = require("node:path");
const uuid = require("uuid");

const filePath = path.join(__dirname, "../data", "posts.json");

const retrievePosts = async (fileName) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading posts:", error);
    throw error;
  }
};

const retrievePost = async (postId) => {
  try {
    const posts = await retrievePosts();
    const post = posts.find((post) => postId == post.id);
    if (!post) {
      throw new Error("Post not found!");
    }
    return post;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addPost = async (post) => {
  try {
    if (!post.title || !post.content) {
      throw new Error("Missing title or content");
    }
    const posts = await retrievePosts();
    const newPost = {
      ...post,
      id: uuid.v4(),
      date: new Date().toISOString().split("T")[0],
    };
    posts.push(newPost);
    await fs.writeFile(filePath, JSON.stringify(posts));
    return posts;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

module.exports = { retrievePosts, retrievePost, addPost };
