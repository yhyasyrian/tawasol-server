const express = require("express");
const CreatePostController = require("../Controller/Posts/CreatePostController");
const PostsController = require("../Controller/Posts/PostsController");
const ShowPostController = require("../Controller/Posts/ShowPostController");
const Auth = require("../Controller/Users/AuthUser");
const router = express.Router();

router.post("/", Auth,CreatePostController.rule,async (req, res) => {
    const createPostController = new CreatePostController(req,res);
    await createPostController.index();
})

router.get('/',async (req,res)=>{
    let postsController = new PostsController(req,res);
    await postsController.index();
})
router.get('/:id',async (req,res)=>{
    let showPostController = new ShowPostController(req,res);
    await showPostController.index();
})

module.exports = router;