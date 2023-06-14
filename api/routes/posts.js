const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// CREATE NEW POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you only update your post ");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.delete("/:id", async (req, res) => {
//   const name = "joe";
//   try {
//     const updatearr = await Post.findByIdAndDelete(req.params.id, {
//       $pull: {
//         categories: name,
//       },
//     });
//   } catch (error) {}
// });

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("sucess");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you only delete your post ");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
// var arrayAsString = '?' + paramName + myArray.join('&' + paramName);
// var urlWithParams = baseUrl + arrayAsString;

// GETT ALL POST
router.get("/", async (req, res) => {
  const { c } = req.query;
  const username = req.query.user;
  const catName = req.query.cat;
  const keys = ["title", "username", "categories"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(c))
    );
  };
  try {
    let posts;

    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName, catName, catName],
        },
      });
    } else {
      posts = await Post.find();
    }

    c ? res.json(search(posts)) : res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
