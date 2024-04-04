const express = require("express");
const CreatePostController = require("../Controller/Posts/CreatePostController");
const PostsController = require("../Controller/Posts/PostsController");
const ShowPostController = require("../Controller/Posts/ShowPostController");
const LikesPostController = require("../Controller/Posts/LikesPostController");
const Auth = require("../Controller/Users/AuthUser");
const router = express.Router();

router.post("/", Auth, CreatePostController.rule, async (req, res) => {
    const createPostController = new CreatePostController(req, res);
    await createPostController.index();
})

router.get('/', Auth,
    async (req, res) => {
        let postsController = new PostsController(req, res);
        await postsController.index();
    })

router.get('/:id', Auth, async (req, res) => {
    let showPostController = new ShowPostController(req, res);
    await showPostController.index();
})

router.put('/like/:id', Auth, async (req, res) => {
    let likesPostController = new LikesPostController(req, res);
    await likesPostController.addLike();
})
router.put('/unlike/:id', Auth, async (req, res) => {
    let likesPostController = new LikesPostController(req, res);
    await likesPostController.disLike();
})


module.exports = router;