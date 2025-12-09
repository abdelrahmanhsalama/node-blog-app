const express = require("express");
const app = express();
const cors = require("cors");

const postsRouter = require("./routers/postsRouter");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

app.use("/api/posts", postsRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is listening on port ${PORT}`);
});
