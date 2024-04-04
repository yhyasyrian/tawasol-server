const express = require("express");
const CreatePostController = require("../Controller/Posts/CreatePostController");
const PostsController = require("../Controller/Posts/PostsController");
const ShowPostController = require("../Controller/Posts/ShowPostController");
const LikesPostController = require("../Controller/Posts/LikesPostController");
const CreateCommentController = require("../Controller/Posts/CreateCommentController");
const DeleteCommentController = require("../Controller/Posts/DeleteCommentController");
const DeletePostController = require("../Controller/Posts/DeletePostController");
const Auth = require("../Controller/Users/AuthUser");
const router = express.Router();

router.post("/", Auth, CreatePostController.rule, async (req, res) => {
    const createPostController = new CreatePostController(req, res);
    await createPostController.start();
})

router.delete('/:id', Auth, async (req, res) => {
    let deletePostController = new DeletePostController(req, res);
    await deletePostController.start();
})

router.get('/', Auth,
    async (req, res) => {
        let postsController = new PostsController(req, res);
        await postsController.start();
    })

router.get('/:id', Auth, async (req, res) => {
    let showPostController = new ShowPostController(req, res);
    await showPostController.start();
})

router.put('/like/:id', Auth, async (req, res) => {
    let likesPostController = new LikesPostController(req, res);
    await likesPostController.addLike();
})
router.put('/unlike/:id', Auth, async (req, res) => {
    let likesPostController = new LikesPostController(req, res);
    await likesPostController.disLike();
})

router.post('/comment/:id',Auth,CreateCommentController.rule,async (req, res) => {
    let createCommentController = new CreateCommentController(req, res);
    await createCommentController.start();
})
router.delete('/comment/:id/:commentId',Auth,async (req, res) => {
    let deleteCommentController = new DeleteCommentController(req, res);
    await deleteCommentController.start();
})

module.exports = router;