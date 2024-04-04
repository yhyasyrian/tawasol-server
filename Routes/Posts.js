const express = require("express");
const CreatePostController = require("../Controller/Posts/CreatePostController");
const Auth = require("../Controller/Users/AuthUser");
const router = express.Router();

router.post("/", Auth,CreatePostController.rule,async (req, res) => {
    const createPostController = new CreatePostController(req,res);
    await createPostController.index();
})

module.exports = router;