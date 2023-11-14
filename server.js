const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://<username>:<password>@cluster0.heuyu.mongodb.net/mern-tutorial-db"
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const Post = new mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  console.log("Getting all posts from the database");
  Post.find()
    .then((posts) => {
      console.log("all posts", posts);
      res.json(posts);
    })
    .catch((err) => console.log(err));
});

app.post("/submit", (req, res) => {
  console.log("request body", req.body);

  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
  });

  newPost
    .save()
    .then((res) => console.log("response saving new data", res))
    .catch((err) => console.log(err));
});

app.listen(3001, function () {
  console.log("Server is running on port 3001");
});
