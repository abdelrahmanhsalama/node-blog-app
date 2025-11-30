const express = require("express");
const app = express();
const cors = require("cors");
const postsRouter = require("./routers/postsRoute");
const PORT = 8000;

app.use(cors());

app.use(express.json());

app.use("/api/posts", postsRouter);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
